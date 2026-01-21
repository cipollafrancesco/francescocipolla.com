'use client'
import React from 'react'
import { experiences as experiencesData } from '@/app/[locale]/constants'
import ExperienceCard from '@/components/ExperienceCard'
import { motion, useScroll, useTransform } from 'framer-motion'
import {useTranslations} from 'next-intl'

interface IExperiencesProps {
    ref: React.RefObject<HTMLDivElement | null>
}

const Experiences: React.FC<IExperiencesProps> = props => {
    const t = useTranslations('about.experiences')
    const { scrollYProgress } = useScroll({
        target: props.ref,
        offset: ["start end", "end start"]
    })

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
    const y = useTransform(scrollYProgress, [0, 0.2], [100, 0])

    const experiences = experiencesData.map(exp => {
        const key = exp.company.toLowerCase().split(' ')[0]
        return {
            ...exp,
            position: t(`${key}.position`),
            period: t(`${key}.period`),
            description: t(`${key}.description`)
        }
    })

    return (
        <motion.section
            id="experiences"
            className="py-20"
            ref={props.ref}
            style={{ opacity, y }}
        >
            <div className="flex flex-col items-center justify-center">
                {/* Mobile title */}
                <motion.h2
                    className="text-[60px] leading-[0.9] tracking-tighter font-extrabold mb-10 md:hidden"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    {t('title')}
                </motion.h2>

                {/* Mobile: Column layout for experiences */}
                <div className="flex flex-col md:hidden gap-4 w-full lg:px-4">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.company}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <ExperienceCard {...exp} />
                        </motion.div>
                    ))}
                </div>

                {/* Desktop layout - hidden on mobile */}
                <div className="hidden md:block w-full max-w-[90vw] xl:max-w-[1400px]">
                    {/* Container for maintaining center alignment */}
                    <div className="relative flex flex-col items-center">
                        {/* Top row */}
                        <div className="w-full flex justify-center gap-20 mb-20">
                            {experiences.slice(0, 2).map((exp, index) => (
                                <motion.div
                                    key={exp.company}
                                    className="flex flex-1 min-w-0"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                >
                                    <ExperienceCard {...exp} />
                                </motion.div>
                            ))}
                        </div>

                        {/* Title */}
                        <motion.h2
                            className="text-4xl md:text-[7.65rem] lg:text-9xl xl:text-[15.5rem] leading-[1.2] tracking-tighter font-extrabold mb-20"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            {t('title')}
                        </motion.h2>

                        {/* Bottom row */}
                        <div className="w-full flex justify-center gap-20">
                            {experiences.slice(2, 4).map((exp, index) => (
                                <motion.div
                                    key={exp.company}
                                    className="flex flex-1 min-w-0"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                >
                                    <ExperienceCard {...exp} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    )
}

export default Experiences
