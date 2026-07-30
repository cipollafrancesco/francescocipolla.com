import type { Book, SortCriterion } from './types'

/** The one criterion wired to the UI in Phase 1. */
export const DEFAULT_SORT: SortCriterion = 'dateRead'

/** Parse a `publishedDate` ("1999" or "2008-08-01") into a comparable number. */
function publishedTime(book: Book): number {
    const t = Date.parse(book.publishedDate)
    if (!Number.isNaN(t)) return t
    const year = Number.parseInt(book.publishedDate, 10)
    return Number.isNaN(year) ? Number.NEGATIVE_INFINITY : Date.parse(`${year}-01-01`)
}

/** Rough hue (0–360) of a spine color, for grouping books by color. */
function spineHue(book: Book): number {
    const color = book.spineColor.trim()

    const hslMatch = color.match(/hsla?\(\s*([\d.]+)/i)
    if (hslMatch) return Number.parseFloat(hslMatch[1]) % 360

    let r = 0
    let g = 0
    let b = 0
    const hex = color.replace('#', '')
    if (/^[0-9a-f]{6}$/i.test(hex)) {
        r = Number.parseInt(hex.slice(0, 2), 16)
        g = Number.parseInt(hex.slice(2, 4), 16)
        b = Number.parseInt(hex.slice(4, 6), 16)
    } else if (/^[0-9a-f]{3}$/i.test(hex)) {
        r = Number.parseInt(hex[0] + hex[0], 16)
        g = Number.parseInt(hex[1] + hex[1], 16)
        b = Number.parseInt(hex[2] + hex[2], 16)
    } else {
        const rgbMatch = color.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i)
        if (rgbMatch) {
            r = Number(rgbMatch[1])
            g = Number(rgbMatch[2])
            b = Number(rgbMatch[3])
        } else {
            return -1 // unknown format sorts first
        }
    }

    const rn = r / 255
    const gn = g / 255
    const bn = b / 255
    const max = Math.max(rn, gn, bn)
    const min = Math.min(rn, gn, bn)
    const delta = max - min
    if (delta === 0) return 0

    let hue: number
    if (max === rn) hue = ((gn - bn) / delta) % 6
    else if (max === gn) hue = (bn - rn) / delta + 2
    else hue = (rn - gn) / delta + 4
    hue *= 60
    return hue < 0 ? hue + 360 : hue
}

/**
 * Descending, with `null` — missing or unparseable — always last and equal to
 * each other.
 *
 * Subtracting two `Number.NEGATIVE_INFINITY` sentinels (the old approach, when
 * two books both lacked a value) produces `NaN`, and `Array.sort`'s behaviour on
 * a `NaN` comparator result is spec-undefined. Normalising "missing" and
 * "unparseable" to `null` and branching on them closes that off entirely rather
 * than just the common case.
 */
function descNullsLast(a: number | null, b: number | null): number {
    if (a === null && b === null) return 0
    if (a === null) return 1
    if (b === null) return -1
    return b - a
}

/** `dateRead` as a comparable number, or `null` if absent/unparseable. */
function readTime(book: Book): number | null {
    const parsed = book.dateRead ? Date.parse(book.dateRead) : NaN
    return Number.isNaN(parsed) ? null : parsed
}

/**
 * Pure sort: returns a new array, never mutates the input.
 *
 * Phase 1 only wires `dateRead`; the other branches are implemented so adding a
 * sort dropdown later is a UI-only change with no logic work.
 */
export function sortBooks(books: Book[], criterion: SortCriterion): Book[] {
    const copy = [...books]

    switch (criterion) {
        case 'dateRead':
            // Most recently read first; books without a usable dateRead go last.
            return copy.sort((a, b) => descNullsLast(readTime(a), readTime(b)))

        case 'author':
            return copy.sort((a, b) =>
                a.author.localeCompare(b.author, undefined, { sensitivity: 'base' })
            )

        case 'publishedDate':
            // Newest publications first.
            return copy.sort((a, b) => publishedTime(b) - publishedTime(a))

        case 'rating':
            // Highest rating first; unrated books go last.
            return copy.sort((a, b) => descNullsLast(a.rating ?? null, b.rating ?? null))

        case 'spineColor':
            return copy.sort((a, b) => spineHue(a) - spineHue(b))

        default:
            return copy
    }
}
