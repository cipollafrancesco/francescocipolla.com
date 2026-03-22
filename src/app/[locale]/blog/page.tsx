import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getBlogPosts } from '@/lib/blog'

interface BlogPageProps {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'blog.meta' })
    return {
        title: t('title'),
        description: t('description'),
        openGraph: {
            title: t('title'),
            description: t('description'),
            url: `https://francescocipolla.com/${locale}/blog`,
        },
        alternates: {
            canonical: `https://francescocipolla.com/${locale}/blog`,
        },
    }
}

export default async function BlogPage({ params }: BlogPageProps) {
    const { locale } = await params
    setRequestLocale(locale)

    const posts = await getBlogPosts()

    return (
        <div className="mt-[88px] min-h-screen bg-white text-black">
            <main className="container mx-auto px-4 py-8">
                <h1 className="mb-8 text-4xl font-bold">Blog</h1>
                <div className="grid gap-8">
                    {posts.map((post) => (
                        <article key={post.slug} className="border-b border-gray-200 pb-8">
                            <Link href={`/blog/${post.slug}`} className="block hover:underline">
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
