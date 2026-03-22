import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getProject, getProjectSlugs } from '@/lib/projects'
import { routing } from '@/i18n/routing'

interface ProjectPageProps {
    params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
    return routing.locales.flatMap((locale) => getProjectSlugs().map((slug) => ({ locale, slug })))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { locale, slug } = await params
    const project = getProject(slug)

    if (!project) return {}

    const t = await getTranslations({ locale, namespace: 'projects' })
    const description = t(`content.${slug}.description` as Parameters<typeof t>[0])

    return {
        title: `${project.title} — Francesco Cipolla`,
        description,
        openGraph: {
            title: `${project.title} — Francesco Cipolla`,
            description,
            url: `https://francescocipolla.com/${locale}/projects/${slug}`,
            images: [{ url: project.image }],
        },
        alternates: {
            canonical: `https://francescocipolla.com/${locale}/projects/${slug}`,
        },
    }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { locale, slug } = await params
    setRequestLocale(locale)

    const project = getProject(slug)
    if (!project) notFound()

    const t = await getTranslations('projects')
    const description = t(`content.${slug}.description` as Parameters<typeof t>[0])
    const highlights = t.raw(
        `content.${slug}.highlights` as Parameters<typeof t.raw>[0]
    ) as string[]

    return (
        <div className="mt-[88px] min-h-screen bg-white text-black">
            <main id="main-content" className="mx-auto max-w-5xl px-6 py-16">
                {/* Back */}
                <Link
                    href="/#projects"
                    className="mb-12 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-black"
                >
                    <ArrowLeft className="h-4 w-4" />
                    {t('detail.back')}
                </Link>

                {/* Header */}
                <div className="mb-12">
                    <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-400">
                        <span>{project.client}</span>
                        <span>·</span>
                        <span>{project.year}</span>
                        <span>·</span>
                        <span>{project.role}</span>
                    </div>
                    <h1 className="mb-8 text-5xl font-extrabold leading-none tracking-tighter md:text-7xl">
                        {project.title}
                    </h1>
                    <div className="mb-8 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-full border border-gray-200 px-3 py-1 text-xs"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4 transition-colors hover:text-gray-600"
                    >
                        {t('detail.visitLive')} <ArrowUpRight className="h-4 w-4" />
                    </a>
                </div>

                {/* Hero image */}
                <div className="relative mb-16 aspect-video w-full overflow-hidden rounded-xl bg-gray-50">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Body */}
                <div className="grid gap-16 md:grid-cols-[1fr_320px]">
                    <div>
                        <h2 className="mb-4 text-2xl font-bold">{t('detail.overview')}</h2>
                        <p className="text-lg leading-relaxed text-gray-700">{description}</p>
                    </div>
                    <aside>
                        <h2 className="mb-4 text-2xl font-bold">{t('detail.highlights')}</h2>
                        <ul className="space-y-3">
                            {highlights.map((item, i) => (
                                <li
                                    key={i}
                                    className="flex gap-3 text-sm leading-relaxed text-gray-700"
                                >
                                    <span className="mt-0.5 select-none text-gray-300">—</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </aside>
                </div>

                {/* Mobile image */}
                <div className="mt-16 flex justify-center">
                    <div className="relative aspect-[9/16] w-[220px] overflow-hidden rounded-2xl shadow-2xl">
                        <Image
                            src={project.mobileImage}
                            alt={`${project.title} ${t('detail.onMobile')}`}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </main>
        </div>
    )
}
