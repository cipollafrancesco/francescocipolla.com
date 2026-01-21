'use client'
import React from 'react'
import {motion} from 'framer-motion'
import {useTranslations} from 'next-intl'
import {Layout, Cpu, Briefcase} from 'lucide-react'

const Services: React.FC = () => {
    const t = useTranslations('home.hero.pillars')
    
    const services = [
        {
            icon: <Layout className="w-8 h-8" />,
            title: t('platforms'),
            description: t('platforms_desc')
        },
        {
            icon: <Cpu className="w-8 h-8" />,
            title: t('ai'),
            description: t('ai_desc')
        },
        {
            icon: <Briefcase className="w-8 h-8" />,
            title: t('consulting'),
            description: t('consulting_desc')
        }
    ]

    return (
        <section className="py-24 px-4 max-w-screen-xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.5, delay: index * 0.1}}
                        className="p-8 border-2 border-gray-100 rounded-3xl hover:border-black transition duration-300 group"
                    >
                        <div className="mb-6 p-4 bg-gray-50 rounded-2xl w-fit group-hover:bg-black group-hover:text-white transition duration-300">
                            {service.icon}
                        </div>
                        <h3 className="text-2xl font-black tracking-tighter mb-4">{service.title}</h3>
                        <p className="text-gray-500 leading-relaxed tracking-tight">
                            {service.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default Services
