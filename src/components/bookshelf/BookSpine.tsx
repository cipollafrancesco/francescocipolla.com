'use client'

import React, { useRef } from 'react'
import type { CSSProperties } from 'react'
import { clsx } from 'clsx'
import type { Book } from '@/lib/bookshelf/types'
import {
    bindingOf,
    depthInset,
    foilColors,
    hasBands,
    hasRealCover,
    heightScale,
    spineTextColor,
    thicknessScale,
    wear,
} from './visuals'

interface BookSpineProps {
    book: Book
    /** When true, this book is the one currently extracted — show an empty slot. */
    isOpen: boolean
    /** When true, the book is filtered out — it collapses away (CSS transition). */
    isHidden: boolean
    /** Horizontal position in its row, 0 (left) to 1 (right). Drives the sheen:
     *  one light source means the highlight travels along the row. */
    rowPos: number
    onOpen: (book: Book, trigger: HTMLButtonElement) => void
    /** Accessible name template — `{title}` and `{author}` get substituted. */
    label: string
}

/**
 * A single book standing on the shelf, viewed by its spine. It is a real
 * <button> for keyboard + screen-reader support. When `isOpen`, the spine fades
 * out and a recessed "empty slot" shows in its place. When `isHidden` (filtered
 * out) the whole book collapses its width — neighbours slide in to fill the gap.
 *
 * Geometrically it is a box open at the back: the spine at the shelf's front
 * plane, the two cover boards folded away from it, and the top page-edge folded
 * back over the head. Only the cover facing the camera ever paints
 * (`backface-visibility`), so both can be rendered unconditionally.
 */
function BookSpine({ book, isOpen, isHidden, rowPos, onOpen, label }: BookSpineProps) {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const binding = bindingOf(book)

    const style: CSSProperties = {
        // Per-book theme overrides, all consumed by bookshelf.css.
        ['--bk-scale' as string]: thicknessScale(book),
        ['--bk-height-scale' as string]: heightScale(book),
        ['--bk-inset' as string]: depthInset(book),
        ['--bk-pos' as string]: rowPos.toFixed(3),
        ['--bk-wear' as string]: wear(book),
        ['--spine-color' as string]: book.spineColor,
        ['--spine-text' as string]: spineTextColor(book.spineColor),
        ...(book.spineImage ? { ['--spine-image' as string]: `url("${book.spineImage}")` } : {}),
        // The front-cover scan, shown on the right board whenever perspective
        // reveals it. Placeholder covers fall back to the plain board colour
        // via the CSS `var()` default.
        ...(hasRealCover(book) ? { ['--cover-image' as string]: `url("${book.coverUrl}")` } : {}),
        // Foil is stamped, not printed, so only cloth spines get a colour pair
        // to paint one — jacket and paper titles stay plain ink.
        ...(binding === 'cloth'
            ? (() => {
                  const [a, b] = foilColors(book)
                  return { ['--foil-a' as string]: a, ['--foil-b' as string]: b }
              })()
            : {}),
    }

    return (
        // clsx rather than a template literal: prettier-plugin-tailwindcss strips
        // the leading space out of `${cond ? ' is-empty' : ''}` and silently
        // welds the class names together.
        <div
            className={clsx(
                'book',
                `book--${binding}`,
                binding === 'cloth' && hasBands(book) && 'book--banded',
                isOpen && 'is-empty',
                isHidden && 'is-hidden'
            )}
            style={style}
            aria-hidden={isHidden || undefined}
        >
            {/* The hit target, and deliberately a flat empty box rather than the
                wrapper around the artwork it used to be. Chrome will not
                hit-test into a subtree that carries a 3D translate once a real
                perspective is live: with the faces inside it, every book on the
                shelf became unclickable. Keeping the button free of 3D — a plain
                sibling of the geometry — keeps its hit box the same rectangle
                the layout gave it. It must stay BEFORE `.book__body`, which the
                hover and focus rules select with `~`. */}
            <button
                ref={buttonRef}
                type="button"
                className="book__button"
                tabIndex={isHidden ? -1 : undefined}
                aria-label={label.replace('{title}', book.title).replace('{author}', book.author)}
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                onClick={() => buttonRef.current && onOpen(book, buttonRef.current)}
            />
            {/* Everything visible about the book, and the only thing carrying a
                depth offset. `pointer-events: none` lets clicks fall through to
                the button underneath it. */}
            <span className="book__body" aria-hidden="true">
                <span className={clsx('book__spine', book.spineImage && 'book__spine--image')}>
                    <span className="book__title">
                        <span className="book__title-text">{book.title}</span>
                    </span>
                </span>
                {/* Cover boards. Whichever one is turned away from the camera is
                    dropped by backface-visibility, so which side of the vanishing
                    point the book sits on needs no measuring. */}
                <span className="book__side book__side--left" />
                <span className="book__side book__side--right" />
                <span className="book__top" />
                <span className="book__contact" />
            </span>
            <span className="book__slot" aria-hidden="true" />
        </div>
    )
}

export default React.memo(BookSpine)
