'use client'
import React from 'react'
import { experiences } from '@/app/constants'
import ExperienceCard from '@/components/ExperienceCard'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslations } from 'next-intl'

interface IExperiencesProps {
    ref: React.RefObject<HTMLDivElement | null>
}

const Experiences: React.FC<IExperiencesProps> = (props) => {
    const t = useTranslations('experiences')

    const { scrollYProgress } = useScroll({
        target: props.ref,
        offset: ['start end', 'end start'],
    })

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
    const y = useTransform(scrollYProgress, [0, 0.2], [100, 0])

    const localizedExperiences = experiences.map((exp) => ({
        ...exp,
        description: t(`descriptions.${exp.key}` as Parameters<typeof t>[0]),
    }))

    return (
        <motion.section id="experiences" className="py-20" ref={props.ref} style={{ opacity, y }}>
            <div className="flex flex-col items-center justify-center">
                {/* Mobile title */}
                <motion.h2
                    className="mb-10 text-[60px] font-extrabold leading-[0.9] tracking-tighter md:hidden"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    experiences
                </motion.h2>

                {/* Mobile: Column layout for experiences */}
                <div className="flex w-full flex-col gap-4 md:hidden lg:px-4">
                    {localizedExperiences.map((exp, index) => (
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
                <div className="hidden w-full max-w-[90vw] md:block xl:max-w-[1400px]">
                    <div className="relative flex flex-col items-center">
                        {/* Top row */}
                        <div className="mb-20 flex w-full justify-center gap-20">
                            {localizedExperiences.slice(0, 2).map((exp, index) => (
                                <motion.div
                                    key={exp.company}
                                    className="flex min-w-0 flex-1"
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
                            className="mb-20 text-4xl font-extrabold leading-[1.2] tracking-tighter md:text-[7.65rem] lg:text-9xl xl:text-[15.5rem]"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            experiences
                        </motion.h2>

                        {/* Bottom row */}
                        <div className="flex w-full justify-center gap-20">
                            {localizedExperiences.slice(2, 4).map((exp, index) => (
                                <motion.div
                                    key={exp.company}
                                    className="flex min-w-0 flex-1"
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
