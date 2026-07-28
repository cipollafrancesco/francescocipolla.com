import type { Binding, Book } from '@/lib/bookshelf/types'

/** Stable hash from a string, so per-book visuals are deterministic. */
function hash(str: string): number {
    let h = 0
    for (let i = 0; i < str.length; i++) {
        h = (h << 5) - h + str.charCodeAt(i)
        h |= 0
    }
    return Math.abs(h)
}

/** Deterministic 0–1 for a book, per named channel. One hash per visual axis so
 *  a book's height doesn't correlate with its wear or its depth in the shelf. */
function noise(book: Book, channel: string): number {
    return (hash(book.id + ':' + channel) % 1000) / 1000
}

/** Parse a hex or rgb() color. Falls back to a mid grey on anything else. */
function toRgb(color: string): { r: number; g: number; b: number } {
    const hex = color.replace('#', '')
    if (/^[0-9a-f]{6}$/i.test(hex)) {
        return {
            r: parseInt(hex.slice(0, 2), 16),
            g: parseInt(hex.slice(2, 4), 16),
            b: parseInt(hex.slice(4, 6), 16),
        }
    }
    const m = color.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i)
    if (m) return { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]) }
    return { r: 51, g: 51, b: 51 }
}

/** Relative luminance (0–1) of a hex / rgb color, for picking spine text. */
function luminance(color: string): number {
    const { r, g, b } = toRgb(color)
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
}

/** White or near-black title text, whichever reads on the spine color. */
export function spineTextColor(spineColor: string): string {
    return luminance(spineColor) > 0.6 ? 'rgba(20,16,12,0.86)' : '#f6f3ec'
}

/**
 * The details accent sits on the near-black scrim, where a dark spine color
 * (several books use near-black or deep navy) would simply vanish. Lift it
 * toward white only as far as it needs to read; already-bright spines pass
 * through untouched, so the color still identifies the book.
 */
export function accentOnDark(spineColor: string): string {
    const target = 0.5
    const l = luminance(spineColor)
    if (l >= target) return spineColor
    const { r, g, b } = toRgb(spineColor)
    const t = Math.min(0.72, (target - l) / target)
    const lift = (c: number) => Math.round(c + (255 - c) * t)
    return `rgb(${lift(r)}, ${lift(g)}, ${lift(b)})`
}

/** Bounds for a book's spine-width multiplier. The max keeps even a deliberately
 *  "thick" book narrow enough to fit a shelf row (≈3.5×34px) so it never overflows. */
const MIN_THICKNESS = 0.6
const MAX_THICKNESS = 3.5

const clampThickness = (n: number) => Math.min(MAX_THICKNESS, Math.max(MIN_THICKNESS, n))

/**
 * How this book is bound. Honors an explicit `binding` in the data; otherwise
 * derives a stable one from the id, weighted like a real personal shelf —
 * paperbacks are the plurality, cloth hardbacks the rarest.
 */
export function bindingOf(book: Book): Binding {
    if (book.binding) return book.binding
    const n = noise(book, 'binding')
    if (n < 0.28) return 'cloth'
    if (n < 0.58) return 'jacket'
    return 'paper'
}

/** Foil, bright enough to read on the dark spines it is picked for. Kept to a
 *  narrow ~10pt luminance band: the original recipe spanned light-to-dark
 *  across the whole gradient, and whichever letter happened to land on the
 *  mid-tone crossed the spine's own luminance and vanished — worst on the
 *  reddest spine, where that midpoint was nearly the exact colour of the
 *  cloth. A tight band can't cross anything. */
const FOIL_BRIGHT: Record<'gold' | 'silver', [string, string]> = {
    gold: ['#f4dda2', '#e0bb72'],
    silver: ['#f3f2ef', '#dad7cd'],
}
/** The dark counterpart, for pale spines a bright foil would wash out against. */
const FOIL_DEEP: Record<'gold' | 'silver', [string, string]> = {
    gold: ['#8c6a2e', '#6d4f1e'],
    silver: ['#707070', '#4c4c4c'],
}

