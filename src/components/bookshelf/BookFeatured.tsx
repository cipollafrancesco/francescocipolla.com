'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import type { Book } from '@/lib/bookshelf/types'
import { hasRealCover, heightScale, spineTextColor, thicknessScale } from './visuals'

interface BookFeaturedProps {
    book: Book
    /** Bounding rect of the spine the user clicked — the animation origin. */
    originRect: DOMRect
    /** True on the two-column layout (>= 1024px): the book sits left of the details. */
    isSplit: boolean
    reducedMotion: boolean
}

const COVER_TURN = -78 // degrees of rotateY that brings the cover forward

/** Where the extracted book should settle on screen (its visual centre).
 *  Split: left column, sharing its centre line with the details beside it.
 *  Stacked: centred and high, with the details column starting below it. */
function targetCenter(isSplit: boolean) {
    const w = typeof window === 'undefined' ? 1024 : window.innerWidth
    const h = typeof window === 'undefined' ? 768 : window.innerHeight
    // Stacked centre + half of `targetScale`'s stacked height keeps the book's
    // bottom edge above 46vh, clearing the details column at 48vh. Change one
    // of these three numbers and the other two have to be re-checked.
    return isSplit ? { cx: w * 0.28, cy: h * 0.5 } : { cx: w / 2, cy: h * 0.31 }
}

/** Scale the cover to a comfortable size — books may already be tall on a
 *  full-height shelf, so allow scaling down as well as up. Budgets both height
 *  and width: the cover now takes its own artwork's aspect ratio, so a wide
 *  (near-square) cover needs its own ceiling to stay clear of the details
 *  column beside it in the split layout. */
function targetScale(originRect: DOMRect, isSplit: boolean, coverAr: number) {
    const w = typeof window === 'undefined' ? 1024 : window.innerWidth
    const h = typeof window === 'undefined' ? 768 : window.innerHeight
    const desiredH = isSplit ? Math.min(h * 0.62, 460) : Math.min(h * 0.3, 280)
    // The details column starts at 48vw in the split layout; a near-square cover
    // (up to ~0.87) grown to `desiredH` would otherwise crowd it.
    const maxW = isSplit ? w * 0.36 : w * 0.8
    const base = originRect.height || 200
    return Math.min(3, Math.max(0.5, Math.min(desiredH, maxW / coverAr) / base))
}

/**
 * The extracted book. It springs out of its shelf slot, scales up and rotates
 * (rotateY) to present its cover. Built as a CSS 3D box (spine / cover / pages /
 * top / bottom faces). Lives inside the fixed `.featured-layer`.
 */
function BookFeatured({ book, originRect, isSplit, reducedMotion }: BookFeaturedProps) {
    const [coverFailed, setCoverFailed] = useState(false)
    const showImage = hasRealCover(book) && !coverFailed

    // The cover face takes this book's own artwork proportions (see --cover-ar in
    // bookshelf.css) rather than the shelf's shared depth. Defaults to the most
    // common trade-book ratio so a not-yet-decoded image still reads as a normal
    // book rather than momentarily square.
    const [coverAr, setCoverAr] = useState(2 / 3)
    const imgRef = useRef<HTMLImageElement>(null)

    const readCoverAr = (img: HTMLImageElement) => {
        const { naturalWidth: w, naturalHeight: h } = img
        if (w > 0 && h > 0) setCoverAr(w / h)
    }

    // The shelf has typically already fetched this exact file for the book's
    // spine-adjacent board (BookSpine's --cover-image), so on a real click the
    // image is often already decoded — read it before paint so the cover never
    // visibly resizes. A cold cache falls back to the onLoad handler below.
    useLayoutEffect(() => {
        setCoverAr(2 / 3)
        const img = imgRef.current
        if (img?.complete) readCoverAr(img)
    }, [book.id])

    const T = originRect.width
    const H = originRect.height

    const fromCx = originRect.left + originRect.width / 2
    const fromCy = originRect.top + originRect.height / 2
    const { cx, cy } = targetCenter(isSplit)
    const scale = targetScale(originRect, isSplit, coverAr)

    // `.featured` is sized to the cube (T×H); translate its top-left so the
    // book's centre lands on the chosen point, then scale about that centre.
    const from = { x: fromCx - T / 2, y: fromCy - H / 2, scale: 1 }
    const to = { x: cx - T / 2, y: cy - H / 2, scale }

    const outerTransition = reducedMotion
        ? { duration: 0.12 }
        : { type: 'spring' as const, stiffness: 200, damping: 24, mass: 0.9 }
    const turnTransition = reducedMotion
        ? { duration: 0 }
        : { type: 'spring' as const, stiffness: 170, damping: 22, mass: 0.9 }

    const style: CSSProperties = {
        ['--bk-scale' as string]: thicknessScale(book),
        ['--bk-height-scale' as string]: heightScale(book),
        ['--spine-color' as string]: book.spineColor,
        ['--spine-text' as string]: spineTextColor(book.spineColor),
        ['--cover-bg' as string]: book.spineColor,
        ['--cover-ar' as string]: coverAr,
    }

    return (
        <motion.div
            className="featured"
            style={style}
            initial={from}
            animate={to}
            exit={from}
            transition={outerTransition}
        >
            <motion.div
                className="featured__cube"
                initial={{ rotateY: reducedMotion ? COVER_TURN : 0 }}
                animate={{ rotateY: COVER_TURN }}
                exit={{ rotateY: reducedMotion ? COVER_TURN : 0 }}
                transition={turnTransition}
            >
                <div className="face face--spine">
                    <span className="face__title">{book.title}</span>
                </div>
                <div className="face face--cover">
                    <div className="cover">
                        {/* Generated cover sits underneath; a real cover image overlays it
                and, on load failure, removes itself to reveal the fallback. */}
                        <span className="cover__title">{book.title}</span>
                        <span className="cover__author">{book.author}</span>
                        {showImage && (
                            <img
                                ref={imgRef}
                                className="cover__img"
                                src={book.coverUrl}
                                alt=""
                                onLoad={(e) => readCoverAr(e.currentTarget)}
                                onError={() => setCoverFailed(true)}
                            />
                        )}
                    </div>
                </div>
                <div className="face face--fore" aria-hidden="true" />
                <div className="face face--top" aria-hidden="true" />
                <div className="face face--bottom" aria-hidden="true" />
            </motion.div>
        </motion.div>
    )
}

export default BookFeatured
