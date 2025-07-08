import Link from 'next/link'
import Image from 'next/image'
import {getBlogPosts} from '@/lib/blog'

export default async function BlogPage() {
    const posts = await getBlogPosts()

    return (
        <div className="min-h-screen bg-white text-black mt-20 lg:mt-10">
            <main className="container mx-auto px-4 pt-2 pb-8">
                <h1 className="text-4xl font-bold mb-16">Blog</h1>
                <div className="grid gap-8">
                    {posts.map((post) => (
                        <article key={post.slug} className="border-b border-gray-200 pb-8">
                            <Link href={`/blog/${post.slug}`} className="flex flex-row items-center gap-3">
                                <Image
                                    className="hidden md:block"
                                    src="/blog/placeholder.png"
                                    alt={`Thumbnail for ${post.title}`}
                                    width={150}
                                    height={150}
                                />
                                <div>
                                <h2 className="text-2xl font-semibold mb-2 hover:underline">{post.title}</h2>
                                    <p className="text-gray-600 mb-4">{post.date}</p>
                                    <p className="text-gray-800">{post.excerpt}</p>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            </main>
        </div>
    )
}
