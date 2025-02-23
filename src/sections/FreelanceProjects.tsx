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
            className="min-h-screen py-20 w-full max-w-[90vw] xl:max-w-full mx-auto relative isolate"
            style={{ opacity, y }}
        >
            {/* Projects container - full width */}
            <motion.div 
                className="w-full relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ 
                    duration: 0.8,
                    delay: 0.5 // Delay the slider animation
                }}
            >
                <StackedProjects projects={projects}/>
            </motion.div>

            {/* Title container - positioned absolutely below the slider */}
            <motion.h2 
                id="projects-title"
                className="absolute text-[2.5rem] md:text-[150px] lg:text-[200px] xl:text-[300px] leading-[0.9] tracking-tighter font-black 
                    left-0 z-0 whitespace-nowrap md:whitespace-normal
                    top-[80%] md:top-[40%]"
                initial={{ opacity: 0, y: 100 }}
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
                <br className="hidden md:block" />
                projects
            </motion.h2>
        </motion.section>
    )
}

export default FreelanceProjects
