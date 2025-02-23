'use client'
import Image from 'next/image'
import { useRef } from 'react'
import { EffectCards } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-cards'

interface Project {
    id: number
    title: string
    image: string
    url: string
    technologies: string[]
}

interface StackedProjectsProps {
    projects: Project[]
}

export default function StackedProjects({projects}: StackedProjectsProps) {
    const swiperRef = useRef(null)

    return (
        <div className="lg:h-[80vh] flex items-center justify-center">
            <Swiper
                ref={swiperRef}
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                className="w-[315px] h-auto aspect-video md:w-[500px] md:h-[400px] xl:w-[1080px] xl:h-[600px] xl:!mr-[5%]"
            >
                {projects.map((project) => (
                    <SwiperSlide key={project.id} className="bg-white rounded-lg shadow-xl overflow-hidden">
                        <div className="relative w-full h-full">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover"
                            />
                            {/*<div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6">
                                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                                <p className="text-sm text-gray-300 mb-4">{project.technologies.join(' • ')}</p>
                                <Link
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-white text-lg font-semibold hover:underline"
                                >
                                    Visit Site <ArrowUpRight className="ml-2 h-5 w-5"/>
                                </Link>
                            </div>*/}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

