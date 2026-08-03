import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface BlogPost {
    slug: string
    title: string
    date: string
    excerpt: string
    content: string
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    let fileNames: string[]

    // Unlike `getBlogPost`, this used to let a failed read escape: `/blog` is
    // prerendered, so a missing or unreadable `posts/` took down the whole
    // build rather than rendering the empty state the page already has copy
    // for. An absent post directory is a content state, not a broken deploy.
    try {
        fileNames = await fs.readdir(postsDirectory)
    } catch {
        return []
    }

    const posts = await Promise.all(
        // `.md` only. Every name in here becomes a post *and* a URL slug, so an
        // incidental `.DS_Store` — which macOS will happily drop in — would
        // otherwise surface as a listing entry with an undefined title linking
        // to `/blog/.DS_Store`.
        fileNames
            .filter((fileName) => fileName.endsWith('.md'))
            .map(async (fileName) => {
                const slug = fileName.replace(/\.md$/, '')
                const fullPath = path.join(postsDirectory, fileName)
                const fileContents = await fs.readFile(fullPath, 'utf8')
                const { data, content } = matter(fileContents)

                return {
                    slug,
                    title: data.title,
                    date: data.date,
                    excerpt: data.excerpt,
                    content,
                }
            })
    )

    return posts.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.md`)
        const fileContents = await fs.readFile(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
            slug,
            title: data.title,
            date: data.date,
            excerpt: data.excerpt,
            content,
        }
    } catch {
        // Missing file — the caller turns this into a 404. Not logged: the
        // common way to get here is a bot probing slugs, and each one was
        // writing a full stack trace to the server logs.
        return null
    }
}
