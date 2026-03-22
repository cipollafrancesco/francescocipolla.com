'use client'
import CalEmbed from '@/components/CalEmbed'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslations } from 'next-intl'
import React from 'react'

interface IContactsProps {
    ref: React.RefObject<HTMLDivElement | null>
}

const Contacts: React.FC<IContactsProps> = ({ ref }) => {
    const t = useTranslations('contacts')

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    })

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
    const y = useTransform(scrollYProgress, [0, 0.2], [100, 0])

    return (
        <motion.section
            ref={ref}
            id="contacts"
            className="flex flex-col items-center justify-center py-20"
            style={{ opacity, y }}
        >
            <motion.h2
                id="contacts-title"
                className="mb-12 text-[80px] font-extrabold leading-[0.9] tracking-tighter md:text-9xl lg:text-[9rem] xl:text-[16rem]"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
            >
                contacts
            </motion.h2>

            <motion.a
                className="mb-12 text-2xl tracking-tighter md:text-4xl lg:text-5xl"
                href="mailto:info@francescocipolla.com"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                info@francescocipolla.com
            </motion.a>

            <div className="flex flex-row gap-8">
                <motion.a
                    className="text-xl tracking-tighter underline md:text-3xl lg:text-4xl"
                    href="https://www.linkedin.com/in/francesco-cipolla-41768411b"
                    target="_blank"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    LinkedIn
                </motion.a>

                <motion.a
                    className="text-xl tracking-tighter underline md:text-3xl lg:text-4xl"
                    href="https://github.com/cipollafrancesco"
                    target="_blank"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    GitHub
                </motion.a>
            </div>

            <motion.div
                className="mt-28 w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <motion.h3
                    className="mb-8 text-center text-2xl tracking-tighter md:text-3xl lg:text-4xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    {t('scheduleCall')}
                </motion.h3>
                <CalEmbed calLink="francescocipolla/free-intro-call-30-minutes" />
            </motion.div>
        </motion.section>
    )
}

export default Contacts
