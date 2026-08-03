'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import booksData from '@/data/books.json'
import type { Book } from '@/lib/bookshelf/types'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import type { Locale } from '@/i18n/config'
import type { SiteContent } from '@/content/site'

import Bookcase from '@/components/bookshelf/Bookcase'
import BookFeatured from '@/components/bookshelf/BookFeatured'
import BookDetailsPanel from '@/components/bookshelf/BookDetailsPanel'
import CategoryFilter from '@/components/bookshelf/CategoryFilter'
import '@/components/bookshelf/bookshelf.css'

interface Selection {
    book: Book
    rect: DOMRect
}

/** Fallback vanishing point for `.featured-layer`, matching the static value
 *  already in `bookshelf.css` — used only if a click somehow reaches `onOpen`
 *  without a `.bookcase__frame` ancestor to measure. */
const DEFAULT_VP = { x: 50, y: 45 }

/** Shelf order is the order they're listed in. */
const books = booksData as Book[]

/**
 * `.bookcase__frame` and `.featured-layer` are two independent 3D contexts:
 * the shelf's own `perspective-origin` is relative to the frame's box, while
 * the featured layer is a `position: fixed` sheet covering the whole viewport.
 * Left as two hardcoded percentages, they imply two different cameras — most
 * visibly on the split desktop layout, where the frame sits in the right-hand
 * column rather than at viewport-centre, so the extracted book would turn as
 * though watched from a different vantage point than the one that was just
 * looking at it on the shelf.
 *
 * This reprojects the frame's real vanishing point into viewport percentages
 * so `.featured-layer` can be pointed at the same one. Computed fresh on each
 * open rather than cached: the frame moves with the page on scroll, but the
 * fixed layer doesn't, so a value cached on resize would go stale the instant
 * the user scrolls before opening a book. `--scene-origin-y` is read from the
 * frame's own computed style rather than re-declared here, so the vanishing
 * point's vertical position still has exactly one source of truth.
 */
function frameVanishingPoint(trigger: HTMLButtonElement): { vpX: number; vpY: number } {
    const frame = trigger.closest('.bookcase__frame')
    if (!frame || typeof window === 'undefined') return { vpX: DEFAULT_VP.x, vpY: DEFAULT_VP.y }

    const originY = parseFloat(getComputedStyle(frame).getPropertyValue('--scene-origin-y'))
    const originYFraction = Number.isFinite(originY) ? originY / 100 : 0.32

    const r = frame.getBoundingClientRect()
    const vpX = ((r.left + r.width * 0.5) / window.innerWidth) * 100
    const vpY = ((r.top + r.height * originYFraction) / window.innerHeight) * 100
    return { vpX, vpY }
}

interface BooksClientProps {
    lang: Locale
    copy: SiteContent['books']
}

