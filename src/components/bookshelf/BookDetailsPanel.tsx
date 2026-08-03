'use client'

import React, { useEffect, useRef } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { Book } from '@/lib/bookshelf/types'
import type { SiteContent } from '@/content/site'
import { accentOnDark } from './visuals'

interface BookDetailsPanelProps {
    book: Book
    /** True on the two-column layout (>= 1024px): book left, details right. */
    isSplit: boolean
    reducedMotion: boolean
    onClose: () => void
    copy: SiteContent['books']
}

const FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

function getFocusableElements(container: HTMLElement): HTMLElement[] {
    return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
}

/**
 * Book details, set as type directly on the scrim — there is no panel, card or
 * sheet behind it. Split layout (>= 1024px): a column to the right of the
 * extracted book, sharing its centre line. Stacked layout: along the bottom of
 * the screen, draggable downwards to dismiss. Acts as a modal dialog.
 */
function BookDetailsPanel({ book, isSplit, reducedMotion, onClose, copy }: BookDetailsPanelProps) {
    const closeRef = useRef<HTMLButtonElement>(null)
    const dialogRef = useRef<HTMLDivElement>(null)
    const titleId = `book-title-${book.id}`
    const category = book.category ? (copy.categories[book.category] ?? book.category) : null

    // Move focus into the dialog on open (focus is restored by the page on close).
    useEffect(() => {
        closeRef.current?.focus()
    }, [])

    // Trap Tab within the dialog: without this, Tab escapes to the book spines
    // behind the scrim, which stay focusable — the ones filtered out are also
    // `tabIndex={-1}`, but the ones still on the shelf are real buttons.
    useEffect(() => {
        const dialogNode = dialogRef.current
        if (!dialogNode) return

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key !== 'Tab') return

            const focusable = getFocusableElements(dialogNode)
            if (focusable.length === 0) return

            const first = focusable[0]
            const last = focusable[focusable.length - 1]
            const active = document.activeElement

            // Only wraps at the boundary — doesn't try to pull focus back in
            // once it's already outside. `AnimatePresence` keeps this panel
            // mounted (and this listener live) for the ~150-250ms exit
            // transition after close, and `handleClose` deliberately moves
            // focus to the triggering spine during that window; recovering
            // focus back into a closing dialog would fight that on purpose.
            if (event.shiftKey) {
                if (active === first) {
                    event.preventDefault()
                    last.focus()
                }
            } else if (active === last) {
                event.preventDefault()
                first.focus()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [])

    // Two groups, not six: the masthead arrives, then the reading matter.
    const group = (delay: number) =>
        reducedMotion
            ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.12 } }
            : {
                  initial: { opacity: 0, y: 12 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.42, delay, ease: [0.22, 1, 0.36, 1] as const },
              }

    const style = { ['--panel-accent' as string]: accentOnDark(book.spineColor) } as CSSProperties

    const closeButton = (
        <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={copy.close}
            /* No negative margins: the details block is an `overflow-y-auto`
               scroll container, which forces the other axis to clip too, and
               the round hover fill would be sliced off. */
            className="shrink-0 rounded-full p-2 text-white/70 transition-colors hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
            <X className="h-5 w-5" />
        </button>
    )

    const body: ReactNode = (
        <>
            <motion.div {...group(0)}>
                <div className="flex items-center justify-between gap-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
                        {category}
                    </p>
                    {/* Stacked puts the close in the screen corner instead, clear
                        of the text — see below. */}
                    {isSplit && closeButton}
                </div>

                {/* The one colour on screen, and it comes from the book's own data. */}
                <span className="book-details__accent mt-5" aria-hidden="true" />

                <h2
                    id={titleId}
                    className={`mt-6 font-black tracking-tight text-white ${
                        isSplit
                            ? 'text-[clamp(32px,3.4vw,52px)] leading-[0.96]'
                            : 'text-[clamp(26px,6.4vw,34px)] leading-[1.0]'
                    }`}
                >
                    {book.title}
                </h2>
            </motion.div>

            <motion.div {...group(reducedMotion ? 0 : 0.06)}>
                <p className={`mt-4 text-white/70 ${isSplit ? 'text-[17px]' : 'text-[15px]'}`}>
                    {book.author}
                </p>

                <hr className="mt-7 border-0 border-t border-white/20" />

                <p
                    className={`mt-7 max-w-[54ch] text-white/90 ${
                        isSplit ? 'text-[17px] leading-[1.65]' : 'text-[15px] leading-[1.6]'
                    }`}
                >
                    {book.description}
                </p>

                {/* Colophon. The publication year is deliberately not shown; with
                    it gone the ISBN is all that is left, and only 4 of 28 books
                    carry one, so the line drops entirely for the rest rather than
                    leaving a stranded label. */}
                {book.isbn && (
                    <p className="mt-10 text-[11px] uppercase tabular-nums tracking-[0.2em] text-white/45">
                        ISBN {book.isbn}
                    </p>
                )}
            </motion.div>
        </>
    )

    const dialogProps = {
        role: 'dialog' as const,
        'aria-modal': true,
        'aria-labelledby': titleId,
        tabIndex: -1,
        style,
    }

    if (!isSplit) {
        // Not a bottom sheet: the column is anchored to the top of the space the
        // book leaves free (its bottom edge lands around 48vh), so the two can
        // never collide. The wrapper animates opacity only — a transform here
        // would turn its `fixed` children into `absolute` ones.
        return (
            <motion.div
                {...dialogProps}
                ref={dialogRef}
                className="book-details pointer-events-none fixed inset-0 z-[70]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0.12 : 0.25 }}
            >
                <div className="pointer-events-auto absolute right-4 top-4">{closeButton}</div>
                {/* Height hugs the content, up to everything the book leaves
                    free, so short entries keep the space below them tappable —
                    that is what closes the book on touch — and long ones still
                    get the full run before they have to scroll. */}
                <div className="pointer-events-auto absolute inset-x-0 top-[48vh] max-h-[calc(52vh-16px)] overflow-y-auto px-6 pb-10">
                    {body}
                </div>
            </motion.div>
        )
    }

    // The column shares the book's centre line (it settles at h * 0.5). Framer
    // animates `transform` on the children, so the -50% shift lives on this
    // plain wrapper or it would be clobbered.
    return (
        <div className="fixed left-[48%] top-1/2 z-[70] w-[min(44vw,620px)] -translate-y-1/2">
            <motion.div
                {...dialogProps}
                ref={dialogRef}
                className="book-details max-h-[80vh] overflow-y-auto pr-2"
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
                {body}
            </motion.div>
        </div>
    )
}

export default BookDetailsPanel
