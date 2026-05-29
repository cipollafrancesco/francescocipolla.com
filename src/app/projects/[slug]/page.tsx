import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { getProject, getProjectSlugs } from '@/lib/projects'
import { getProjectGalleryImages } from '@/lib/project-gallery'

interface ProjectPageProps {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    return getProjectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params
    const project = getProject(slug)

    if (!project) return {}

    return {
        title: `${project.title} — Francesco Cipolla`,
        description: project.description,
        openGraph: {
            title: `${project.title} — Francesco Cipolla`,
            description: project.description,
            url: `https://francescocipolla.com/projects/${slug}`,
            images: [{ url: project.image }],
        },
        alternates: {
            canonical: `https://francescocipolla.com/projects/${slug}`,
        },
    }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params
    const project = getProject(slug)

    if (!project) notFound()

    const galleryImages = getProjectGalleryImages(project.slug)

    return (
        <div className="mt-[88px] min-h-screen bg-white text-black">
            <main id="main-content" className="mx-auto max-w-5xl px-6 py-16">
                {/* Back */}
                <Link
                    href="/#projects"
                    className="mb-12 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-black"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to projects
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
                        Visit live site <ArrowUpRight className="h-4 w-4" />
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
                        <h2 className="mb-4 text-2xl font-bold">Overview</h2>
                        <p className="text-lg leading-relaxed text-gray-700">
                            {project.description}
                        </p>
                    </div>
                    <aside>
                        <h2 className="mb-4 text-2xl font-bold">Highlights</h2>
                        <ul className="space-y-3">
                            {project.highlights.map((item, i) => (
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
                            alt={`${project.title} on mobile`}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {galleryImages.length > 0 && (
                    <section className="mt-20 border-t border-black pt-12">
                        <div className="mb-8 flex items-end justify-between gap-6">
                            <h2 className="text-3xl font-black tracking-tight md:text-5xl">
                                Gallery
                            </h2>
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
