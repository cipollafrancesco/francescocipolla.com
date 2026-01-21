'use client'
import React from 'react'
import {motion} from 'framer-motion'
import {CheckCircle2} from 'lucide-react'
import {useTranslations} from 'next-intl'

const EngagementModels: React.FC = () => {
    const t = useTranslations('home.models')

    const models = [
        { name: t('fixed_title'), desc: t('fixed_desc') },
        { name: t('retainer_title'), desc: t('retainer_desc') },
        { name: t('augmentation_title'), desc: t('augmentation_desc') }
    ]

    return (
        <section className="py-24 max-w-screen-xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-12">{t('title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {models.map((model, index) => (
                    <motion.div
                        key={index}
                        initial={{opacity: 0, x: -20}}
                        whileInView={{opacity: 1, x: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.5, delay: index * 0.1}}
                        className="flex items-start gap-4 p-6 rounded-2xl border border-gray-100 bg-white shadow-sm"
                    >
                        <CheckCircle2 className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="font-bold mb-2">{model.name}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {model.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default EngagementModels
