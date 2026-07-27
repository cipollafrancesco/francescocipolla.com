'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import booksData from '@/data/books.json'
import type { Book } from '@/lib/bookshelf/types'
import { DEFAULT_SORT, sortBooks } from '@/lib/bookshelf/sortBooks'
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

interface BooksClientProps {
    lang: Locale
    copy: SiteContent['books']
}

export default function BooksClient({ lang, copy }: BooksClientProps) {
    // Phase 1 ships a single sort criterion; the union + pure sort are ready for
    // a future dropdown without touching this page.
    const books = useMemo(() => sortBooks(booksData as Book[], DEFAULT_SORT), [])

    // Categories present in the library, with counts, for the filter chips.
    const { categories, counts } = useMemo(() => {
        const counts: Record<string, number> = {}
        for (const b of books) {
            if (!b.category) continue
            counts[b.category] = (counts[b.category] || 0) + 1
        }
        const categories = Object.keys(counts).sort((a, b) => a.localeCompare(b, lang))
        return { categories, counts }
    }, [books, lang])

    const [activeCats, setActiveCats] = useState<Set<string>>(new Set())
    // Books stay mounted; filtered-out ones collapse away (CSS). We just compute
    // which ids are hidden so the shelf layout (packing/height) stays stable.
    const hiddenIds = useMemo(() => {
        if (activeCats.size === 0) return new Set<string>()
        return new Set(
            books.filter((b) => !b.category || !activeCats.has(b.category)).map((b) => b.id)
        )
    }, [books, activeCats])
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

    const isMobile = useMediaQuery('(max-width: 767px)')
    const reducedMotion = Boolean(useReducedMotion())

    const handleOpen = useCallback((book: Book, trigger: HTMLButtonElement) => {
        triggerRef.current = trigger
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
        <div className="bookcase min-h-screen bg-neutral-50 text-black md:mt-[88px]">
            <main
                id="main-content"
                className="container relative mx-auto overflow-x-hidden px-4 pb-24"
            >
                {/* Full-width hero title pinned to the top, layered behind the shelf
                    (z-0) so the shelf rides on top of it. */}
                <motion.h1
                    className="pointer-events-none relative z-0 select-none whitespace-nowrap pt-8 text-center text-[17vw] font-extrabold leading-[0.8] tracking-tighter md:pt-2 md:text-left"
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
                        <p className="text-base text-gray-600 md:text-lg">{copy.lead}</p>
                        <div className="mt-5">
                            <CategoryFilter
                                categories={categories}
                                active={activeCats}
                                counts={counts}
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

            {/* Always-mounted perspective layer so the featured book's rotateY has a
                perspective ancestor; its contents animate in/out via AnimatePresence. */}
            <div className="featured-layer" aria-hidden={selected ? undefined : true}>
                <AnimatePresence>
                    {selected && (
                        <motion.div
                            key="backdrop"
                            className="featured-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: reducedMotion ? 0.1 : 0.25 }}
                            onClick={handleClose}
                        />
                    )}
                    {selected && (
                        <BookFeatured
                            key="featured"
                            book={selected.book}
                            originRect={selected.rect}
                            isMobile={isMobile}
                            reducedMotion={reducedMotion}
                        />
                    )}
                    {selected && (
                        <BookDetailsPanel
                            key="panel"
                            book={selected.book}
                            isMobile={isMobile}
                            reducedMotion={reducedMotion}
                            onClose={handleClose}
                            lang={lang}
                            copy={copy}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
