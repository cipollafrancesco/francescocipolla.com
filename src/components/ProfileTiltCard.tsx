'use client'

import Image from 'next/image'
import { useCallback, useState, type PointerEvent, type ReactNode } from 'react'

type ProfileTiltCardProps = {
    src: string
    alt: string
    sizes: string
    caption: ReactNode
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

export function ProfileTiltCard({ src, alt, sizes, caption }: ProfileTiltCardProps) {
    const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })

    const handlePointerMove = useCallback((event: PointerEvent<HTMLElement>) => {
        if (event.pointerType === 'touch') {
            return
        }

        const rect = event.currentTarget.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width - 0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5

        setTilt({
            rotateX: clamp(y * -7, -5, 5),
            rotateY: clamp(x * 8, -6, 6),
        })
    }, [])

    return (
        <div className="[perspective:900px] motion-reduce:[perspective:none]">
            <figure
                className="group relative overflow-hidden border border-black bg-neutral-100 transition-transform duration-200 ease-out will-change-transform motion-reduce:transition-none"
                style={{
                    transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                    transformStyle: 'preserve-3d',
                }}
                onPointerMove={handlePointerMove}
                onPointerLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
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
