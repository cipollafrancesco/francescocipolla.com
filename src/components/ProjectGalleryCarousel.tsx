'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { ProjectGalleryMedia } from '@/lib/project-gallery'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

type GalleryViewport = ProjectGalleryMedia['viewport']

type ProjectGalleryCarouselLabels = {
    view: string
    desktop: string
    mobile: string
    previous: string
    next: string
    /** `{title}` and `{index}` are substituted. */
    imageAlt: string
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
    // Clamped during render rather than reset in an effect: switching views can
    // leave `activeIndex` pointing past the end of the new `selectedMedia` for
    // the render that happens before any effect runs, which made `activeMedia`
    // briefly undefined and unmounted the whole carousel.
    const clampIndex = (index: number) =>
        selectedMedia.length > 0 ? Math.min(index, selectedMedia.length - 1) : 0
    const clampedIndex = clampIndex(activeIndex)
    const activeMedia = selectedMedia[clampedIndex]

    if (!activeMedia) {
        return null
    }

    // Functional updates, not `setActiveIndex(clampedIndex ± 1)`: two clicks
    // fired before React re-renders would otherwise both read the same
    // render-scoped `clampedIndex` and compute the same next value, silently
    // dropping one of the clicks. Clamping again inside the updater (against
    // `current`, not `clampedIndex`) keeps the same out-of-bounds protection.
    const step = (delta: number) => {
        setActiveIndex((current) => {
            const clamped = clampIndex(current)
            const last = selectedMedia.length - 1
            if (delta < 0) return clamped === 0 ? last : clamped - 1
            return clamped === last ? 0 : clamped + 1
        })
    }

    const goToPrevious = () => step(-1)
    const goToNext = () => step(1)

    // Resetting here rather than in an effect on `selectedView`: this is the
    // only thing that ever changes the view, so the effect was just a delayed
    // echo of this handler.
    const handleViewChange = (view: GalleryViewport) => {
        setSelectedView(view)
        setActiveIndex(0)
    }

    return (
        <div className="grid gap-4">
            <div className="flex flex-col gap-3 border-y border-gray-200 py-3 sm:flex-row sm:items-center sm:justify-between">
                <label className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-gray-500 sm:justify-start">
                    <span>{labels.view}</span>
                    <select
                        value={selectedView}
                        onChange={(event) =>
                            handleViewChange(event.target.value as GalleryViewport)
                        }
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
                        {(clampedIndex + 1).toString().padStart(2, '0')} /{' '}
                        {selectedMedia.length.toString().padStart(2, '0')}
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="secondary"
                            shape="icon"
                            onClick={goToPrevious}
                            aria-label={labels.previous}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="secondary"
                            shape="icon"
                            onClick={goToNext}
                            aria-label={labels.next}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                <GallerySlide
                    key={activeMedia.src}
                    media={activeMedia}
                    // Function replacers, not literal-string ones: a literal
                    // second argument to `.replace()` special-cases `$&`/`$$`/
                    // `$\``/`$'` sequences, so a project title containing a
                    // literal `$` would silently corrupt the interpolation.
                    alt={labels.imageAlt
                        .replace('{title}', () => projectTitle)
                        .replace('{index}', () => String(clampedIndex + 1))}
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
