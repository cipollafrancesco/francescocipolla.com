'use client'

import { useEffect, useRef, useState } from 'react'
import type { Book } from '@/lib/bookshelf/types'
import Shelf from './Shelf'
import { thicknessScale } from './visuals'

interface BookcaseProps {
  books: Book[]
  openId: string | null
  /** Ids filtered out — those books collapse away (handled in BookSpine/CSS). */
  hiddenIds: Set<string>
  onOpen: (book: Book, trigger: HTMLButtonElement) => void
}

/** Smallest a book may get before the cabinet scrolls instead of squashing.
 *  Tall enough that spine titles stay readable rather than getting clipped. */
const MIN_BOOK_HEIGHT = 230
/** Vertical breathing room per shelf (plank lip + a little air). */
const LIP_ALLOWANCE = 20

/** Greedy pack books into shelves so no row exceeds the available width. */
function packShelves(books: Book[], availW: number, base: number): Book[][] {
  const shelves: Book[][] = [[]]
  let used = 0
  for (const book of books) {
    const w = base * thicknessScale(book)
    const current = shelves[shelves.length - 1]
    if (used + w > availW && current.length > 0) {
      shelves.push([])
      used = 0
    }
    shelves[shelves.length - 1].push(book)
    used += w
  }
  return shelves
}

const signature = (shelves: Book[][]) => shelves.map((s) => s.length).join(',')

/**
 * The perspective scene. Books pack into as many shelves as the width needs, and
 * `--book-height` is sized so those shelves share the cabinet's height — one tall
 * shelf when everything fits on a wide screen, more (shorter) shelves as it
 * narrows. `--book-height`/`--book-depth` are set on the `.bookcase` theme scope
 * so the shelf and the extracted/featured book stay in sync.
 */
function Bookcase({ books, openId, hiddenIds, onOpen }: BookcaseProps) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  // depth:height ratio of the base tokens (captured before we override them).
  const depthRatioRef = useRef<number | null>(null)
  const [shelves, setShelves] = useState<Book[][]>([books])

  useEffect(() => {
    const scene = sceneRef.current
    const frame = frameRef.current
    if (!scene || !frame) return
    const root = frame.closest('.bookcase') as HTMLElement | null

    const measure = () => {
      const sceneCs = getComputedStyle(scene)
      const frameCs = getComputedStyle(frame)

      if (depthRatioRef.current == null) {
        const baseH = parseFloat(frameCs.getPropertyValue('--book-height')) || 230
        const baseD = parseFloat(frameCs.getPropertyValue('--book-depth')) || 150
        depthRatioRef.current = baseD / baseH
      }

      // --- Width: pack books into shelves so a row never overflows. Measure the
      // actual usable width of a rendered row (its content box, after the row's
      // own horizontal padding) so the estimate matches what books really get. ---
      const row = frame.querySelector('.shelf__row') as HTMLElement | null
      let innerW: number
      if (row) {
        const rcs = getComputedStyle(row)
        innerW =
          row.clientWidth -
          parseFloat(rcs.paddingLeft || '0') -
          parseFloat(rcs.paddingRight || '0')
      } else {
        const padX =
          parseFloat(frameCs.paddingLeft || '0') +
          parseFloat(frameCs.paddingRight || '0')
        innerW = frame.clientWidth - padX
      }
      const base = parseFloat(frameCs.getPropertyValue('--book-thickness')) || 32
      const packed = packShelves(books, innerW - 2, base) // tiny safety margin
      const n = packed.length

      // --- Height: a stable, viewport-based target (not content-driven, so
      // overflow can't feed back into the measurement and oscillate). ---
      const targetH =
        parseFloat(sceneCs.minHeight) || window.innerHeight - 220
      const scenePadY =
        parseFloat(sceneCs.paddingTop || '0') +
        parseFloat(sceneCs.paddingBottom || '0')
      const framePadY =
        parseFloat(frameCs.paddingTop || '0') +
        parseFloat(frameCs.paddingBottom || '0')
      const gap = parseFloat(frameCs.rowGap || frameCs.gap || '0') || 28
      const innerH = targetH - scenePadY - framePadY

      const h = Math.max(
        MIN_BOOK_HEIGHT,
        Math.floor((innerH - (n - 1) * gap) / n) - LIP_ALLOWANCE,
      )
      root?.style.setProperty('--book-height', `${h}px`)
      root?.style.setProperty(
        '--book-depth',
        `${Math.round(h * (depthRatioRef.current ?? 0.65))}px`,
      )

      // Only re-render when the per-shelf grouping actually changes.
      setShelves((prev) =>
        signature(prev) === signature(packed) ? prev : packed,
      )
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(scene)
    return () => {
      ro.disconnect()
      root?.style.removeProperty('--book-height')
      root?.style.removeProperty('--book-depth')
    }
  }, [books])

  return (
    <div className="bookcase__scene" ref={sceneRef}>
      <div className="bookcase__frame" ref={frameRef}>
        {shelves.map((shelfBooks, i) => (
          <Shelf
            key={i}
            books={shelfBooks}
            openId={openId}
            hiddenIds={hiddenIds}
            onOpen={onOpen}
          />
        ))}
      </div>
    </div>
  )
}

export default Bookcase
