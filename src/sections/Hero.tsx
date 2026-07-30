'use client'
import React from 'react'
import { motion, MotionValue, useTransform } from 'framer-motion'

interface IHeroProps {
    scale: MotionValue<number>
    x: MotionValue<number>
    y: MotionValue<number>
    opacity: MotionValue<number>
    progress: MotionValue<number>
    disclaimer: string
}

const Hero: React.FC<IHeroProps> = ({ scale, x, y, opacity, progress, disclaimer }) => {
    const nameOpacity = useTransform(progress, [0, 0.2, 0.6], [0, 1, 1])

    const paragraphOpacity = useTransform(progress, [0.3, 0.6, 0.75], [0, 1, 1])

    return (
        <div className="sentence-container relative">
            <motion.h1
                style={{
                    scale,
                    x,
                    y,
                    opacity,
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
                    <span className="relative inline-block origin-center transform-gpu">C</span>
                    ipo
                </span>
                <motion.span
                    style={{ opacity: nameOpacity }}
                    className="absolute -bottom-8 right-0 text-3xl font-semibold tracking-tighter md:text-5xl lg:-right-20 lg:bottom-0 lg:text-6xl"
                >
                    lla
                </motion.span>
                {disclaimer && (
                    <motion.p
                        style={{ opacity: paragraphOpacity }}
                        className="absolute mt-4 max-w-[80%] whitespace-normal text-left text-sm font-normal tracking-tighter md:p-4"
                    >
                        {disclaimer}
                    </motion.p>
                )}
            </motion.h1>
        </div>
    )
}

export default Hero
