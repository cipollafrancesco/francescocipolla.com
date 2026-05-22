import type { Metadata } from 'next'
import Markdown from 'react-markdown'
import { notFound } from 'next/navigation'
import { getBlogPost } from '@/lib/blog'
import { getI18nContent } from '@/i18n/server'
import { withLocaleMetadata } from '@/lib/metadata'

interface BlogPostPageProps {
    params: Promise<{ lang: string; slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { lang: langParam, slug } = await params
    const { lang } = await getI18nContent(langParam)
    const post = await getBlogPost(slug)

    if (!post) return {}

    return withLocaleMetadata(
        {
            title: `${post.title} - Francesco Cipolla`,
            description: post.excerpt,
            openGraph: {
                type: 'article',
                publishedTime: post.date,
            },
        },
        lang,
        `/blog/${slug}`
    )
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params
    const post = await getBlogPost(slug)

    if (!post) {
        notFound()
    }

    return (
        <div className="mt-[88px] min-h-screen bg-white text-black">
            <main id="main-content" className="container mx-auto px-4 py-12">
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
