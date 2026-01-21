'use client'
import React from 'react'
import {motion} from 'framer-motion'
import {useTranslations} from 'next-intl'

const Process: React.FC = () => {
    const t = useTranslations('home.process')

    const steps = [
        { title: t('step1_title'), desc: t('step1_desc') },
        { title: t('step2_title'), desc: t('step2_desc') },
        { title: t('step3_title'), desc: t('step3_desc') },
        { title: t('step4_title'), desc: t('step4_desc') }
    ]

    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-screen-xl mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-16 text-center">{t('title')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{opacity: 0, scale: 0.9}}
                            whileInView={{opacity: 1, scale: 1}}
                            viewport={{once: true}}
                            transition={{duration: 0.5, delay: index * 0.1}}
                            className="relative flex flex-col items-center text-center"
                        >
                            <div className="text-6xl font-black text-gray-200 absolute -top-10 left-1/2 -translate-x-1/2 z-0">
                                0{index + 1}
                            </div>
                            <div className="relative z-10 pt-4">
                                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Process
