'use client'
import CalEmbed from '@/components/CalEmbed'
import { siteLinks } from '@/content/site-links'
import { motion, useReducedMotion } from 'framer-motion'
import React from 'react'
import { revealProps, useSectionScrollFade } from '@/lib/motion'

interface IContactsProps {
    title: string
    scheduleTitle: string
}

const Contacts: React.FC<IContactsProps> = ({ title, scheduleTitle }) => {
    const { ref, style } = useSectionScrollFade<HTMLElement>()
    const reduced = useReducedMotion()

    return (
        <motion.section
            ref={ref}
            id="contacts"
            className="flex flex-col items-center justify-center py-20"
            style={style}
        >
            <motion.h2
                className="mb-12 text-[80px] font-extrabold leading-[0.9] tracking-tighter md:text-9xl lg:text-[9rem] xl:text-[16rem]"
                initial={reduced ? false : { opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: reduced ? 0 : 0.7 }}
            >
                {title}
            </motion.h2>

            <motion.a
                className="mb-12 text-2xl tracking-tighter md:text-4xl lg:text-5xl"
                href={`mailto:${siteLinks.email}`}
                {...revealProps(reduced, { delay: 0.3, y: 20 })}
            >
                {siteLinks.email}
            </motion.a>

            <div className="flex flex-row gap-8">
                <motion.a
                    className="text-xl tracking-tighter underline md:text-3xl lg:text-4xl"
                    href={siteLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...revealProps(reduced, { delay: 0.4, y: 20 })}
                >
                    LinkedIn
                </motion.a>

                <motion.a
                    className="text-xl tracking-tighter underline md:text-3xl lg:text-4xl"
                    href={siteLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...revealProps(reduced, { delay: 0.5, y: 20 })}
                >
                    GitHub
                </motion.a>
            </div>

            <motion.div className="mt-28 w-full" {...revealProps(reduced, { delay: 0.6, y: 20 })}>
                <motion.h3
                    className="mb-8 text-center text-2xl tracking-tighter md:text-3xl lg:text-4xl"
                    {...revealProps(reduced, { delay: 0.6, y: 20 })}
                >
                    {scheduleTitle}
                </motion.h3>
                <CalEmbed calLink="francescocipolla/free-intro-call-30-minutes" />
            </motion.div>
        </motion.section>
    )
}

export default Contacts
