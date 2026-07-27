/**
 * Domain types for the 3D bookshelf ("Libreria").
 *
 * Phase 1 is a read-only, statically-fed bookshelf. The schema below is the
 * single source of truth and is intentionally shaped to anticipate a later
 * "library service" (search, user-added books, persistence) without needing a
 * refactor — extra fields can be appended, and the optional fields already
 * model the "may or may not exist" shape a backend would return.
 */
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
   *  Populated by `scripts/fetch-covers.mjs` (Open Library) → `/covers/<id>.jpg`. */
  coverUrl: string
  /** ISBN, used to look up the cover; improves match accuracy. */
  isbn?: string
  /** CSS color used to generate the spine when no `spineImage` is provided. */
  spineColor: string
  /**
   * Optional manual spine-width multiplier (1 = the default width). Use it to
   * make a chunky book wider or a slim one narrower. Clamped to a safe range so
   * it can't overflow a shelf row; when omitted the width is derived automatically.
   */
  thickness?: number
  /** Optional artwork that overrides the generated spine. */
  spineImage?: string
  /** Optional personal rating, conventionally 1–5. */
  rating?: number
  /** Optional free-form personal notes. */
  personalNotes?: string
  /** Optional ISO date the book was finished. Drives the default sort. */
  dateRead?: string
}

/**
 * Sort criteria the bookshelf understands. Only `dateRead` is wired to the UI
 * in Phase 1; the rest are implemented as pure stubs in `sortBooks` so a future
 * sort dropdown is a UI-only change.
 */
export type SortCriterion =
  | 'dateRead'
  | 'author'
  | 'publishedDate'
  | 'rating'
  | 'spineColor'
