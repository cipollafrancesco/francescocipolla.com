'use client'
import React from 'react'
import StackedProjects from '@/components/StackedProjects'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { LocalizedProject } from '@/content/site'
import type { Locale } from '@/i18n/config'

interface IFreelanceProjectsProps {
    ref: React.RefObject<HTMLDivElement | null>
    title: string
    projects: LocalizedProject[]
    lang: Locale
    labels: {
        caseStudy: string
        liveSite: string
    }
}

const FreelanceProjects: React.FC<IFreelanceProjectsProps> = ({
    ref,
    title,
    projects,
    lang,
    labels,
}) => {
    // Main section scroll progress
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    })

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
    const y = useTransform(scrollYProgress, [0, 0.2], [100, 0])

    return (
        <motion.section
            ref={ref}
            id="projects"
            className="relative isolate mx-auto min-h-screen w-full max-w-[90vw] overflow-x-hidden py-20 xl:max-w-full"
            style={{ opacity, y }}
        >
            {/* Title container */}
            <motion.h2
                id="projects-title"
                className="mb-10 text-[70px] font-extrabold leading-[0.9] tracking-tighter md:absolute md:left-0 md:top-0 md:z-0 md:mb-0 md:whitespace-nowrap md:text-[150px] lg:text-[200px] xl:text-[300px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                    duration: 0.5,
                    ease: 'easeOut',
                }}
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
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                    duration: 0.8,
                    delay: 0.5,
                }}
            >
                <StackedProjects projects={projects} lang={lang} labels={labels} />
            </motion.div>
        </motion.section>
    )
}

export default FreelanceProjects
