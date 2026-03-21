import type { Metadata } from 'next'
import Link from 'next/link'
import {getBlogPosts} from '@/lib/blog'

export const metadata: Metadata = {
    title: 'Blog — Francesco Cipolla',
    description: 'Thoughts on frontend engineering, design, product, and the tools I use day to day.',
    openGraph: {
        title: 'Blog — Francesco Cipolla',
        description: 'Thoughts on frontend engineering, design, product, and the tools I use day to day.',
        url: 'https://francescocipolla.com/blog',
    },
    alternates: {
        canonical: 'https://francescocipolla.com/blog',
    },
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="min-h-screen bg-white text-black mt-[88px]">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <div className="grid gap-8">
          {posts.map((post) => (
            <article key={post.slug} className="border-b border-gray-200 pb-8">
              <Link href={`/blog/${post.slug}`} className="block hover:underline">
                <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              </Link>
              <p className="text-gray-600 mb-4">{post.date}</p>
              <p className="text-gray-800">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}

