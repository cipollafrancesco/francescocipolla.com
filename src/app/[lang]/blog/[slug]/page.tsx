import type { Metadata } from 'next'
import Markdown from 'react-markdown'
import { notFound } from 'next/navigation'
import { getBlogPost, getBlogPosts } from '@/lib/blog'
import { locales } from '@/i18n/config'
import { getI18nContent } from '@/i18n/server'
import { withLocaleMetadata } from '@/lib/metadata'

interface BlogPostPageProps {
    params: Promise<{ lang: string; slug: string }>
}

/** Posts come off the filesystem at build time, so the full set is knowable —
 *  which, with `dynamicParams` below, is what turns an unknown slug into a real
 *  404 instead of a 200 carrying Next's stock error page. Same reasoning as
 *  `projects/[slug]`; see the longer note there. */
export async function generateStaticParams() {
    const posts = await getBlogPosts()

    return locales.flatMap((lang) => posts.map((post) => ({ lang, slug: post.slug })))
}

export const dynamicParams = false

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
