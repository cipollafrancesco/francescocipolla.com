'use client'
import StackedProjects from '@/components/StackedProjects'
import type { LocalizedProject } from '@/content/site'
import type { Locale } from '@/i18n/config'
import { motion, useReducedMotion } from 'framer-motion'
import React from 'react'
import { revealProps, useSectionScrollFade } from '@/lib/motion'

interface IFreelanceProjectsProps {
    title: string
    projects: LocalizedProject[]
    lang: Locale
    labels: {
        caseStudy: string
        previous: string
        next: string
    }
}

const FreelanceProjects: React.FC<IFreelanceProjectsProps> = ({
    title,
    projects,
    lang,
    labels,
}) => {
    const { ref, style } = useSectionScrollFade<HTMLElement>()
    const reduced = useReducedMotion()

    return (
        <motion.section
            ref={ref}
            id="projects"
            className="relative isolate mx-auto min-h-screen w-full max-w-[90vw] overflow-x-hidden py-20 xl:max-w-full"
            style={style}
        >
            {/* Title container */}
            <motion.h2
                className="mb-10 text-[70px] font-extrabold leading-[0.9] tracking-tighter md:absolute md:left-0 md:top-0 md:z-0 md:mb-0 md:whitespace-nowrap md:text-[150px] lg:text-[200px] xl:text-[300px]"
                {...revealProps(reduced, { y: 20 })}
            >
                {title.split(' ').map((word) => (
                    <React.Fragment key={word}>
                        {word}
                        <br />
                    </React.Fragment>
                ))}
            </motion.h2>

            {/* Projects container */}
            <motion.div
                className="relative z-10 w-full md:mt-[9.5rem] xl:mt-14"
                {...revealProps(reduced, { y: 0, duration: 0.8, delay: 0.5 })}
            >
                <StackedProjects projects={projects} lang={lang} labels={labels} />
            </motion.div>
        </motion.section>
    )
}

export default FreelanceProjects
