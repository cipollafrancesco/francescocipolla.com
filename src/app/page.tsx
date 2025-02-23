'use client'
import React, {useRef} from 'react'
import {motion, useScroll, useTransform, useSpring} from 'framer-motion'
import LandingHeroHandwriting from '@/components/LandingHeroHandwriting'
import {descriptions} from '@/app/constants'
import Contacts from '@/sections/Contacts'
import FreelanceProjects from '@/sections/FreelanceProjects'
import Experiences from '@/sections/Experiences'

export default function Portfolio() {
    const handwritingRef = useRef<HTMLDivElement>(null)
    const cipoRef = useRef<HTMLHeadingElement>(null)
    const cLetterRef = useRef<HTMLSpanElement>(null)
    const heroSectionRef = useRef<HTMLElement>(null)
    const descriptionsSectionRef = useRef<HTMLElement>(null)
    const descriptionsRef = useRef<(HTMLParagraphElement | null)[]>([])
    const experienceRef = useRef<HTMLDivElement>(null)
    const freelanceProjectsRef = useRef<HTMLDivElement>(null)
    const contactsRef = useRef<HTMLDivElement>(null)

    const {scrollYProgress} = useScroll({
        target: heroSectionRef,
        offset: ["start start", "end start"]
    })

    // Add spring animation to the scroll progress itself to control velocity
    const smoothScrollProgress = useSpring(scrollYProgress, {
        stiffness: 30,    // Even lower stiffness for smoother movement
        damping: 15,      // Lower damping for more fluid motion
        mass: 1,          // More mass for more inertia
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
        stiffness: 80,    // Slightly lower stiffness for smoother transitions
        damping: 25,      // Adjusted damping for better control
        mass: 0.8,        // Added mass for more natural feel
        restDelta: 0.001
    }

    // Apply spring animation to handwriting opacity
    const handwritingOpacity = useSpring(handwritingOpacityValue, springConfig)
    
    // Text scale and position animation (delayed start)
    const scale = useTransform(smoothScrollProgress, 
        [0.6, 0.8], 
        [1, 44]
    )
    const xPosition = useTransform(smoothScrollProgress, 
        [0.6, 0.8], 
        [0, -1800]
    )
    const yPosition = useTransform(smoothScrollProgress, 
        [0.6, 0.8], 
        [0, -500]
    )
    const textOpacity = useTransform(smoothScrollProgress, 
        [0.6, 0.8, 0.9], 
        [1, 1, 0]
    )
    
    const springScale = useSpring(scale, springConfig)
    const springX = useSpring(xPosition, springConfig)
    const springY = useSpring(yPosition, springConfig)

    // Content fade in (delayed until after zoom)
    const contentOpacity = useTransform(smoothScrollProgress, 
        [0.8, 0.9], 
        [0, 1]
    )

    return (
        <>
            <div className="min-h-[300vh] bg-white text-black">
                <main className="relative">
                    {/* SCROLL DOWN LABEL */}
                    <div className="fixed right-4 top-1/2 z-20">
                        <svg width="24" height="133" viewBox="0 0 24 133" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_46_52)">
                                <path
                                    d="M13.4659 9.26136L13.0398 7.75568C13.2907 7.66098 13.5346 7.52131 13.7713 7.33665C14.0128 7.15672 14.2116 6.91051 14.3679 6.59801C14.5241 6.28551 14.6023 5.88542 14.6023 5.39773C14.6023 4.73011 14.4484 4.17377 14.1406 3.72869C13.8376 3.28835 13.4517 3.06818 12.983 3.06818C12.5663 3.06818 12.2372 3.2197 11.9957 3.52273C11.7543 3.82576 11.553 4.29924 11.392 4.94318L10.9943 6.5625C10.7576 7.53788 10.3954 8.26468 9.90767 8.7429C9.42472 9.22112 8.80208 9.46023 8.03977 9.46023C7.41477 9.46023 6.85606 9.2803 6.36364 8.92045C5.87121 8.56534 5.48295 8.06818 5.19886 7.42898C4.91477 6.78977 4.77273 6.0464 4.77273 5.19886C4.77273 4.08617 5.0142 3.16525 5.49716 2.43608C5.98011 1.70691 6.68561 1.24526 7.61364 1.05114L8.01136 2.64204C7.42424 2.79356 6.9839 3.08002 6.69034 3.50142C6.39678 3.92756 6.25 4.4839 6.25 5.17045C6.25 5.9517 6.41572 6.57197 6.74716 7.03125C7.08333 7.49526 7.4858 7.72727 7.95455 7.72727C8.33333 7.72727 8.65057 7.5947 8.90625 7.32954C9.16667 7.06439 9.3608 6.6572 9.48864 6.10795L9.91477 4.28977C10.1515 3.29072 10.5185 2.55682 11.0156 2.08807C11.5175 1.62405 12.1449 1.39204 12.8977 1.39204C13.5133 1.39205 14.0578 1.56487 14.5312 1.91051C15.0047 2.26089 15.3764 2.73674 15.6463 3.33807C15.9162 3.94413 16.0511 4.63068 16.0511 5.39773C16.0511 6.47727 15.8144 7.32481 15.3409 7.94034C14.8674 8.56061 14.2424 9.00095 13.4659 9.26136Z"
                                    fill="black"/>
                                <path
                                    d="M10.6569 132.707C11.0474 133.098 11.6806 133.098 12.0711 132.707L18.4351 126.343C18.8256 125.953 18.8256 125.319 18.4351 124.929C18.0445 124.538 17.4114 124.538 17.0209 124.929L11.364 130.586L5.70711 124.929C5.31658 124.538 4.68342 124.538 4.29289 124.929C3.90237 125.319 3.90237 125.953 4.29289 126.343L10.6569 132.707ZM10.364 100V132H12.364V100H10.364Z"
                                    fill="black"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_46_52">
                                    <rect width="24" height="133" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>

                    <motion.section 
                        ref={heroSectionRef}
                        className="h-screen w-full flex items-center justify-center overflow-hidden"
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0
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
                            style={{ opacity: handwritingOpacity }}
                            className="fixed top-0 w-full h-full z-20"
                        >
                            <LandingHeroHandwriting scrollYProgress={smoothScrollProgress} />
                        </motion.div>
                    </motion.section>

                    <motion.section 
                        ref={descriptionsSectionRef} 
                        style={{ opacity: contentOpacity }}
                        className="px-8 mt-[100vh]"
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
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.8, delay: index * 0.2 }}
                                        className="text-[2.5rem] md:text-6xl lg:text-7xl xl:text-8xl leading-[1.2] tracking-tighter font-semibold"
                                        dangerouslySetInnerHTML={{__html: text}}
                                    />
                                ))}
                            </div>
                        </div>
                        
                        {/* SPACER */}
                        <div className="h-[50vh]"/>
                        
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-20%" }}
                            transition={{ duration: 0.8 }}
                        >
                            <Experiences ref={experienceRef}/>
                        </motion.div>

                        {/* SPACER */}
                        <div className="h-[50vh]"/>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <FreelanceProjects ref={freelanceProjectsRef}/>
                        </motion.div>

{/* SPACER */}
<div className="h-[50vh]"/>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <Contacts ref={contactsRef}/>
                        </motion.div>
                    </motion.section>
                </main>
            </div>
        </>
    )
}
