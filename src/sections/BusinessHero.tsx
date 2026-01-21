'use client'
import React from 'react'
import {motion, useReducedMotion} from 'framer-motion'
import {useTranslations} from 'next-intl'
import {Link} from '@/i18n/navigation'

const BusinessHero: React.FC = () => {
    const t = useTranslations('home.hero')
    const shouldReduceMotion = useReducedMotion()

    const animateProps = shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }
    const initialProps = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }

    return (
        <section className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 text-center">
            <motion.h1 
                initial={initialProps}
                animate={animateProps}
                transition={{duration: 0.8}}
                className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.9] max-w-5xl mb-8"
            >
                {t('h1')}
            </motion.h1>
            
            <motion.p
                initial={initialProps}
                animate={animateProps}
                transition={{duration: 0.8, delay: 0.2}}
                className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mb-12 tracking-tight"
            >
                {t('sub')}
            </motion.p>

            <motion.div
                initial={initialProps}
                animate={animateProps}
                transition={{duration: 0.8, delay: 0.4}}
                className="flex flex-col md:flex-row items-center gap-4 mb-16 text-left"
            >
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 max-w-xs">
                    <p className="text-sm font-semibold mb-1">{t('audience.founders_label')}</p>
                    <p className="text-sm text-gray-500">{t('audience.founders')}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 max-w-xs">
                    <p className="text-sm font-semibold mb-1">{t('audience.agencies_label')}</p>
                    <p className="text-sm text-gray-500">{t('audience.agencies')}</p>
                </div>
            </motion.div>

            <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                animate={animateProps}
                transition={{duration: 0.5, delay: 0.6}}
            >
                <Link 
                    href="#contacts" 
                    className="bg-black text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-800 transition duration-300 inline-block"
                >
                    {t('cta')}
                </Link>
                <p className="mt-4 text-xs text-gray-400 tracking-widest uppercase">
                    {t('location')}
                </p>
            </motion.div>
        </section>
    )
}

export default BusinessHero
