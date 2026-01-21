'use client'
import React from 'react'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'
import {useTranslations} from 'next-intl'

const companies = [
    { name: 'FIFA+', logo: '/companies/fifa.png' },
    { name: 'Globant', logo: '/companies/globant.png' },
    { name: 'CHILI', logo: '/companies/chili.png' },
    { name: 'Softlab', logo: '/companies/softlab.png' },
]

const ProofStrip: React.FC = () => {
    const t = useTranslations('home.proof')

    return (
        <section className="py-12 border-y border-gray-100 bg-white">
            <div className="max-w-screen-xl mx-auto px-4 mb-8 text-center">
                <p className="text-sm font-medium text-gray-400 uppercase tracking-[0.2em]">
                    {t('title')}
                </p>
            </div>
            <Marquee gradient={false} speed={40}>
                <div className="flex items-center gap-16 md:gap-32 px-8">
                    {companies.map((company) => (
                        <div key={company.name} className="flex items-center gap-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition duration-300">
                            <Image
                                src={company.logo}
                                alt={`${company.name} logo`}
                                width={120}
                                height={40}
                                className="object-contain h-8 w-auto"
                            />
                            <span className="text-xl font-bold tracking-tighter">{company.name}</span>
                        </div>
                    ))}
                </div>
            </Marquee>
        </section>
    )
}

export default ProofStrip
