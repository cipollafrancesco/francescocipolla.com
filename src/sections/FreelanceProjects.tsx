'use client'
import React from 'react'
import StackedProjects from '@/components/stacked-projects'
import {projects} from '@/app/constants'
import {motion, useScroll, useTransform} from 'framer-motion'

interface IFreelanceProjectsProps {
    ref: React.RefObject<HTMLDivElement | null>
}

const FreelanceProjects: React.FC<IFreelanceProjectsProps> = ({ref}) => {
    // Main section scroll progress
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
    const y = useTransform(scrollYProgress, [0, 0.2], [100, 0])

    return (
        <motion.section
            ref={ref}
            id="projects"
            className="min-h-screen py-20 w-full max-w-[90vw] xl:max-w-full mx-auto relative isolate overflow-x-hidden"
            style={{ opacity, y }}
        >
            {/* Title container */}
            <motion.h2
                id="projects-title"
                className="text-[70px] md:text-[150px] lg:text-[200px] xl:text-[300px] leading-[0.9] tracking-tighter font-extrabold
                    mb-10 md:mb-0 md:absolute md:left-0 md:z-0 md:whitespace-nowrap md:top-[40%] lg:top-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                    opacity: 1,
                    y: 0
                }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{
                    duration: 0.5,
                    ease: "easeOut"
                }}
            >
                freelance
                <br />
                projects
            </motion.h2>

            {/* Projects container */}
            <motion.div
                className="w-full relative md:z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{
                    duration: 0.8,
                    delay: 0.5
                }}
            >
                <StackedProjects projects={projects}/>
            </motion.div>
        </motion.section>
    )
}

export default FreelanceProjects
