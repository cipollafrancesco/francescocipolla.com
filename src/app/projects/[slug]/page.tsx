import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { getProject, getProjectSlugs } from '@/lib/projects'

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

    return (
        <div className="min-h-screen bg-white text-black mt-[88px]">
            <main id="main-content" className="max-w-5xl mx-auto px-6 py-16">
                {/* Back */}
                <Link
                    href="/#projects"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-12"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to projects
                </Link>

                {/* Header */}
                <div className="mb-12">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-4">
                        <span>{project.client}</span>
                        <span>·</span>
                        <span>{project.year}</span>
                        <span>·</span>
                        <span>{project.role}</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-none mb-8">
                        {project.title}
                    </h1>
                    <div className="flex flex-wrap gap-2 mb-8">
                        {project.technologies.map((tech) => (
                            <span
                                key={tech}
                                className="text-xs border border-gray-200 px-3 py-1 rounded-full"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4 hover:text-gray-600 transition-colors"
                    >
                        Visit live site <ArrowUpRight className="h-4 w-4" />
                    </a>
                </div>

                {/* Hero image */}
                <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-16 bg-gray-50">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Body */}
                <div className="grid md:grid-cols-[1fr_320px] gap-16">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Overview</h2>
                        <p className="text-gray-700 leading-relaxed text-lg">{project.description}</p>
                    </div>
                    <aside>
                        <h2 className="text-2xl font-bold mb-4">Highlights</h2>
                        <ul className="space-y-3">
                            {project.highlights.map((item, i) => (
                                <li key={i} className="flex gap-3 text-gray-700 text-sm leading-relaxed">
                                    <span className="mt-0.5 text-gray-300 select-none">—</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </aside>
                </div>

                {/* Mobile image */}
                <div className="mt-16 flex justify-center">
                    <div className="relative w-[220px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src={project.mobileImage}
                            alt={`${project.title} on mobile`}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </main>
        </div>
    )
}
