'use client'
import { MotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

interface HeroAnimations {
    springScale: MotionValue<number>
    springX: MotionValue<number>
    springY: MotionValue<number>
    textOpacity: MotionValue<number>
    contentOpacity: MotionValue<number>
    scrollIndicatorOpacity: MotionValue<number>
    heroVisibility: MotionValue<string>
    heroPointerEvents: MotionValue<string>
    smoothScrollProgress: MotionValue<number>
}

export const useHeroAnimations = (
    heroSectionRef: React.RefObject<HTMLElement | null>
): HeroAnimations => {
    const [isClient, setIsClient] = useState(false)
    const prefersReducedMotion = useReducedMotion()

    useEffect(() => {
        setIsClient(typeof window !== 'undefined')
    }, [])

    // Raw scroll progress — no spring wrapper so reverse scrolling is always accurate
    const { scrollYProgress: heroScrollProgress } = useScroll({
        target: heroSectionRef,
        offset: ['start start', 'end start'],
    })

    const springConfig = {
        stiffness: 120,
        damping: 30,
        mass: 0.6,
        restDelta: 0.0001,
    }

    // Derive transforms directly from raw scroll, then spring each one.
    // A single spring per value avoids the "spring of a spring" lag that
    // prevented full return to the initial position when scrolling back up.
    const scale = useTransform(
        heroScrollProgress,
        [0.6, 0.75],
        prefersReducedMotion ? [1, 1] : [1, 44]
    )

    const xPosition = useTransform(
        heroScrollProgress,
        [0.6, 0.75],
        prefersReducedMotion ? [0, 0] : [0, isClient && window.innerWidth < 768 ? -800 : -1800]
    )

    const yPosition = useTransform(
        heroScrollProgress,
        [0.6, 0.75],
        prefersReducedMotion ? [0, 0] : [0, isClient && window.innerWidth < 768 ? -200 : -500]
    )

    const springScale = useSpring(scale, springConfig)
    const springX = useSpring(xPosition, springConfig)
    const springY = useSpring(yPosition, springConfig)

    // All opacity / visibility values use the raw scroll value so they respond
    // immediately when the user scrolls back up — no spring lag.
    const textOpacity = useTransform(
        heroScrollProgress,
        [0.6, 0.75, 0.8],
        prefersReducedMotion ? [1, 1, 1] : [1, 1, 0]
    )

    const contentOpacity = useTransform(
        heroScrollProgress,
        [0.85, 0.95],
        prefersReducedMotion ? [1, 1] : [0, 1]
    )

    const scrollIndicatorOpacity = useTransform(
        heroScrollProgress,
        [0, 0.05, 0.7, 0.8],
        [1, 1, 1, 0]
    )

    // Use raw scroll for visibility so the hero re-appears the moment the user
    // scrolls back past the threshold — spring lag was causing it to stay hidden.
    const heroVisibility = useTransform(
        heroScrollProgress,
        [0, 0.8, 0.801],
        ['visible', 'visible', 'hidden']
    )

    const heroPointerEvents = useTransform(
        heroScrollProgress,
        [0, 0.8, 0.801],
        ['auto', 'auto', 'none']
    )

    return {
        springScale,
        springX,
        springY,
        textOpacity,
        contentOpacity,
        scrollIndicatorOpacity,
        heroVisibility,
        heroPointerEvents,
        // Expose raw progress for Hero sub-components (nameOpacity, paragraph)
        smoothScrollProgress: heroScrollProgress,
    }
}
