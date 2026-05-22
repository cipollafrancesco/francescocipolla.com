'use client'

import { useEffect, useRef } from 'react'

interface HeroVectorFieldProps {
    className?: string
}

interface FieldPoint {
    baseX: number
    baseY: number
    x: number
    y: number
    phase: number
}

const FIELD_COLUMNS = 16
const FIELD_ROWS = 8
const INTERACTION_RADIUS = 280

function seededOffset(seed: number, range: number) {
    return (Math.sin(seed * 91.7) * 0.5 + Math.sin(seed * 17.3) * 0.5) * range
}

function buildField(width: number, height: number) {
    const points: FieldPoint[] = []
    const usableWidth = width * 0.94
    const usableHeight = height * 0.76
    const offsetX = width * 0.03
    const offsetY = height * 0.12

    for (let row = 0; row < FIELD_ROWS; row += 1) {
        for (let column = 0; column < FIELD_COLUMNS; column += 1) {
            const seed = row * FIELD_COLUMNS + column + 1
            const baseX =
                offsetX + (column / (FIELD_COLUMNS - 1)) * usableWidth + seededOffset(seed, 16)
            const baseY =
                offsetY + (row / (FIELD_ROWS - 1)) * usableHeight + seededOffset(seed + 11, 18)

            points.push({
                baseX,
                baseY,
                x: baseX,
                y: baseY,
                phase: seed * 0.37,
            })
        }
    }

    return points
}

export function HeroVectorField({ className }: HeroVectorFieldProps) {
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

        let points: FieldPoint[] = []
        let frame = 0
        let isVisible = true
        let canAnimate = pointerQuery.matches && !reduceMotionQuery.matches
        let rect = canvas.getBoundingClientRect()

        const draw = (time = 0) => {
            if (rect.width <= 0 || rect.height <= 0) {
                return
            }

            context.clearRect(0, 0, rect.width, rect.height)
            context.lineWidth = 1.15

            for (const point of points) {
                const distanceX = pointer.x - point.baseX
                const distanceY = pointer.y - point.baseY
                const distance = Math.hypot(distanceX, distanceY) || 1
                const force =
                    pointer.active && canAnimate
                        ? Math.max(0, 1 - distance / INTERACTION_RADIUS)
                        : 0
                const idleX = canAnimate ? Math.sin(time * 0.0007 + point.phase) * 1.6 : 0
                const idleY = canAnimate ? Math.cos(time * 0.0006 + point.phase) * 1.2 : 0
                const targetX = point.baseX - (distanceX / distance) * force * 46 + idleX
                const targetY = point.baseY - (distanceY / distance) * force * 40 + idleY

                point.x += (targetX - point.x) * 0.08
                point.y += (targetY - point.y) * 0.08
            }

            for (let index = 0; index < points.length; index += 1) {
                const point = points[index]

                for (let nextIndex = index + 1; nextIndex < points.length; nextIndex += 1) {
                    const next = points[nextIndex]
                    const distance = Math.hypot(point.x - next.x, point.y - next.y)

                    if (distance < 150) {
                        const alpha = (1 - distance / 150) * 0.22
                        context.strokeStyle = `rgba(0, 0, 0, ${alpha})`
                        context.beginPath()
                        context.moveTo(point.x, point.y)
                        context.lineTo(next.x, next.y)
                        context.stroke()
                    }
                }

                context.fillStyle = 'rgba(0, 0, 0, 0.34)'
                context.beginPath()
                context.arc(point.x, point.y, 1.35, 0, Math.PI * 2)
                context.fill()
            }
        }

        const stop = () => {
            if (frame) {
                window.cancelAnimationFrame(frame)
                frame = 0
            }
        }

        const tick = (time: number) => {
            draw(time)
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
            points = buildField(rect.width, rect.height)
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
            canAnimate = pointerQuery.matches && !reduceMotionQuery.matches
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
