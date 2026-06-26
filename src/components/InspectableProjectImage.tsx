'use client'

import Image from 'next/image'
import type { PointerEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

interface InspectableProjectImageProps {
    src: string
    alt: string
    sizes: string
}

export function InspectableProjectImage({ src, alt, sizes }: InspectableProjectImageProps) {
    const imageRef = useRef<HTMLImageElement>(null)
    const [canInspect, setCanInspect] = useState(false)

    useEffect(() => {
        const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
        const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

        const updateCapability = () => {
            setCanInspect(pointerQuery.matches && !reduceMotionQuery.matches)
        }

        updateCapability()
        pointerQuery.addEventListener('change', updateCapability)
        reduceMotionQuery.addEventListener('change', updateCapability)

        return () => {
            pointerQuery.removeEventListener('change', updateCapability)
            reduceMotionQuery.removeEventListener('change', updateCapability)
        }
    }, [])

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (!canInspect || !imageRef.current) {
            return
        }

        const rect = event.currentTarget.getBoundingClientRect()
        const relativeX = (event.clientX - rect.left) / rect.width - 0.5
        const relativeY = (event.clientY - rect.top) / rect.height - 0.5

        imageRef.current.style.setProperty('--inspect-x', `${relativeX * -10}px`)
        imageRef.current.style.setProperty('--inspect-y', `${relativeY * -8}px`)
        imageRef.current.style.setProperty('--inspect-scale', '1.025')
    }

    const handlePointerLeave = () => {
        if (!imageRef.current) {
            return
        }

        imageRef.current.style.setProperty('--inspect-x', '0px')
        imageRef.current.style.setProperty('--inspect-y', '0px')
        imageRef.current.style.setProperty('--inspect-scale', '1.001')
    }

    return (
        <div
            className="relative aspect-video overflow-hidden rounded-md border border-black/10 bg-white transition-colors duration-300 group-hover:border-black/25"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
        >
            <Image
                ref={imageRef}
                src={src}
                alt={alt}
                fill
                className="object-contain object-center transition-transform duration-500 ease-out motion-reduce:transition-none"
                style={{
                    transform:
                        'translate3d(var(--inspect-x, 0px), var(--inspect-y, 0px), 0) scale(var(--inspect-scale, 1.001))',
                }}
                sizes={sizes}
            />
        </div>
    )
}
