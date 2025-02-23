'use client'
import React, {useRef} from 'react'
import {motion, MotionValue, useTransform} from 'framer-motion'

interface IHeroProps {
    scale: MotionValue<number>
    x: MotionValue<number>
    y: MotionValue<number>
    opacity: MotionValue<number>
    progress: MotionValue<number>
}

const Hero: React.FC<IHeroProps> = ({scale, x, y, opacity, progress}) => {
    const cipoRef = useRef(null)
    const cLetterRef = useRef(null)

    // Animate "Francesco" and "lla" opacity based on scroll
    const nameOpacity = useTransform(
        progress,
        [0, 0.2, 0.6],  // Show during initial scroll, hide before zoom
        [0, 1, 0]
    )

    return (
        <div className="sentence-container relative">
            <motion.h1
                ref={cipoRef}
                style={{
                    scale,
                    x,
                    y,
                    opacity
                }}
                className="relative text-8xl sm:text-[10rem] md:text-[13rem] lg:text-[15rem] xl:text-[16.5rem] tracking-[-0.06em] text-nowrap font-black text-center leading-none z-10"
            >
                I&apos;m <span className="relative">
                    <motion.span
                        style={{opacity: nameOpacity}}
                        className="absolute -top-7 left-0 font-semibold text-3xl lg:text-6xl tracking-tighter"
                    >
                        Francesco
                    </motion.span>
                    <span ref={cLetterRef}>C</span>ipo
                </span>
                <motion.span
                    style={{opacity: nameOpacity}}
                    className="absolute -bottom-8 right-0 lg:bottom-0 lg:-right-20 font-semibold text-3xl lg:text-6xl tracking-tighter"
                >
                    lla
                </motion.span>
            </motion.h1>
        </div>
    )
}

export default Hero
