'use client'
import Image from 'next/image'
import { useRef } from 'react'
import { EffectCards, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { projects } from '@/app/constants'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import 'swiper/css'
import 'swiper/css/effect-cards'

export default function StackedProjects() {
    const swiperRef = useRef(null)

    return (
        <div className="lg:h-[80vh] flex items-center justify-center">
            <Swiper
                ref={swiperRef}
                effect={'cards'}
                grabCursor={true}
                pagination={{ clickable: true, enabled: true }}
                modules={[EffectCards, Pagination]}
                className="w-[290px] h-auto aspect-[9/16] md:aspect-video md:w-[630px] xl:w-[1080px] xl:h-[600px] xl:!mr-[5%]"
            >
                {projects.map((project) => (
                    <SwiperSlide key={project.id}
                        className="bg-white rounded-lg shadow-xl overflow-hidden group">
                        <div className="relative w-full h-full">
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
                                className="object-cover hidden md:block"
                            />

                            <div
                                className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 bg-opacity-60 flex flex-col justify-end p-6 transition-opacity duration-300">
                                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                                <p className="text-sm text-gray-300 mb-4">{project.technologies.join(' • ')}</p>
                                <Link
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white flex items-center"
                                >
                                    Visit this Site <ArrowUpRight className="ml-2 h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