export default function BooksClient({ lang, copy }: BooksClientProps) {
    // Categories present in the library, with counts, for the filter chips.
    const { categories, counts } = useMemo(() => {
        const counts: Record<string, number> = {}
        for (const b of books) {
            if (!b.category) continue
            counts[b.category] = (counts[b.category] || 0) + 1
        }
        // Sorted by the label the reader actually sees, not the raw key, or the
        // English chips would come out in Italian alphabetical order.
        const categories = Object.keys(counts).sort((a, b) =>
            (copy.categories[a] ?? a).localeCompare(copy.categories[b] ?? b, lang)
        )
        return { categories, counts }
    }, [lang, copy.categories])

    const [activeCats, setActiveCats] = useState<Set<string>>(new Set())
    // Books stay mounted; filtered-out ones collapse away (CSS). We just compute
    // which ids are hidden so the shelf layout (packing/height) stays stable.
    const hiddenIds = useMemo(() => {
        if (activeCats.size === 0) return new Set<string>()
        return new Set(
            books.filter((b) => !b.category || !activeCats.has(b.category)).map((b) => b.id)
        )
    }, [activeCats])
    const toggleCat = useCallback((category: string) => {
        setActiveCats((prev) => {
            const next = new Set(prev)
            if (next.has(category)) next.delete(category)
            else next.add(category)
            return next
        })
    }, [])
    const clearCats = useCallback(() => setActiveCats(new Set()), [])

    const [selected, setSelected] = useState<Selection | null>(null)
    const triggerRef = useRef<HTMLButtonElement | null>(null)
    // `AnimatePresence` keeps `BookFeatured` mounted and playing its exit
    // transition for a moment after `selected` goes back to null — the flight
    // back to the shelf needs the same vanishing point as the flight out, or
    // the close would reintroduce exactly the camera jump this was meant to
    // remove. Kept outside React state since it drives a style value that
    // should never itself trigger a render.
    const lastVpRef = useRef<{ vpX: number; vpY: number }>({ vpX: DEFAULT_VP.x, vpY: DEFAULT_VP.y })

    // One flag drives the whole open-book composition: where the book lands, how
    // big it gets, whether the details sit beside it or below it, and whether
    // they can be dragged away. Below 1024px the two columns collide.
    const isSplit = useMediaQuery('(min-width: 1024px)')
    const reducedMotion = Boolean(useReducedMotion())

    const handleOpen = useCallback((book: Book, trigger: HTMLButtonElement) => {
        triggerRef.current = trigger
        lastVpRef.current = frameVanishingPoint(trigger)
        setSelected({ book, rect: trigger.getBoundingClientRect() })
    }, [])

    const handleClose = useCallback(() => {
        setSelected(null)
        // Restore focus to the spine that opened the book, after it remounts.
        requestAnimationFrame(() => triggerRef.current?.focus())
    }, [])

    // Esc to close, and lock body scroll while a book is open.
    useEffect(() => {
        if (!selected) return

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose()
        }
        document.addEventListener('keydown', onKeyDown)

        const prevOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        return () => {
            document.removeEventListener('keydown', onKeyDown)
            document.body.style.overflow = prevOverflow
        }
    }, [selected, handleClose])

    return (
        <div className="bookcase min-h-screen bg-white text-black md:mt-[88px]">
            <main
                id="main-content"
                // Inert while a book is open: the dialog traps Tab regardless,
                // but this also keeps the shelf's spine buttons out of the
                // accessibility tree instead of sitting hidden behind the scrim.
                inert={Boolean(selected)}
                className="container relative mx-auto overflow-x-hidden px-4 pb-24"
            >
                {/* Full-width hero title pinned to the top, layered behind the shelf
                    (z-0) so the shelf rides on top of it. */}
                <motion.h1
                    className="pointer-events-none relative z-0 select-none whitespace-nowrap pt-8 text-center text-[17vw] font-black leading-[0.8] tracking-tight md:pt-2 md:text-left"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    {copy.title}
                </motion.h1>

                {/* Row pulled up under the title: description + filters on the left
                    (sitting just below the title), the shelf on the right riding over it. */}
                <div className="md:relative md:z-10 md:-mt-[13vw] md:flex md:items-start md:gap-6">
                    {/* Description + filters — left-aligned, below the title. */}
                    <div className="relative z-20 mt-5 text-center md:mt-0 md:w-[40%] md:pt-[14.5vw] md:text-left">
                        <p className="text-lg leading-8 text-gray-700">{copy.lead}</p>
                        <div className="mt-5">
                            <CategoryFilter
                                categories={categories}
                                active={activeCats}
                                counts={counts}
                                labels={copy.categories}
                                onToggle={toggleCat}
                                onClear={clearCats}
                                allLabel={copy.filterAll}
                                groupLabel={copy.filterLabel}
                            />
                        </div>
                    </div>

                    {/* Shelf — foreground (z-10), on the right, overlapping the title.
                        The top padding lets more of the title show above the shelf. */}
                    <div className="relative z-10 mt-6 md:mt-0 md:w-[60%] md:pt-[5vw]">
                        <Bookcase
                            books={books}
                            openId={selected?.book.id ?? null}
                            hiddenIds={hiddenIds}
                            onOpen={handleOpen}
                            spineLabel={copy.spineLabel}
                        />
                    </div>
                </div>
            </main>

            {/* The scrim and the details both sit OUTSIDE `.featured-layer` on
                purpose. That layer sets `perspective`, which makes it a backdrop
                root — anything rendered inside it would have nothing but the flat
                layer to blur, and `backdrop-filter` would silently do nothing.
                Order matters: scrim (z-55) → book (z-60) → details (z-70). */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        key="backdrop"
                        className="featured-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: reducedMotion ? 0.1 : 0.3 }}
                        onClick={handleClose}
                    />
                )}
            </AnimatePresence>

            {/* Always-mounted perspective layer so the featured book's rotateY has a
                perspective ancestor; its contents animate in/out via AnimatePresence.
                It stays `pointer-events: none`, so clicks fall through to the scrim.
                `perspectiveOrigin` is set inline to the shelf's own vanishing point
                (see `frameVanishingPoint`) — this fixed, full-viewport layer would
                otherwise use its own camera, independent of and different from the
                one that was just rendering the book on the shelf. Read from
                `lastVpRef` rather than `selected` directly: `selected` is already
                null partway through the close, while `BookFeatured` is still
                mounted and flying back to the shelf under `AnimatePresence`'s exit
                transition, and the camera can't jump mid-flight. Falls back to the
                CSS rule's `50% 45%` before anything has ever been selected. */}
            <div
                className="featured-layer"
                aria-hidden={selected ? undefined : true}
                style={{
                    perspectiveOrigin: `${lastVpRef.current.vpX}% ${lastVpRef.current.vpY}%`,
                }}
            >
                <AnimatePresence>
                    {selected && (
                        <BookFeatured
                            key="featured"
                            book={selected.book}
                            originRect={selected.rect}
                            isSplit={isSplit}
                            reducedMotion={reducedMotion}
                        />
                    )}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {selected && (
                    <BookDetailsPanel
                        key="panel"
                        book={selected.book}
                        isSplit={isSplit}
                        reducedMotion={reducedMotion}
                        onClose={handleClose}
                        copy={copy}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}
