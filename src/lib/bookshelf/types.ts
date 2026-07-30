/**
 * Domain types for the 3D bookshelf ("Libreria"), fed statically from
 * `src/data/books.json`.
 */
/**
 * The three bindings a shelf like this actually mixes:
 * - `cloth`   — bound hardback: rounded spine, raised bands, foil title
 * - `jacket`  — dust-jacketed hardback: flat, printed, slightly glossy
 * - `paper`   — matte paperback: thin, short, creased, no boards
 */
export type Binding = 'cloth' | 'jacket' | 'paper'

export interface Book {
    id: string
    title: string
    author: string
    /** Category used by the shelf's filter chips (e.g. "Business", "Narrativa"). */
    category?: string
    /** ISO date or bare year, e.g. "1999" or "2008-08-01". */
    publishedDate: string
    description: string
    /** Cover image shown when the book is extracted and rotated to the front.
     *  Populated by `scripts/fetch-covers.mjs` (Open Library) → `/covers/<id>.webp`. */
    coverUrl: string
    /** ISBN, used to look up the cover; improves match accuracy. */
    isbn?: string
    /** CSS color the spine is generated from. */
    spineColor: string
    /**
     * Optional manual spine-width multiplier (1 = the default width). Use it to
     * make a chunky book wider or a slim one narrower. Clamped to a safe range so
     * it can't overflow a shelf row; when omitted the width is derived automatically.
     */
    thickness?: number
    /**
     * How the book is bound. Drives its whole material recipe — spine profile,
     * height, thickness, page-block colour and wear. Omit it and `bindingOf()`
     * derives a stable one from the id, so an un-annotated shelf still mixes.
     */
    binding?: Binding
}
