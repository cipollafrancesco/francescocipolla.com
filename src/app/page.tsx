'use client'
import React, {useRef} from 'react'
import {motion, useReducedMotion} from 'framer-motion'
import {descriptions} from '@/app/constants'
import Contacts from '@/sections/Contacts'
import FreelanceProjects from '@/sections/FreelanceProjects'
import Experiences from '@/sections/Experiences'
import Image from 'next/image'
import Hero from '@/sections/Hero'
import {useHeroAnimations} from '@/hooks/useHeroAnimations'

export default function Portfolio() {
    const heroSectionRef = useRef<HTMLElement>(null)
    const experienceRef = useRef<HTMLDivElement>(null)
    const freelanceProjectsRef = useRef<HTMLDivElement>(null)
    const contactsRef = useRef<HTMLDivElement>(null)

    const prefersReducedMotion = useReducedMotion()

    const {
        springScale,
        springX,
        springY,
        textOpacity,
        contentOpacity,
        scrollIndicatorOpacity,
        heroVisibility,
        heroPointerEvents,
        smoothScrollProgress
    } = useHeroAnimations(heroSectionRef)

    const initFade = prefersReducedMotion ? false : {opacity: 0}
    const initFadeUp = prefersReducedMotion ? false : {opacity: 0, y: 50}
    const dur = (d: number, delay = 0) => ({
        duration: prefersReducedMotion ? 0 : d,
        delay: prefersReducedMotion ? 0 : delay,
    })

    return (
        <div className="min-h-[300vh] bg-white text-black">
            <main className="relative mb-16 lg:mb-32">
                <motion.div
                    style={{opacity: scrollIndicatorOpacity}}
                    className="fixed right-4 bottom-5 xl:bottom-auto xl:top-1/2 z-20"
                >
                    <Image src="/scrolldown.svg" alt='Scroll Down' width={24} height={133}/>
                </motion.div>

                <motion.section
                    id="hero"
                    ref={heroSectionRef}
                    className="fixed inset-0 h-screen w-full flex items-center justify-center overflow-hidden"
                    style={{
                        visibility: heroVisibility,
                        pointerEvents: heroPointerEvents
                    }}
                >
                    <Hero
                        scale={springScale}
                        x={springX}
                        y={springY}
                        opacity={textOpacity}
                        progress={smoothScrollProgress}
                    />
                </motion.section>

                <motion.section
                    id="about-me"
                    style={{opacity: contentOpacity}}
                    className="px-4 md:px-8 mt-[150vh]"
                >
                    <div className="max-w-[90vw] mx-auto">
                        <div className="mb-32">
                            {descriptions.map((segments, index) => (
                                <motion.p
                                    key={index}
                                    initial={initFadeUp}
                                    whileInView={{opacity: 1, y: 0}}
                                    viewport={{once: true, margin: '-100px'}}
                                    transition={dur(0.8, index * 0.2)}
                                    className="text-[36px] sm:text-[50px] md:text-[70px] lg:text-[100px] xl:text-[120px] leading-[1.2] tracking-tighter font-semibold"
                                >
                                    {segments.map((seg, i) =>
                                        seg.color
                                            ? <span key={i} style={{color: seg.color}}>{seg.text}</span>
                                            : seg.text
                                    )}
                                </motion.p>
                            ))}
                        </div>
                    </div>

                    {/* SPACER */}
                    <div className="h-[20vh]"/>

                    <motion.div
                        initial={initFade}
                        whileInView={{opacity: 1}}
                        viewport={{once: true, margin: '-20%'}}
                        transition={dur(0.8)}
                    >
                        <Experiences ref={experienceRef}/>
                    </motion.div>

                    {/* SPACER */}
                    <div className="h-[10vh] lg:h-[20vh]"/>

                    <motion.div
                        initial={initFade}
                        whileInView={{opacity: 1}}
                        viewport={{once: true}}
                        transition={dur(0.8)}
                    >
                        <FreelanceProjects ref={freelanceProjectsRef}/>
                    </motion.div>

                    {/* SPACER */}
                    <div className="hidden md:block h-[10vh] lg:h-[40vh]"/>

                    <motion.div
                        initial={initFade}
                        whileInView={{opacity: 1}}
                        viewport={{once: true}}
                        transition={dur(0.8)}
                    >
                        <Contacts ref={contactsRef}/>
                    </motion.div>
                </motion.section>
            </main>
        </div>
    )
}
