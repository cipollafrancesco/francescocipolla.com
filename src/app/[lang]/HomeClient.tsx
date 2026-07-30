'use client'

import React, { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Contacts from '@/sections/Contacts'
import FreelanceProjects from '@/sections/FreelanceProjects'
import Experiences from '@/sections/Experiences'
import Image from 'next/image'
import Hero from '@/sections/Hero'
import { useHeroAnimations } from '@/hooks/useHeroAnimations'
import type { Locale } from '@/i18n/config'
import type { SiteContent } from '@/content/site'
import { motionPresets } from '@/lib/motion'

export default function HomeClient({ lang, content }: { lang: Locale; content: SiteContent }) {
    const mainContainerRef = useRef<HTMLDivElement>(null)
    const heroSectionRef = useRef<HTMLElement>(null)
    const descriptionsSectionRef = useRef<HTMLElement>(null)
    const descriptionsRef = useRef<(HTMLParagraphElement | null)[]>([])
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
        smoothScrollProgress,
    } = useHeroAnimations(heroSectionRef)

    const { initFade, initFadeUp, dur } = motionPresets(prefersReducedMotion)

    return (
        <div ref={mainContainerRef} id="main-content" className="min-h-[300vh] bg-white text-black">
            <main className="relative mb-16 lg:mb-32">
                <motion.div
                    style={{ opacity: scrollIndicatorOpacity }}
                    className="fixed bottom-5 right-4 z-20 xl:bottom-auto xl:top-1/2"
                >
                    <Image
                        src="/scrolldown.svg"
                        alt={content.home.scrollDownAlt}
                        width={24}
                        height={133}
                    />
                </motion.div>

                <motion.section
                    id="hero"
                    ref={heroSectionRef}
                    className="fixed inset-0 flex h-screen w-full items-center justify-center overflow-hidden"
                    style={{
                        visibility: heroVisibility,
                        pointerEvents: heroPointerEvents,
                    }}
                >
                    <Hero
                        scale={springScale}
                        x={springX}
                        y={springY}
                        opacity={textOpacity}
                        progress={smoothScrollProgress}
                        disclaimer={content.home.heroDisclaimer}
                    />
                </motion.section>

                <motion.section
                    id="about-me"
                    ref={descriptionsSectionRef}
                    style={{ opacity: contentOpacity }}
                    className="mt-[150vh] px-4 md:px-8"
                >
                    <div className="mx-auto max-w-[90vw]">
                        <div className="mb-32">
                            {content.home.descriptions.map((segments, index) => (
                                <motion.p
                                    key={index}
                                    ref={(el) => {
                                        if (descriptionsRef.current) {
                                            descriptionsRef.current[index] = el
                                        }
                                    }}
                                    initial={initFadeUp}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-100px' }}
                                    transition={dur(0.8, index * 0.2)}
                                    className="text-[36px] font-semibold leading-[1.2] tracking-tighter sm:text-[50px] md:text-[70px] lg:text-[100px] xl:text-[120px]"
                                >
                                    {segments.map((seg, i) =>
                                        seg.color ? (
                                            <span key={i} style={{ color: seg.color }}>
                                                {seg.text}
                                            </span>
                                        ) : (
                                            seg.text
                                        )
                                    )}
                                </motion.p>
                            ))}
                        </div>
                    </div>

                    <div className="h-[20vh]" />

                    <motion.div
                        initial={initFade}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '-20%' }}
                        transition={dur(0.8)}
                    >
                        <Experiences
                            ref={experienceRef}
                            title={content.home.experiencesTitle}
                            qualifier={content.home.experiencesQualifier}
                            experiences={content.experiences}
                        />
                    </motion.div>

                    <div className="h-[10vh] lg:h-[20vh]" />

                    <motion.div
                        initial={initFade}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={dur(0.8)}
                    >
                        <FreelanceProjects
                            ref={freelanceProjectsRef}
                            title={content.home.projectsTitle}
                            projects={content.projects}
                            lang={lang}
                            labels={{
                                caseStudy: content.common.cta.caseStudy,
                                liveSite: content.common.cta.liveSite,
                                previous: content.common.cta.previousProject,
                                next: content.common.cta.nextProject,
                            }}
                        />
                    </motion.div>

                    <div className="hidden h-[10vh] md:block lg:h-[40vh]" />

                    <motion.div
                        initial={initFade}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={dur(0.8)}
                    >
                        <Contacts
                            ref={contactsRef}
                            title={content.home.contactsTitle}
                            scheduleTitle={content.home.scheduleTitle}
                        />
                    </motion.div>
                </motion.section>
            </main>
        </div>
    )
}
