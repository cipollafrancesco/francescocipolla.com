'use client'
import { MotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { useMediaQuery } from '@/hooks/useMediaQuery'

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
    // Drives how far the hero flies off-screen. `useMediaQuery` is SSR-safe
    // (false until mounted) and, unlike the `isClient` + `window.innerWidth`
    // read this replaced, keeps tracking the breakpoint instead of freezing
    // whatever was true at mount.
    const isMobile = useMediaQuery('(max-width: 767px)')

    const { scrollYProgress: heroScrollProgress } = useScroll({
        target: heroSectionRef,
        offset: ['start start', 'end start'],
    })

    const smoothScrollProgress = useSpring(heroScrollProgress, {
        stiffness: 30,
        damping: 15,
        mass: 1.2,
        restDelta: 0.001,
    })

    const scale = useTransform(smoothScrollProgress, [0.6, 0.75], [1, 44])

    const xPosition = useTransform(smoothScrollProgress, [0.6, 0.75], [0, isMobile ? -800 : -1800])
    const yPosition = useTransform(smoothScrollProgress, [0.6, 0.75], [0, isMobile ? -200 : -500])

    const textOpacity = useTransform(smoothScrollProgress, [0.6, 0.75, 0.8], [1, 1, 0])

    const springConfig = {
        stiffness: 80,
        damping: 25,
        mass: 0.8,
        restDelta: 0.001,
    }

    const springScale = useSpring(scale, springConfig)
    const springX = useSpring(xPosition, springConfig)
    const springY = useSpring(yPosition, springConfig)

    const contentOpacity = useTransform(smoothScrollProgress, [0.85, 0.95], [0, 1])

    const scrollIndicatorOpacity = useTransform(
        smoothScrollProgress,
        [0, 0.1, 0.95, 1],
        [1, 1, 1, 0]
    )

    const heroVisibility = useTransform(
        smoothScrollProgress,
        [0, 0.8, 0.801],
        ['visible', 'visible', 'hidden']
    )

    const heroPointerEvents = useTransform(
        smoothScrollProgress,
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
        smoothScrollProgress,
    }
}
