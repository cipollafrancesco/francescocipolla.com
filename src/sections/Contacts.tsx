'use client'
import React from 'react'
import {motion, useScroll, useTransform} from 'framer-motion'

interface IContactsProps {
    ref: React.RefObject<HTMLDivElement | null>
}

const Contacts: React.FC<IContactsProps> = ({ref}) => {
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
    const y = useTransform(scrollYProgress, [0, 0.2], [100, 0])

    return (
        <motion.section 
            ref={ref} 
            id="contacts" 
            className="py-20 flex flex-col items-center justify-center"
            style={{ opacity, y }}
        >
            <motion.h2 
                id="contacts-title"
                className="text-[2.5rem] md:text-6xl lg:text-7xl xl:text-[300px] leading-[0.9] tracking-tighter font-semibold my-12"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
            >
                contacts
            </motion.h2>

            <motion.a 
                className="text-5xl mb-16 tracking-tighter" 
                href="mailto:info@francescocipolla.com"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                info@francescocipolla.com
            </motion.a>

            <div className="flex flex-row gap-20">
                <motion.a 
                    className="underline text-4xl tracking-tighter"
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
                    className="underline text-4xl tracking-tighter"
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
        </motion.section>
    )
}

export default Contacts
