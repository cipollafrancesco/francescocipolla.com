'use client'

import React, { useRef } from 'react'
import type { CSSProperties } from 'react'
import { clsx } from 'clsx'
import type { Book } from '@/lib/bookshelf/types'
import { heightScale, spineTextColor, thicknessScale } from './visuals'

interface BookSpineProps {
    book: Book
    /** When true, this book is the one currently extracted — show an empty slot. */
    isOpen: boolean
    /** When true, the book is filtered out — it collapses away (CSS transition). */
    isHidden: boolean
    onOpen: (book: Book, trigger: HTMLButtonElement) => void
    /** Accessible name template — `{title}` and `{author}` get substituted. */
    label: string
}

/**
 * A single book standing on the shelf, viewed by its spine. It is a real
 * <button> for keyboard + screen-reader support. When `isOpen`, the spine fades
 * out and a recessed "empty slot" shows in its place. When `isHidden` (filtered
 * out) the whole book collapses its width — neighbours slide in to fill the gap.
 */
function BookSpine({ book, isOpen, isHidden, onOpen, label }: BookSpineProps) {
    const buttonRef = useRef<HTMLButtonElement>(null)

    const style: CSSProperties = {
        // Per-book theme overrides, all consumed by bookshelf.css.
        ['--bk-scale' as string]: thicknessScale(book),
        ['--bk-height-scale' as string]: heightScale(book),
        ['--spine-color' as string]: book.spineColor,
        ['--spine-text' as string]: spineTextColor(book.spineColor),
        ...(book.spineImage ? { ['--spine-image' as string]: `url("${book.spineImage}")` } : {}),
    }

    return (
        // clsx rather than a template literal: prettier-plugin-tailwindcss strips
        // the leading space out of `${cond ? ' is-empty' : ''}` and silently
        // welds the class names together.
        <div
            className={clsx('book', isOpen && 'is-empty', isHidden && 'is-hidden')}
            style={style}
            aria-hidden={isHidden || undefined}
        >
            <button
                ref={buttonRef}
                type="button"
                className="book__button"
                tabIndex={isHidden ? -1 : undefined}
                aria-label={label.replace('{title}', book.title).replace('{author}', book.author)}
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                onClick={() => buttonRef.current && onOpen(book, buttonRef.current)}
            >
                <span className={clsx('book__spine', book.spineImage && 'book__spine--image')}>
                    <span className="book__title">
                        <span className="book__title-text">{book.title}</span>
                    </span>
                </span>
                <span className="book__top" aria-hidden="true" />
                <span className="book__contact" aria-hidden="true" />
            </button>
            <span className="book__slot" aria-hidden="true" />
        </div>
    )
}

export default React.memo(BookSpine)
