import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getBlogPost, getBlogPosts } from '@/lib/blog'
import { notFound } from 'next/navigation'
import Markdown from 'react-markdown'
import { routing } from '@/i18n/routing'

interface BlogPostPageProps {
    params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
    const posts = await getBlogPosts()
    return routing.locales.flatMap((locale) => posts.map((post) => ({ locale, slug: post.slug })))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { locale, slug } = await params
    const post = await getBlogPost(slug)

    if (!post) return {}

    return {
        title: `${post.title} — Francesco Cipolla`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `https://francescocipolla.com/${locale}/blog/${slug}`,
            type: 'article',
            publishedTime: post.date,
        },
        alternates: {
            canonical: `https://francescocipolla.com/${locale}/blog/${slug}`,
        },
    }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { locale, slug } = await params
    setRequestLocale(locale)

    const post = await getBlogPost(slug)

    if (!post) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-white text-black">
            <main className="container mx-auto px-4 py-8">
                <article className="mx-auto max-w-3xl">
                    <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
                    <p className="mb-8 text-gray-600">{post.date}</p>
                    <div className="prose prose-lg">
                        <Markdown>{post.content}</Markdown>
                    </div>
                </article>
            </main>
        </div>
    )
}
