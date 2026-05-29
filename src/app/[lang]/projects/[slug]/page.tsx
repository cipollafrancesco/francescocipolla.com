import { Badge } from '@/components/ui/Badge'
import { ProjectGalleryCarousel } from '@/components/ProjectGalleryCarousel'
import { getLocalizedProject, getProjectSlugs } from '@/content/site'
import { isLocale, locales } from '@/i18n/config'
import { getI18nContent } from '@/i18n/server'
import { withLocaleMetadata } from '@/lib/metadata'
import { getProjectGalleryMedia } from '@/lib/project-gallery'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface ProjectPageProps {
    params: Promise<{ lang: string; slug: string }>
}

export function generateStaticParams() {
    return locales.flatMap((lang) => getProjectSlugs(lang).map((slug) => ({ lang, slug })))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { lang: langParam, slug } = await params

    if (!isLocale(langParam)) return {}

    const { lang } = await getI18nContent(langParam)
    const project = getLocalizedProject(lang, slug)

    if (!project) return {}

    return withLocaleMetadata(
        {
            title: `${project.title} - Francesco Cipolla`,
            description: project.description,
            openGraph: {
                images: [{ url: project.image }],
            },
        },
        lang,
        `/projects/${slug}`
    )
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { lang: langParam, slug } = await params

    if (!isLocale(langParam)) {
        notFound()
    }

    const { lang, content } = await getI18nContent(langParam)
    const project = getLocalizedProject(lang, slug)

    if (!project) {
        notFound()
    }

    const galleryMedia = getProjectGalleryMedia(project.slug)
    const hasMobileGalleryMedia = galleryMedia.some((media) => media.viewport === 'mobile')
    const visibleGalleryMedia = hasMobileGalleryMedia
        ? galleryMedia
        : [
              {
                  src: project.mobileImage,
                  type: 'image' as const,
                  viewport: 'mobile' as const,
              },
              ...galleryMedia,
          ]

    return (
        <div className="min-h-screen bg-white text-black md:mt-[88px]">
            <main id="main-content" className="mx-auto max-w-5xl px-6 pb-16 pt-8 md:py-16">
                <Link
                    href={`/${lang}/projects`}
                    className="mb-12 inline-flex items-center gap-2 rounded-full border border-black px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-black hover:text-white"
                >
                    <ArrowLeft className="h-4 w-4" />
                    {content.common.cta.backProjects}
                </Link>

                <div className="mb-12">
                    <div className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
                        <span>{project.client}</span>
                    </div>
                    <h1 className="mb-8 text-5xl font-extrabold leading-none tracking-tighter md:text-7xl">
                        {project.title}
                    </h1>
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                            <Badge key={tech}>{tech}</Badge>
                        ))}
                    </div>
                </div>

                <div className="mb-16">
                    <ProjectGalleryCarousel
                        media={visibleGalleryMedia}
                        projectTitle={project.title}
                        labels={{
                            view: content.projectPage.galleryView,
                            desktop: content.projectPage.galleryDesktop,
                            mobile: content.projectPage.galleryMobile,
                            previous: content.projectPage.galleryPrevious,
                            next: content.projectPage.galleryNext,
                        }}
                    />
                </div>

                <div className="grid gap-12 md:grid-cols-[1fr_320px]">
                    <div>
                        <h2 className="mb-4 text-2xl font-bold">{content.projectPage.overview}</h2>
                        <p className="text-lg leading-relaxed text-gray-700">
                            {project.description}
                        </p>

                        <div className="mt-12 grid gap-8">
                            <ProjectPoint
                                label={content.projectPage.problem}
                                text={project.problem}
                            />
                            <ProjectPoint
                                label={content.projectPage.solution}
                                text={project.solution}
                            />
                            <ProjectPoint
                                label={content.projectPage.outcome}
                                text={project.outcome}
                            />
                        </div>
                    </div>
                    <aside>
                        <h2 className="mb-4 text-2xl font-bold">
                            {content.projectPage.highlights}
                        </h2>
                        <ul className="space-y-3">
                            {project.highlights.map((item) => (
                                <li
                                    key={item}
                                    className="flex gap-3 text-sm leading-relaxed text-gray-700"
                                >
                                    <span className="mt-0.5 select-none text-gray-300">-</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-8 inline-flex items-center gap-2 rounded-md border border-black px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-black hover:text-white"
                        >
                            {content.common.cta.liveSite} <ArrowUpRight className="h-4 w-4" />
                        </a>
                    </aside>
                </div>
            </main>
        </div>
    )
}

function ProjectPoint({ label, text }: { label: string; text: string }) {
    return (
        <section>
            <h2 className="text-xl font-bold">{label}</h2>
            <p className="mt-3 leading-7 text-gray-700">{text}</p>
        </section>
    )
}
