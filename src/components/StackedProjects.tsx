'use client'
import Image from 'next/image'
import { useRef, useState } from 'react'
import type { Swiper as SwiperInstance } from 'swiper'
import { A11y, EffectCards } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import type { LocalizedProject } from '@/content/site'
import type { Locale } from '@/i18n/config'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import 'swiper/css'
import 'swiper/css/effect-cards'
import 'swiper/css/a11y'

export default function StackedProjects({
    projects,
    lang,
    labels,
    className = 'lg:mt-96',
}: {
    projects: LocalizedProject[]
    lang: Locale
    labels: {
        caseStudy: string
        previous: string
        next: string
    }
    className?: string
}) {
    const swiperRef = useRef<SwiperInstance | null>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const totalProjects = projects.length

    const goPrevious = () => {
        swiperRef.current?.slidePrev()
    }

    const goNext = () => {
        swiperRef.current?.slideNext()
    }

    return (
        <div
            className={cn('flex flex-col items-center justify-center gap-5 lg:h-[80vh]', className)}
        >
            <Swiper
                onSwiper={(swiper) => {
                    swiperRef.current = swiper
                }}
                onSlideChange={(swiper) => {
                    setActiveIndex(swiper.realIndex)
                }}
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards, A11y]}
                className="aspect-[9/16] h-auto w-[290px] md:aspect-video md:w-[630px] xl:!mr-[5%] xl:h-[600px] xl:w-[1080px]"
            >
                {projects.map((project) => (
                    <SwiperSlide
                        key={project.id}
                        className="group overflow-hidden rounded-lg bg-white shadow-xl"
                    >
                        <div className="relative h-full w-full">
                            <Link
                                href={`/${lang}/projects/${project.slug}`}
                                className="absolute inset-0 z-0"
                                aria-label={`${labels.caseStudy}: ${project.title}`}
                            >
                                <Image
                                    src={project.mobileImage}
                                    alt={project.title}
                                    fill
                                    sizes="290px"
                                    // Neither variant gets `priority`. Both are
                                    // `<Image>` elements with CSS showing one per
                                    // breakpoint, and `priority` emits a
                                    // `<link rel=preload>` that fetches regardless of
                                    // `display: none` — so whichever one carried it
                                    // pulled the *off-breakpoint* asset down the wire
                                    // on every load. Left lazy, the hidden variant
                                    // never intersects and is never fetched at all,
                                    // while the visible one is in the initial viewport
                                    // and so is fetched immediately anyway.
                                    className="object-cover md:hidden"
                                />
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    sizes="(min-width: 1280px) 1080px, 630px"
                                    className="hidden object-cover md:block"
                                />
                            </Link>

                            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/60 p-6 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 md:group-hover:opacity-100">
                                <Link
                                    href={`/${lang}/projects/${project.slug}`}
                                    className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/70 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                                >
                                    {labels.caseStudy}
                                    <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="flex items-center gap-4">
                <Button
                    variant="secondary"
                    shape="iconRound"
                    onClick={goPrevious}
                    aria-label={labels.previous}
                >
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <p className="min-w-16 text-center text-xs font-semibold uppercase tabular-nums tracking-[0.22em] text-gray-500">
                    {String(activeIndex + 1).padStart(2, '0')} /{' '}
                    {String(totalProjects).padStart(2, '0')}
                </p>
                <Button
                    variant="secondary"
                    shape="iconRound"
                    onClick={goNext}
                    aria-label={labels.next}
                >
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
