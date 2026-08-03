import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { ProjectGalleryCarousel } from '@/components/ProjectGalleryCarousel'
import { getLocalizedProject, getProjectSlugs, localizedPath } from '@/content/site'
import { locales } from '@/i18n/config'
import { getI18nContent } from '@/i18n/server'
import { withLocaleMetadata } from '@/lib/metadata'
import { getProjectGalleryMedia } from '@/lib/project-gallery'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface ProjectPageProps {
    params: Promise<{ lang: string; slug: string }>
}

export function generateStaticParams() {
    return locales.flatMap((lang) => getProjectSlugs(lang).map((slug) => ({ lang, slug })))
}

/** Every project is known at build time, so an unlisted slug is simply a 404.
 *
 *  Without this, Next treats an unknown slug as a route to render on demand:
 *  it starts streaming the shell, *then* hits `notFound()` below — too late to
 *  set a status, since the headers are already sent. The result was a soft 404,
 *  `/it/projects/anything` answering **200** with Next's stock black-on-white
 *  "This page could not be found" wedged between this site's header and footer.
 *  Crawlers read that as a real page. Refusing unknown params moves the 404 up
 *  to the routing layer, before any bytes go out, which both restores the
 *  status code and lets `global-not-found.tsx` render its localized page. */
export const dynamicParams = false

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { lang: langParam, slug } = await params

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
                <ButtonLink
                    href={localizedPath(lang, '/projects')}
                    variant="secondary"
                    static
                    className="mb-12 min-h-0 rounded-full bg-transparent px-4 py-2 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    {content.common.cta.backProjects}
                </ButtonLink>

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
                            imageAlt: content.projectPage.galleryImageAlt,
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
                        {project.url && (
                            <ButtonLink
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="secondary"
                                static
                                className="mt-8 min-h-0 bg-transparent px-4 py-2 transition-colors"
                            >
                                {content.common.cta.liveSite} <ArrowUpRight className="h-4 w-4" />
                            </ButtonLink>
                        )}
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