/**
 * Cloth spines are foil-stamped, not printed — the metal a real bindery would
 * actually use. Two choices, each picked for contrast rather than at random:
 * - Light/dark: a pale spine needs a dark foil to read against it and a dark
 *   spine needs a bright one, the same "target the opposite end of the scale"
 *   logic as `accentOnDark`.
 * - Gold/silver: a warm spine (red, orange) sits too close to gold in hue for
 *   the two to separate cleanly, so warm spines get the neutral silver instead;
 *   cool and neutral spines get the more common gold.
 */
export function foilColors(book: Book): [string, string] {
    const { r, b } = toRgb(book.spineColor)
    const metal = r - b > 20 ? 'silver' : 'gold'
    const pale = luminance(book.spineColor) >= 0.55
    return pale ? FOIL_DEEP[metal] : FOIL_BRIGHT[metal]
}

/** Raised cord bands are a leather/traditionally-sewn binding trait — mainly
 *  antique or special editions, not the ordinary contemporary cloth hardback
 *  this shelf is mostly made of. ~1 in 6 cloth books gets them; the rest are
 *  smooth cloth, which is what a modern trade hardback actually is. */
export function hasBands(book: Book): boolean {
    return noise(book, 'bands') < 0.17
}

/** Per-binding height band. Height is the strongest signal that a shelf holds
 *  different kinds of object, and it is not random — a mass-market paperback is
 *  genuinely shorter than a large-format hardback, so the two are correlated.
 *  Bands are chosen to span ~1.4x end to end while keeping the tallest at 1.06,
 *  the value the shelf band and `--shelf-gap` were already sized around. */
const HEIGHT_BAND: Record<Binding, [number, number]> = {
    cloth: [0.96, 1.06],
    jacket: [0.88, 0.99],
    paper: [0.76, 0.88],
}

/** Per-binding thickness band, same reasoning: boards and sewn signatures make a
 *  hardback fat, a mass-market paperback is a wafer. */
const THICKNESS_BAND: Record<Binding, [number, number]> = {
    cloth: [1.05, 1.6],
    jacket: [0.9, 1.35],
    paper: [0.62, 1.0],
}

const lerp = (band: [number, number], t: number) => band[0] + (band[1] - band[0]) * t

/**
 * Spine-width multiplier. Honors an explicit `thickness` from the data (clamped to
 * a safe range so the responsive packing can't be broken); otherwise derives it
 * from the binding, nudged by description length so a longer book reads fatter.
 */
export function thicknessScale(book: Book): number {
    if (typeof book.thickness === 'number' && Number.isFinite(book.thickness)) {
        return clampThickness(book.thickness)
    }
    const band = THICKNESS_BAND[bindingOf(book)]
    const fromLength = Math.min(1, book.description.length / 220) // 0–1
    const t = fromLength * 0.6 + noise(book, 'thickness') * 0.4
    return Number(lerp(band, t).toFixed(3))
}

/**
 * Deterministic height multiplier (~0.76–1.06), banded by binding. Bottoms stay
 * flush (the row is bottom-aligned) while tops go uneven, as on a real shelf.
 */
export function heightScale(book: Book): number {
    const band = HEIGHT_BAND[bindingOf(book)]
    return Number(lerp(band, noise(book, 'height')).toFixed(3))
}

/**
 * How far back from the shelf's front edge the book sits, as a fraction of the
 * shelf depth (0 = flush with the lip). This is what actually reveals a book's
 * side: in a perfectly flush row every side face is hidden behind its
 * neighbour's spine, so no amount of perspective shows one. Stagger the depths
 * and each book that stands proud of the next shows a sliver of board or pages.
 */
export function depthInset(book: Book): number {
    return Number((noise(book, 'depth') * 0.13).toFixed(3))
}

/** 0–1 "how used is this copy", driving edge scuffing and spine creasing.
 *  Paperbacks take visible wear; cloth boards mostly don't. */
export function wear(book: Book): number {
    const cap = bindingOf(book) === 'paper' ? 1 : 0.45
    return Number((noise(book, 'wear') * cap).toFixed(3))
}

/** True when the cover URL is a real asset (not the seed placeholder). */
export function hasRealCover(book: Book): boolean {
    return Boolean(book.coverUrl) && !book.coverUrl.includes('placeholder')
}
