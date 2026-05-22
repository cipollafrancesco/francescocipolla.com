'use client'
import Image from 'next/image'
import { useRef } from 'react'
import { EffectCards, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import 'swiper/css'
import 'swiper/css/effect-cards'
import type { LocalizedProject } from '@/content/site'
import type { Locale } from '@/i18n/config'

export default function StackedProjects({
    projects,
    lang,
    labels,
}: {
    projects: LocalizedProject[]
    lang: Locale
    labels: {
        caseStudy: string
        liveSite: string
    }
}) {
    const swiperRef = useRef(null)

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
                                        href={`/${lang}/projects/${project.slug}`}
                                        className="text-sm text-white underline underline-offset-2"
                                    >
                                        {labels.caseStudy}
                                    </Link>
                                    <Link
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-white"
                                    >
                                        {labels.liveSite} <ArrowUpRight className="ml-1 h-5 w-5" />
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
