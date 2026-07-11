'use client'

import React, { useEffect, useRef } from 'react'
import { motion, type PanInfo } from 'framer-motion'
import { X, Star } from 'lucide-react'
import type { Book } from '@/lib/bookshelf/types'

interface BookDetailsPanelProps {
  book: Book
  isMobile: boolean
  reducedMotion: boolean
  onClose: () => void
}

function formatLongDate(iso: string): string {
  const t = Date.parse(iso)
  if (Number.isNaN(t)) return iso
  return new Date(t).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function publishedLabel(value: string): string {
  const year = value.match(/\d{4}/)?.[0]
  return year ?? value
}

function Rating({ value }: { value: number }) {
  const rounded = Math.round(value)
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`Rating: ${value} out of 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className="h-4 w-4"
          aria-hidden="true"
          fill={i < rounded ? 'currentColor' : 'none'}
          strokeWidth={1.5}
        />
      ))}
    </div>
  )
}

/**
 * Book details. Desktop: a panel on the right of the featured book. Mobile: a
 * bottom sheet that can be dragged down to dismiss. Acts as a modal dialog.
 */
function BookDetailsPanel({
  book,
  isMobile,
  reducedMotion,
  onClose,
}: BookDetailsPanelProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const titleId = `book-title-${book.id}`

  // Move focus into the dialog on open (focus is restored by the page on close).
  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  const transition = reducedMotion
    ? { duration: 0.12 }
    : { type: 'spring' as const, stiffness: 260, damping: 30 }

  const motionProps = isMobile
    ? {
        initial: { y: '100%' },
        animate: { y: 0 },
        exit: { y: '100%' },
        drag: 'y' as const,
        dragConstraints: { top: 0, bottom: 0 },
        dragElastic: { top: 0, bottom: 0.6 },
        onDragEnd: (_e: unknown, info: PanInfo) => {
          if (info.offset.y > 120 || info.velocity.y > 700) onClose()
        },
      }
    : {
        initial: { x: 40, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: 40, opacity: 0 },
      }

  const positionClasses = isMobile
    ? 'inset-x-0 bottom-0 rounded-t-2xl max-h-[72vh]'
    : 'right-0 top-0 h-full w-[min(420px,40vw)] rounded-l-2xl'

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      tabIndex={-1}
      className={`pointer-events-auto fixed z-[70] overflow-y-auto bg-white text-black shadow-2xl ${positionClasses}`}
      transition={transition}
      {...motionProps}
    >
      {isMobile && (
        <div className="flex justify-center pt-3" aria-hidden="true">
          <span className="h-1.5 w-12 rounded-full bg-gray-300" />
        </div>
      )}

      <div className="relative p-6 md:p-8">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute right-4 top-4 rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 id={titleId} className="pr-10 text-2xl font-bold leading-tight">
          {book.title}
        </h2>
        <p className="mt-1 text-base text-gray-600">{book.author}</p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
          <span>Published {publishedLabel(book.publishedDate)}</span>
          {book.dateRead && <span>Read {formatLongDate(book.dateRead)}</span>}
          {typeof book.rating === 'number' && <Rating value={book.rating} />}
        </div>

        <p className="mt-5 text-[15px] leading-relaxed text-gray-800">
          {book.description}
        </p>

        {book.personalNotes && (
          <div className="mt-6 border-l-2 border-gray-300 pl-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Notes
            </h3>
            <p className="mt-1 text-[15px] italic leading-relaxed text-gray-700">
              {book.personalNotes}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default BookDetailsPanel
