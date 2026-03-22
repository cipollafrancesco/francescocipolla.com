'use client'
import React, { useRef } from 'react'
import { motion, MotionValue, useTransform } from 'framer-motion'

interface IHeroProps {
    scale: MotionValue<number>
    x: MotionValue<number>
    y: MotionValue<number>
    opacity: MotionValue<number>
    progress: MotionValue<number>
}

const Hero: React.FC<IHeroProps> = ({ scale, x, y, opacity, progress }) => {
    const cipoRef = useRef(null)
    const cLetterRef = useRef(null)

    // Animate "Francesco" and "lla" opacity based on scroll
    const nameOpacity = useTransform(
        progress,
        [0, 0.2, 0.6], // Show during initial scroll, hide before zoom
        [0, 1, 1]
    )

    // Animate the paragraph opacity based on scroll
    const paragraphOpacity = useTransform(
        progress,
        [0.3, 0.6, 0.75], // Appear after "Francesco" and "lla", disappear before zoom
        [0, 1, 1]
    )

    return (
        <div className="sentence-container relative">
            <motion.h1
                ref={cipoRef}
                style={{
                    scale,
                    x,
                    y,
                    opacity,
                    willChange: 'transform',
                }}
                className="relative z-10 text-nowrap text-center text-8xl font-black leading-none tracking-[-0.06em] sm:text-[10rem] md:text-[13rem] lg:text-[15rem] xl:text-[16.5rem]"
            >
                I&apos;m{' '}
                <span className="relative">
                    <motion.span
                        style={{ opacity: nameOpacity }}
                        className="absolute -top-7 left-0 text-3xl font-semibold tracking-tighter md:text-5xl lg:text-6xl"
                    >
                        Francesco
                    </motion.span>
                    <span
                        ref={cLetterRef}
                        className="relative inline-block origin-center transform-gpu"
                    >
                        C
                    </span>
                    ipo
                </span>
                <motion.span
                    style={{ opacity: nameOpacity }}
                    className="absolute -bottom-8 right-0 text-3xl font-semibold tracking-tighter md:text-5xl lg:-right-20 lg:bottom-0 lg:text-6xl"
                >
                    lla
                </motion.span>
                <motion.p
                    id="hero-disclaimer"
                    style={{ opacity: paragraphOpacity }}
                    className="absolute mt-4 max-w-[80%] whitespace-normal text-left text-sm font-normal tracking-tighter md:p-4"
                >
                    And this landing page has been built in one day using Next, Tailwind, and Framer
                    Motion.
                </motion.p>
            </motion.h1>
        </div>
    )
}

export default Hero
