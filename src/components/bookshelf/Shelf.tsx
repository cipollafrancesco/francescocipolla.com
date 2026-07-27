'use client'

import React from 'react'
import type { Book } from '@/lib/bookshelf/types'
import BookSpine from './BookSpine'

interface ShelfProps {
    books: Book[]
    openId: string | null
    hiddenIds: Set<string>
    onOpen: (book: Book, trigger: HTMLButtonElement) => void
    /** Accessible name template for each spine — see BookSpine. */
    spineLabel: string
}

/**
 * One horizontal shelf: a recessed back wall, a row of books standing on the
 * plank, and the plank's front lip for thickness. Purely presentational.
 */
function Shelf({ books, openId, hiddenIds, onOpen, spineLabel }: ShelfProps) {
    return (
        <div className="shelf">
            <div className="shelf__back" aria-hidden="true" />
            <div className="shelf__row">
                <div className="shelf__plank" aria-hidden="true" />
                {books.map((book) => (
                    <BookSpine
                        key={book.id}
                        book={book}
                        isOpen={book.id === openId}
                        isHidden={hiddenIds.has(book.id)}
                        onOpen={onOpen}
                        label={spineLabel}
                    />
                ))}
                <div className="shelf__lip" aria-hidden="true" />
            </div>
        </div>
    )
}

export default React.memo(Shelf)
