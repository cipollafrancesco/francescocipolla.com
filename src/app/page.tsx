'use client'
import React, {useRef} from 'react'
import {motion, useScroll, useSpring, useTransform} from 'framer-motion'
import LandingHeroHandwriting from '@/components/LandingHeroHandwriting'
import {descriptions} from '@/app/constants'
import Contacts from '@/sections/Contacts'
import FreelanceProjects from '@/sections/FreelanceProjects'
import Experiences from '@/sections/Experiences'
import Image from 'next/image'

export default function Portfolio() {
    const mainContainerRef = useRef<HTMLDivElement>(null)
    const handwritingRef = useRef<HTMLDivElement>(null)
    const cipoRef = useRef<HTMLHeadingElement>(null)
    const cLetterRef = useRef<HTMLSpanElement>(null)
    const heroSectionRef = useRef<HTMLElement>(null)
    const descriptionsSectionRef = useRef<HTMLElement>(null)
    const descriptionsRef = useRef<(HTMLParagraphElement | null)[]>([])
    const experienceRef = useRef<HTMLDivElement>(null)
    const freelanceProjectsRef = useRef<HTMLDivElement>(null)
    const contactsRef = useRef<HTMLDivElement>(null)

    // Main scroll progress for the entire page
    const {scrollYProgress} = useScroll({
        target: mainContainerRef,
        offset: ['start start', 'end end']
    })

    // Hero section specific scroll progress
    const {scrollYProgress: heroScrollProgress} = useScroll({
        target: heroSectionRef,
        offset: ['start start', 'end start']
    })

    // Add spring animation to the scroll progress for smooth control
    const smoothScrollProgress = useSpring(heroScrollProgress, {
        stiffness: 30,    // Lower stiffness for smoother movement
        damping: 15,      // Lower damping for more fluid motion
        mass: 1.2,        // Slightly more mass for more controlled inertia
        restDelta: 0.001  // Precision of final resting position
    })

    // Animation sequence timing:
    // 0-0.3: SVG path drawing
    // 0.3-0.45: Hold completed drawing
    // 0.45-0.6: Fade out handwriting
    // 0.6-0.8: Zoom in to "C"
    // 0.8-0.9: Fade out text

    // Handwriting animation timing
    const handwritingOpacityValue = useTransform(smoothScrollProgress,
        [0, 0.3, 0.45, 0.6],
        [1, 1, 1, 0]
    )

    // Spring config for individual animations
    const springConfig = {
        stiffness: 80,
        damping: 25,
        mass: 0.8,
        restDelta: 0.001
    }

    // Apply spring animation to handwriting opacity
    const handwritingOpacity = useSpring(handwritingOpacityValue, springConfig)

    // Text scale and position animation (delayed start)
    const scale = useTransform(smoothScrollProgress,
        [0.6, 0.75],
        [1, 44]
    )
    const xPosition = useTransform(smoothScrollProgress,
        [0.6, 0.75],
        [0, -1800]
    )
    const yPosition = useTransform(smoothScrollProgress,
        [0.6, 0.75],
        [0, -500]
    )
    const textOpacity = useTransform(smoothScrollProgress,
        [0.6, 0.75, 0.8],
        [1, 1, 0]
    )

    const springScale = useSpring(scale, springConfig)
    const springX = useSpring(xPosition, springConfig)
    const springY = useSpring(yPosition, springConfig)

    // Content fade in (delayed until after zoom)
    const contentOpacity = useTransform(smoothScrollProgress,
        [0.85, 0.95],
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
        ['visible', 'visible', 'hidden']
    )

    const heroPointerEvents = useTransform(
        smoothScrollProgress,
        [0, 0.8, 0.801],
        ['auto', 'auto', 'none']
    )

    return (
        <>
            <div ref={mainContainerRef} className="min-h-[300vh] bg-white text-black">
                <main className="relative">
                    {/* SCROLL DOWN LABEL */}
                    <motion.div
                        style={{opacity: scrollIndicatorOpacity}}
                        className="fixed right-4 top-1/2 z-20"
                    >
                        <Image src="/scrolldown.svg" alt='Scroll Down' fill/>
                    </motion.div>

                    <motion.section
                        ref={heroSectionRef}
                        className="h-screen w-full flex items-center justify-center overflow-hidden"
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            visibility: heroVisibility,
                            pointerEvents: heroPointerEvents
                        }}
                    >
                        <motion.h1
                            ref={cipoRef}
                            style={{
                                scale: springScale,
                                x: springX,
                                y: springY,
                                opacity: textOpacity
                            }}
                            className="text-6xl md:text-8xl lg:text-9xl xl:text-[16.5rem] tracking-[-0.06em] text-nowrap font-black text-center leading-none relative z-10"
                        >
                            I&apos;m <span className="relative">
                                <span ref={cLetterRef}>C</span>ipo
                            </span>
                        </motion.h1>
                        <motion.div
                            ref={handwritingRef}
                            id="handwriting-container"
                            style={{opacity: handwritingOpacity}}
                            className="fixed top-0 w-full h-full z-20"
                        >
                            <LandingHeroHandwriting scrollYProgress={smoothScrollProgress}/>
                        </motion.div>
                    </motion.section>

                    <motion.section
                        ref={descriptionsSectionRef}
                        style={{opacity: contentOpacity}}
                        className="px-4 md:px-8 mt-[150vh]"
                    >
                        <div className="max-w-[90vw] mx-auto">
                            <div className="mb-32">
                                {descriptions.map((text, index) => (
                                    <motion.p
                                        key={index}
                                        ref={el => {
                                            if (descriptionsRef.current) {
                                                descriptionsRef.current[index] = el
                                            }
                                        }}
                                        initial={{opacity: 0, y: 50}}
                                        whileInView={{opacity: 1, y: 0}}
                                        viewport={{once: true, margin: '-100px'}}
                                        transition={{duration: 0.8, delay: index * 0.2}}
                                        className="text-[32px] sm:text-[50px] md:text-[70px] lg:text-[100px] xl:text-[120px] leading-[1.2] tracking-tighter font-semibold"
                                        dangerouslySetInnerHTML={{__html: text}}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* SPACER */}
                        <div className="h-[20vh]"/>

                        <motion.div
                            initial={{opacity: 0}}
                            whileInView={{opacity: 1}}
                            viewport={{once: true, margin: '-20%'}}
                            transition={{duration: 0.8}}
                        >
                            <Experiences ref={experienceRef}/>
                        </motion.div>

                        {/* SPACER */}
                        <div className="h-[10vh] lg:h-[20vh]"/>

                        <motion.div
                            initial={{opacity: 0}}
                            whileInView={{opacity: 1}}
                            viewport={{once: true}}
                            transition={{duration: 0.8}}
                        >
                            <FreelanceProjects ref={freelanceProjectsRef}/>
                        </motion.div>

                        {/* SPACER */}
                        <div className="hidden md:block h-[10vh] lg:h-[50vh]"/>

                        <motion.div
                            initial={{opacity: 0}}
                            whileInView={{opacity: 1}}
                            viewport={{once: true}}
                            transition={{duration: 0.8}}
                        >
                            <Contacts ref={contactsRef}/>
                        </motion.div>
                    </motion.section>
                </main>
            </div>
        </>
    )
}
