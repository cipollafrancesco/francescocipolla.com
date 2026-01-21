'use client'
import Cal, { getCalApi } from '@calcom/embed-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import React, { useEffect } from 'react'
import {useTranslations} from 'next-intl'

interface IContactsProps {
    ref: React.RefObject<HTMLDivElement | null>
}

const Contacts: React.FC<IContactsProps> = ({ ref }) => {
    const t = useTranslations('about.contacts')
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
    const y = useTransform(scrollYProgress, [0, 0.2], [100, 0])

    useEffect(() => {
        (async function () {
            const Cal = await getCalApi();
            Cal("ui", {
                theme: "light",
                hideEventTypeDetails: true
            });
        })();
    }, []);

    return (
        <motion.section
            ref={ref}
            id="contacts"
            className="py-20 flex flex-col items-center justify-center"
            style={{ opacity, y }}
        >
            <motion.h2
                id="contacts-title"
                className="text-[80px] md:text-9xl lg:text-[9rem] xl:text-[16rem] leading-[0.9] tracking-tighter font-extrabold mb-12"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
            >
                {t('title')}
            </motion.h2>

            <motion.a
                className="text-2xl md:text-4xl lg:text-5xl mb-12 tracking-tighter"
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
                    className="underline text-xl md:text-3xl lg:text-4xl tracking-tighter"
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
                    className="underline text-xl md:text-3xl lg:text-4xl tracking-tighter"
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
                    className="text-2xl md:text-3xl lg:text-4xl mb-8 text-center tracking-tighter"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    {t('schedule')}
                </motion.h3>
                <Cal calLink="francescocipolla/free-intro-call-30-minutes" />
            </motion.div>
        </motion.section>
    )
}

export default Contacts
