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
        const pointer = {
            active: false,
            x: -1000,
            y: -1000,
        }

        let frame = 0
        let lastDraw = 0
        let isVisible = true
        let canAnimate = !reduceMotionQuery.matches
        let canInteract = pointerQuery.matches && canAnimate
        let rect = canvas.getBoundingClientRect()

        const draw = (time = 0) => {
            if (rect.width <= 0 || rect.height <= 0) {
                return
            }

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

                    if (pointer.active && canInteract) {
                        const distanceX = x - pointer.x
                        const distanceY = warpedY - pointer.y
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

        const resize = () => {
            rect = canvas.getBoundingClientRect()
            const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)

            canvas.width = Math.floor(rect.width * pixelRatio)
            canvas.height = Math.floor(rect.height * pixelRatio)
            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
            start()
        }

        const handlePointerMove = (event: PointerEvent) => {
            rect = canvas.getBoundingClientRect()
            pointer.x = event.clientX - rect.left
            pointer.y = event.clientY - rect.top
            pointer.active =
                pointer.x >= 0 &&
                pointer.x <= rect.width &&
                pointer.y >= 0 &&
                pointer.y <= rect.height
        }

        const handlePointerLeave = () => {
            pointer.active = false
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
        window.addEventListener('pointermove', handlePointerMove, { passive: true })
        window.addEventListener('pointerleave', handlePointerLeave)
        pointerQuery.addEventListener('change', handleMediaChange)
        reduceMotionQuery.addEventListener('change', handleMediaChange)
        resize()

        return () => {
            stop()
            observer.disconnect()
            resizeObserver.disconnect()
            window.removeEventListener('pointermove', handlePointerMove)
            window.removeEventListener('pointerleave', handlePointerLeave)
            pointerQuery.removeEventListener('change', handleMediaChange)
            reduceMotionQuery.removeEventListener('change', handleMediaChange)
        }
    }, [])

    return <canvas ref={canvasRef} aria-hidden="true" className={className} />
}
