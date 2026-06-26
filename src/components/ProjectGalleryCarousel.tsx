'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { ProjectGalleryMedia } from '@/lib/project-gallery'
import { cn } from '@/lib/utils'

type GalleryViewport = ProjectGalleryMedia['viewport']

type ProjectGalleryCarouselLabels = {
    view: string
    desktop: string
    mobile: string
    previous: string
    next: string
}

type ProjectGalleryCarouselProps = {
    media: ProjectGalleryMedia[]
    projectTitle: string
    labels: ProjectGalleryCarouselLabels
}

export function ProjectGalleryCarousel({
    media,
    projectTitle,
    labels,
}: ProjectGalleryCarouselProps) {
    const desktopMedia = useMemo(() => media.filter((item) => item.viewport === 'desktop'), [media])
    const mobileMedia = useMemo(() => media.filter((item) => item.viewport === 'mobile'), [media])
    const availableViews = useMemo(
        () =>
            [
                { value: 'desktop' as const, label: labels.desktop, count: desktopMedia.length },
                { value: 'mobile' as const, label: labels.mobile, count: mobileMedia.length },
            ].filter((view) => view.count > 0),
        [desktopMedia.length, labels.desktop, labels.mobile, mobileMedia.length]
    )
    const [selectedView, setSelectedView] = useState<GalleryViewport>(
        desktopMedia.length > 0 ? 'desktop' : 'mobile'
    )
    const [activeIndex, setActiveIndex] = useState(0)
    const selectedMedia = selectedView === 'desktop' ? desktopMedia : mobileMedia
    const activeMedia = selectedMedia[activeIndex]

    useEffect(() => {
        if (!availableViews.some((view) => view.value === selectedView)) {
            setSelectedView(availableViews[0]?.value ?? 'desktop')
        }
    }, [availableViews, selectedView])

    useEffect(() => {
        setActiveIndex(0)
    }, [selectedView])

    if (!activeMedia) {
        return null
    }

    const goToPrevious = () => {
        setActiveIndex((currentIndex) =>
            currentIndex === 0 ? selectedMedia.length - 1 : currentIndex - 1
        )
    }

    const goToNext = () => {
        setActiveIndex((currentIndex) =>
            currentIndex === selectedMedia.length - 1 ? 0 : currentIndex + 1
        )
    }

    return (
        <div className="grid gap-4">
            <div className="flex flex-col gap-3 border-y border-gray-200 py-3 sm:flex-row sm:items-center sm:justify-between">
                <label className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-gray-500 sm:justify-start">
                    <span>{labels.view}</span>
                    <select
                        value={selectedView}
                        onChange={(event) => setSelectedView(event.target.value as GalleryViewport)}
                        className="min-w-32 rounded-none border border-black bg-white px-3 py-2 text-sm font-bold normal-case tracking-normal text-black outline-none transition-colors focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-400"
                        disabled={availableViews.length < 2}
                    >
                        {availableViews.map((view) => (
                            <option key={view.value} value={view.value}>
                                {view.label}
                            </option>
                        ))}
                    </select>
                </label>

                <div className="flex items-center justify-between gap-3 sm:justify-end">
                    <p className="font-mono text-xs tabular-nums text-gray-500">
                        {(activeIndex + 1).toString().padStart(2, '0')} /{' '}
                        {selectedMedia.length.toString().padStart(2, '0')}
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={goToPrevious}
                            className="grid h-10 w-10 place-items-center border border-black bg-white text-black transition-[color,background-color,border-color,transform] hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 active:scale-[0.96]"
                            aria-label={labels.previous}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={goToNext}
                            className="grid h-10 w-10 place-items-center border border-black bg-white text-black transition-[color,background-color,border-color,transform] hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 active:scale-[0.96]"
                            aria-label={labels.next}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                <GallerySlide
                    key={activeMedia.src}
                    media={activeMedia}
                    alt={`${projectTitle} gallery ${activeIndex + 1}`}
                />
            </div>
        </div>
    )
}

function GallerySlide({ media, alt }: { media: ProjectGalleryMedia; alt: string }) {
    const isMobile = media.viewport === 'mobile'

    if (media.type === 'video') {
        return (
            <div className={cn('flex justify-center p-5 md:p-8', !isMobile && 'block')}>
                <video
                    src={media.src}
                    className={cn(
                        'bg-gray-50 object-contain',
                        isMobile
                            ? 'aspect-[9/16] w-[min(260px,72vw)] rounded-2xl shadow-2xl'
                            : 'w-full rounded-lg shadow-2xl'
                    )}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    aria-label={alt}
                />
            </div>
        )
    }

    return (
        <div
            className={cn(
                'relative mx-auto',
                isMobile
                    ? 'my-5 aspect-[9/16] w-[min(260px,72vw)] overflow-hidden rounded-2xl shadow-2xl md:my-8'
                    : 'aspect-video w-full'
            )}
        >
            <Image
                src={media.src}
                alt={alt}
                fill
                className={isMobile ? 'object-cover' : 'object-contain'}
                sizes={isMobile ? '260px' : '(min-width: 1024px) 1024px, 100vw'}
            />
        </div>
    )
}
