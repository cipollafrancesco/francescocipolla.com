'use client'

import { useState } from 'react'
import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import type { Book } from '@/lib/bookshelf/types'
import { hasRealCover, heightScale, spineTextColor, thicknessScale } from './visuals'

interface BookFeaturedProps {
  book: Book
  /** Bounding rect of the spine the user clicked — the animation origin. */
  originRect: DOMRect
  isMobile: boolean
  reducedMotion: boolean
}

const COVER_TURN = -78 // degrees of rotateY that brings the cover forward

/** Where the extracted book should settle on screen (its visual centre). */
function targetCenter(isMobile: boolean) {
  const w = typeof window === 'undefined' ? 1024 : window.innerWidth
  const h = typeof window === 'undefined' ? 768 : window.innerHeight
  return isMobile
    ? { cx: w / 2, cy: h * 0.34 }
    : { cx: w * 0.36, cy: h * 0.5 }
}

/** Scale the cover to a comfortable size — books may already be tall on a
 *  full-height shelf, so allow scaling down as well as up. */
function targetScale(originRect: DOMRect, isMobile: boolean) {
  const h = typeof window === 'undefined' ? 768 : window.innerHeight
  const desired = isMobile ? Math.min(h * 0.34, 300) : Math.min(h * 0.62, 460)
  const base = originRect.height || 200
  return Math.min(3, Math.max(0.5, desired / base))
}

/**
 * The extracted book. It springs out of its shelf slot, scales up and rotates
 * (rotateY) to present its cover. Built as a CSS 3D box (spine / cover / pages /
 * top / bottom faces). Lives inside the fixed `.featured-layer`.
 */
function BookFeatured({ book, originRect, isMobile, reducedMotion }: BookFeaturedProps) {
  const [coverFailed, setCoverFailed] = useState(false)
  const showImage = hasRealCover(book) && !coverFailed

  const T = originRect.width
  const H = originRect.height

  const fromCx = originRect.left + originRect.width / 2
  const fromCy = originRect.top + originRect.height / 2
  const { cx, cy } = targetCenter(isMobile)
  const scale = targetScale(originRect, isMobile)

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
                className="cover__img"
                src={book.coverUrl}
                alt=""
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
