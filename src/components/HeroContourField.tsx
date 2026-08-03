'use client'

import { useEffect, useRef } from 'react'

interface HeroContourFieldProps {
    className?: string
}

const LINE_COUNT = 18
const SAMPLE_STEP = 18
const INTERACTION_RADIUS = 340

export function HeroContourField({ className }: HeroContourFieldProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')

        if (!canvas || !context) {
            return
        }

        const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        const pointerQuery = window.matchMedia(
            '(hover: hover) and (pointer: fine) and (min-width: 768px)'
        )
        // Raw viewport coordinates. Converting to canvas-local space is deferred
        // to `draw()`, which already runs at most 30×/sec and is the only reader
        // — so a moving canvas (scroll) can never leave the pointer mapped
        // against a stale rect, and no handler has to force a layout flush.
        const pointer = {
            inWindow: false,
            clientX: -1000,
            clientY: -1000,
        }

        let frame = 0
        let lastDraw = 0
        let isVisible = true
        let canAnimate = !reduceMotionQuery.matches
        let canInteract = pointerQuery.matches && canAnimate
        let rect = canvas.getBoundingClientRect()
        let rectDirty = false

        const draw = (time = 0) => {
            if (rectDirty) {
                rect = canvas.getBoundingClientRect()
                rectDirty = false
            }

            if (rect.width <= 0 || rect.height <= 0) {
                return
            }

            const pointerX = pointer.clientX - rect.left
            const pointerY = pointer.clientY - rect.top
            const pointerActive =
                pointer.inWindow &&
                pointerX >= 0 &&
                pointerX <= rect.width &&
                pointerY >= 0 &&
                pointerY <= rect.height

            context.clearRect(0, 0, rect.width, rect.height)
            context.lineCap = 'round'
            context.lineJoin = 'round'

            const spacing = rect.height / (LINE_COUNT - 1)
            const startX = -80
            const endX = rect.width + 80

            for (let line = 0; line < LINE_COUNT; line += 1) {
                const baseY = line * spacing
                const baseAlpha = line % 3 === 0 ? 0.19 : 0.12

                context.strokeStyle = `rgba(0, 0, 0, ${baseAlpha})`
                context.lineWidth = line % 3 === 0 ? 1.25 : 0.9
                context.beginPath()

                for (let x = startX; x <= endX; x += SAMPLE_STEP) {
                    const wave =
                        Math.sin(x * 0.011 + line * 0.85 + time * 0.00055) * 13 +
                        Math.sin(x * 0.026 - line * 0.45 - time * 0.00038) * 6
                    let warpedX = x
                    let warpedY = baseY + wave

                    if (pointerActive && canInteract) {
                        const distanceX = x - pointerX
                        const distanceY = warpedY - pointerY
                        const distance = Math.hypot(distanceX, distanceY) || 1
                        const force = Math.max(0, 1 - distance / INTERACTION_RADIUS)
                        const ripple = Math.sin(distance * 0.045 - time * 0.004) * force * 11

                        warpedX += (distanceX / distance) * force * 24
                        warpedY += (distanceY / distance) * force * 68 + ripple
                    }

                    if (x === startX) {
                        context.moveTo(warpedX, warpedY)
                    } else {
                        context.lineTo(warpedX, warpedY)
                    }
                }

                context.stroke()
            }
        }

        const stop = () => {
            if (frame) {
                window.cancelAnimationFrame(frame)
                frame = 0
            }
        }

        const tick = (time: number) => {
            if (time - lastDraw > 1000 / 30) {
                draw(time)
                lastDraw = time
            }

            frame = window.requestAnimationFrame(tick)
        }

        const start = () => {
            stop()

            if (isVisible && canAnimate) {
                frame = window.requestAnimationFrame(tick)
            } else {
                draw()
            }
        }

        // Scroll moves the canvas relative to the viewport without changing its
        // size, so it only has to invalidate the cached rect — `draw()` picks
        // the new one up on its next frame. Setting a boolean keeps the scroll
        // handler free of layout reads.
        const markRectDirty = () => {
            rectDirty = true
        }

        const resize = () => {
            rect = canvas.getBoundingClientRect()
            rectDirty = false
            const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)

            canvas.width = Math.floor(rect.width * pixelRatio)
            canvas.height = Math.floor(rect.height * pixelRatio)
            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
            start()
        }

        // Records the raw event coordinates and nothing else. This listener is
        // on `window` and can fire well past 60/sec on a high polling-rate
        // mouse, so it must not read layout; `draw()` does the conversion.
        const handlePointerMove = (event: PointerEvent) => {
            pointer.inWindow = true
            pointer.clientX = event.clientX
            pointer.clientY = event.clientY
        }

        const handlePointerLeave = () => {
            pointer.inWindow = false
        }

        const handleMediaChange = () => {
            canAnimate = !reduceMotionQuery.matches
            canInteract = pointerQuery.matches && canAnimate
            start()
        }

        const observer = new IntersectionObserver(([entry]) => {
            isVisible = entry.isIntersecting

            if (isVisible) {
                start()
            } else {
                stop()
            }
        })

        const resizeObserver = new ResizeObserver(resize)

        observer.observe(canvas)
        resizeObserver.observe(canvas)
        // Stays on `window`, not the canvas: the canvas is rendered
        // `pointer-events-none` (clicks need to pass through to real content
        // layered on top of this decorative background), so it can never be
        // the target of its own pointer events.
        window.addEventListener('pointermove', handlePointerMove, { passive: true })
        window.addEventListener('pointerleave', handlePointerLeave)
        window.addEventListener('scroll', markRectDirty, { passive: true, capture: true })
        pointerQuery.addEventListener('change', handleMediaChange)
        reduceMotionQuery.addEventListener('change', handleMediaChange)
        resize()

        return () => {
            stop()
            observer.disconnect()
            resizeObserver.disconnect()
            window.removeEventListener('pointermove', handlePointerMove)
            window.removeEventListener('pointerleave', handlePointerLeave)
            window.removeEventListener('scroll', markRectDirty, { capture: true })
            pointerQuery.removeEventListener('change', handleMediaChange)
            reduceMotionQuery.removeEventListener('change', handleMediaChange)
        }
    }, [])

    return <canvas ref={canvasRef} aria-hidden="true" className={className} />
}
