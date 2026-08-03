import type { Metadata } from 'next'
import Link from 'next/link'
import { getBlogPosts } from '@/lib/blog'
import { getI18nContent } from '@/i18n/server'
import { withLocaleMetadata } from '@/lib/metadata'

interface BlogPageProps {
    params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
    const { lang: langParam } = await params
    const { lang, content } = await getI18nContent(langParam)

    return withLocaleMetadata(content.metadata.blog, lang, '/blog')
}

export default async function BlogPage({ params }: BlogPageProps) {
    const { lang: langParam } = await params
    const { lang, content } = await getI18nContent(langParam)
    const posts = await getBlogPosts()

    return (
        <div className="mt-[88px] min-h-screen bg-white text-black">
            <main id="main-content" className="container mx-auto px-4 py-12">
                <h1 className="mb-8 text-4xl font-bold">{content.blog.title}</h1>
                <div className="grid gap-8">
                    {posts.length === 0 && <p>{content.blog.empty}</p>}
                    {posts.map((post) => (
                        <article key={post.slug} className="border-b border-gray-200 pb-8">
                            <Link
                                href={`/${lang}/blog/${post.slug}`}
                                className="block hover:underline"
                            >
                                <h2 className="mb-2 text-2xl font-semibold">{post.title}</h2>
                            </Link>
                            <p className="mb-4 text-gray-600">{post.date}</p>
                            <p className="text-gray-800">{post.excerpt}</p>
                        </article>
                    ))}
                </div>
            </main>
        </div>
    )
}
