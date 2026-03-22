'use client'
import Image from 'next/image'
import { useRef } from 'react'
import { EffectCards, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

import { projects } from '@/app/constants'
import { ArrowUpRight } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/effect-cards'

export default function StackedProjects() {
    const swiperRef = useRef(null)
    const t = useTranslations('projects')

    return (
        <div className="flex items-center justify-center lg:h-[80vh]">
            <Swiper
                ref={swiperRef}
                effect={'cards'}
                grabCursor={true}
                pagination={{ clickable: true, enabled: true }}
                modules={[EffectCards, Pagination]}
                className="aspect-[9/16] h-auto w-[290px] md:aspect-video md:w-[630px] xl:!mr-[5%] xl:h-[600px] xl:w-[1080px]"
            >
                {projects.map((project) => (
                    <SwiperSlide
                        key={project.id}
                        className="group overflow-hidden rounded-lg bg-white shadow-xl"
                    >
                        <div className="relative h-full w-full">
                            <Image
                                src={project.mobileImage}
                                alt={project.title}
                                fill
                                className="object-cover md:hidden"
                            />
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="hidden object-cover md:block"
                            />

                            <div className="absolute inset-0 flex flex-col justify-end bg-black bg-opacity-60 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <h3 className="mb-2 text-2xl font-bold text-white">
                                    {project.title}
                                </h3>
                                <p className="mb-4 text-sm text-gray-300">
                                    {project.technologies.join(' • ')}
                                </p>
                                <div className="flex items-center gap-4">
                                    <Link
                                        href={`/projects/${project.slug}`}
                                        className="text-sm text-white underline underline-offset-2"
                                    >
                                        {t('caseStudy')}
                                    </Link>
                                    <Link
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-white"
                                    >
                                        {t('visitSite')} <ArrowUpRight className="ml-1 h-5 w-5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
