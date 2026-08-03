'use client'

import Image from 'next/image'
import { useRef, type PointerEvent, type ReactNode } from 'react'
import { usePointerEffects } from '@/hooks/useMediaQuery'

type ProfileTiltCardProps = {
    src: string
    alt: string
    sizes: string
    caption: ReactNode
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

export function ProfileTiltCard({ src, alt, sizes, caption }: ProfileTiltCardProps) {
    const figureRef = useRef<HTMLElement>(null)
    const canTilt = usePointerEffects()

    // Writes the CSS custom properties the figure's `transform` reads,
    // instead of `setState` — a state update here would re-render the whole
    // card (`next/image` included) at pointer-event rate.
    const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
        if (!canTilt || event.pointerType === 'touch' || !figureRef.current) {
            return
        }

        const rect = event.currentTarget.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width - 0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5

        figureRef.current.style.setProperty('--tilt-x', `${clamp(y * -7, -5, 5)}deg`)
        figureRef.current.style.setProperty('--tilt-y', `${clamp(x * 8, -6, 6)}deg`)
    }

    const resetTilt = () => {
        figureRef.current?.style.setProperty('--tilt-x', '0deg')
        figureRef.current?.style.setProperty('--tilt-y', '0deg')
    }

    return (
        <div className="[perspective:900px] motion-reduce:[perspective:none]">
            <figure
                ref={figureRef}
                className="group relative overflow-hidden border border-black bg-neutral-100 transition-transform duration-200 ease-out will-change-transform motion-reduce:transition-none"
                style={{
                    transform: 'rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))',
                    transformStyle: 'preserve-3d',
                }}
                onPointerMove={handlePointerMove}
                onPointerLeave={resetTilt}
            >
                <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        sizes={sizes}
                        className="object-cover grayscale transition-transform duration-300 group-hover:scale-[1.025] motion-reduce:transition-none"
                    />
                    <span
                        className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_35%,rgba(255,255,255,0.22)_50%,transparent_65%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:hidden"
                        aria-hidden="true"
                    />
                </div>
                <figcaption
                    className="flex items-center justify-between gap-4 border-t border-black bg-white px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500"
                    style={{ transform: 'translateZ(18px)' }}
                >
                    {caption}
                </figcaption>
            </figure>
        </div>
    )
}
