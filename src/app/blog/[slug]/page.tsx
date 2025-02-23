import {getBlogPost} from '@/lib/blog'
import {notFound} from 'next/navigation'
import Markdown from 'react-markdown'

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <main className="container mx-auto px-4 py-8">
        <article className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-600 mb-8">{post.date}</p>
          <div className="prose prose-lg">
            <Markdown>{post.content}</Markdown>
          </div>
        </article>
      </main>
    </div>
  )
}

