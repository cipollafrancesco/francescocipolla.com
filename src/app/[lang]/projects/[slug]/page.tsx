import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { getI18nContent } from '@/i18n/server'
import { isLocale, locales } from '@/i18n/config'
import { getLocalizedProject, getProjectSlugs } from '@/content/site'
import { getProjectGalleryImages } from '@/lib/project-gallery'
import { withLocaleMetadata } from '@/lib/metadata'

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

    const galleryImages = getProjectGalleryImages(project.slug)

    return (
        <div className="mt-[88px] min-h-screen bg-white text-black">
            <main id="main-content" className="mx-auto max-w-5xl px-6 py-16">
                <Link
                    href={`/${lang}/#projects`}
                    className="mb-12 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-black"
                >
                    <ArrowLeft className="h-4 w-4" />
                    {content.common.cta.backProjects}
                </Link>

                <div className="mb-12">
                    <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-400">
                        <span>{project.client}</span>
                        <span aria-hidden="true">/</span>
                        <span>{project.year}</span>
                        <span aria-hidden="true">/</span>
                        <span>{project.role}</span>
                    </div>
                    <h1 className="mb-8 text-5xl font-extrabold leading-none tracking-tighter md:text-7xl">
                        {project.title}
                    </h1>
                    <div className="mb-8 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                            <Badge key={tech}>{tech}</Badge>
                        ))}
                    </div>
                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4 transition-colors hover:text-gray-600"
                    >
                        {content.common.cta.liveSite} <ArrowUpRight className="h-4 w-4" />
                    </a>
                </div>

                <div className="relative mb-16 aspect-video w-full overflow-hidden rounded-lg bg-gray-50">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
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
                    </aside>
                </div>

                <div className="mt-16 flex justify-center">
                    <div className="relative aspect-[9/16] w-[220px] overflow-hidden rounded-2xl shadow-2xl">
                        <Image
                            src={project.mobileImage}
                            alt={`${project.title} mobile`}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {galleryImages.length > 0 && (
                    <section className="mt-20 border-t border-black pt-12">
                        <div className="mb-8 flex items-end justify-between gap-6">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-500">
                                    {project.client}
                                </p>
                                <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
                                    {content.projectPage.gallery}
                                </h2>
                            </div>
                            <p className="text-sm font-semibold text-gray-500">
                                {galleryImages.length.toString().padStart(2, '0')}
                            </p>
                        </div>
                        <div className="grid gap-5">
                            {galleryImages.map((image, index) => (
                                <div
                                    key={image}
                                    className="relative aspect-video overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
                                >
                                    <Image
                                        src={image}
                                        alt={`${project.title} gallery ${index + 1}`}
                                        fill
                                        className="object-contain"
                                        sizes="(min-width: 1024px) 1024px, 100vw"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                )}
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
