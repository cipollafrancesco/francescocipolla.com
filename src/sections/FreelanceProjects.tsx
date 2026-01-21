'use client'
import React from 'react'
import StackedProjects from '@/components/StackedProjects'
import {motion, useScroll, useTransform} from 'framer-motion'
import {useTranslations} from 'next-intl'

interface IFreelanceProjectsProps {
    ref: React.RefObject<HTMLDivElement | null>
}

const FreelanceProjects: React.FC<IFreelanceProjectsProps> = ({ref}) => {
    const t = useTranslations('about.projects')
    // Main section scroll progress
    const {scrollYProgress} = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    })

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
    const y = useTransform(scrollYProgress, [0, 0.2], [100, 0])

    return (
        <motion.section
            ref={ref}
            id="projects"
            className="min-h-screen py-20 w-full max-w-[90vw] xl:max-w-full mx-auto relative isolate overflow-x-hidden"
            style={{opacity, y}}
        >
            {/* Title container */}
            <motion.h2
                id="projects-title"
                className="text-[70px] md:text-[150px] lg:text-[200px] xl:text-[300px] leading-[0.9] tracking-tighter font-extrabold
                    mb-10 md:mb-0 md:absolute md:left-0 md:z-0 md:whitespace-nowrap md:top-0"
                initial={{opacity: 0, y: 20}}
                whileInView={{
                    opacity: 1,
                    y: 0
                }}
                viewport={{once: true}}
                transition={{
                    duration: 0.5,
                    ease: 'easeOut'
                }}
            >
                {t('title').split(' ').map((word, i) => (
                    <React.Fragment key={i}>
                        {word}
                        {i === 0 && <br/>}
                    </React.Fragment>
                ))}
            </motion.h2>

            {/* Projects container */}
            <motion.div
                className="w-full relative z-10 md:mt-[9.5rem] xl:mt-14"
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                viewport={{once: true}}
                transition={{
                    duration: 0.8,
                    delay: 0.5
                }}
            >
                <StackedProjects/>
            </motion.div>
        </motion.section>
    )
}

export default FreelanceProjects
