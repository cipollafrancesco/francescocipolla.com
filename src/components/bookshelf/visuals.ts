import type { Book } from '@/lib/bookshelf/types'

/** Stable hash from a string, so per-book visuals are deterministic. */
function hash(str: string): number {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

/** Relative luminance (0–1) of a hex / rgb color, for picking spine text. */
function luminance(color: string): number {
  let r = 0
  let g = 0
  let b = 0
  const hex = color.replace('#', '')
  if (/^[0-9a-f]{6}$/i.test(hex)) {
    r = parseInt(hex.slice(0, 2), 16)
    g = parseInt(hex.slice(2, 4), 16)
    b = parseInt(hex.slice(4, 6), 16)
  } else {
    const m = color.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i)
    if (m) {
      r = Number(m[1])
      g = Number(m[2])
      b = Number(m[3])
    } else {
      return 0.2
    }
  }
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
}

/** White or near-black title text, whichever reads on the spine color. */
export function spineTextColor(spineColor: string): string {
  return luminance(spineColor) > 0.6 ? 'rgba(20,16,12,0.86)' : '#f6f3ec'
}

/** Bounds for a book's spine-width multiplier. The max keeps even a deliberately
 *  "thick" book narrow enough to fit a shelf row (≈3.5×34px) so it never overflows. */
const MIN_THICKNESS = 0.6
const MAX_THICKNESS = 3.5

const clampThickness = (n: number) =>
  Math.min(MAX_THICKNESS, Math.max(MIN_THICKNESS, n))

/**
 * Spine-width multiplier. Honors an explicit `thickness` from the data (clamped to
 * a safe range so the responsive packing can't be broken); otherwise derives a
 * deterministic value (~0.82–1.30) so an un-annotated shelf still looks organic.
 */
export function thicknessScale(book: Book): number {
  if (typeof book.thickness === 'number' && Number.isFinite(book.thickness)) {
    return clampThickness(book.thickness)
  }
  const base = book.description.length // longer book → thicker, loosely
  const jitter = (hash(book.id) % 100) / 100 // 0–1
  const fromLength = Math.min(1, base / 220) // 0–1
  return Number((0.82 + fromLength * 0.32 + jitter * 0.16).toFixed(3))
}

/**
 * Deterministic height multiplier (~0.88–1.06). Real books on a shelf differ in
 * height; bottoms stay flush (the row is bottom-aligned) while tops go uneven.
 */
export function heightScale(book: Book): number {
  const jitter = (hash(book.id + 'h') % 100) / 100 // 0–1
  return Number((0.88 + jitter * 0.18).toFixed(3))
}

/** True when the cover URL is a real asset (not the seed placeholder). */
export function hasRealCover(book: Book): boolean {
  return Boolean(book.coverUrl) && !book.coverUrl.includes('placeholder')
}
