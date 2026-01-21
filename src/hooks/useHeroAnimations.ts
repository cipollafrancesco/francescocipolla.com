'use client'
import {MotionValue, useScroll, useSpring, useTransform, useReducedMotion} from 'framer-motion'
import {useEffect, useState} from 'react'

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

export const useHeroAnimations = (heroSectionRef: React.RefObject<HTMLElement | null>): HeroAnimations => {
    const [isClient, setIsClient] = useState(false)
    const shouldReduceMotion = useReducedMotion()

    useEffect(() => {
        setIsClient(typeof window !== 'undefined')
    }, [])

    // Hero section specific scroll progress
    const {scrollYProgress: heroScrollProgress} = useScroll({
        target: heroSectionRef,
        offset: ['start start', 'end start']
    })

    // Add spring animation to the scroll progress for smooth control
    const smoothScrollProgress = useSpring(heroScrollProgress, {
        stiffness: shouldReduceMotion ? 100 : 30,    
        damping: shouldReduceMotion ? 20 : 15,      
        mass: shouldReduceMotion ? 0.5 : 1.2,        
        restDelta: 0.001
    })

    // Text scale and position animation (delayed start)
    const scale = useTransform(smoothScrollProgress,
        [0.6, 0.75],
        [1, shouldReduceMotion ? 1.5 : 44] // Soften zoom if reduced motion
    )

    // Responsive position adjustments for centering on "C"
    const xPosition = useTransform(smoothScrollProgress,
        [0.6, 0.75],
        [0, shouldReduceMotion ? 0 : (isClient && window.innerWidth < 768 ? -800 : -1800)]
    )
    const yPosition = useTransform(smoothScrollProgress,
        [0.6, 0.75],
        [0, shouldReduceMotion ? 0 : (isClient && window.innerWidth < 768 ? -200 : -500)]
    )

    const textOpacity = useTransform(smoothScrollProgress,
        [0.6, 0.75, 0.8],
        [1, 1, 0]
    )

    const springConfig = {
        stiffness: 80,
        damping: 25,
        mass: 0.8,
        restDelta: 0.001
    }

    const springScale = useSpring(scale, springConfig)
    const springX = useSpring(xPosition, springConfig)
    const springY = useSpring(yPosition, springConfig)

    // Content fade in (delayed until after zoom)
    const contentOpacity = useTransform(smoothScrollProgress,
        [shouldReduceMotion ? 0.2 : 0.85, 0.95],
        [0, 1]
    )

    // Scroll indicator opacity
    const scrollIndicatorOpacity = useTransform(
        smoothScrollProgress,
        [0, 0.1, 0.95, 1],
        [1, 1, 1, 0]
    )

    // Hero section visibility
    const heroVisibility = useTransform(
        smoothScrollProgress,
        [0, 0.8, 0.801],
        ['visible', 'visible', shouldReduceMotion ? 'visible' : 'hidden']
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
        smoothScrollProgress
    }
}
