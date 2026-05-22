import { existsSync, readdirSync } from 'fs'
import path from 'path'

const supportedImageExtensions = new Set(['.avif', '.jpg', '.jpeg', '.png', '.webp'])

export function getProjectGalleryImages(slug: string) {
    const galleryDirectory = path.join(process.cwd(), 'public', 'projects', slug, 'gallery')

    if (!existsSync(galleryDirectory)) {
        return []
    }

    return readdirSync(galleryDirectory, { withFileTypes: true })
        .filter((entry) => entry.isFile())
        .map((entry) => entry.name)
        .filter((fileName) => supportedImageExtensions.has(path.extname(fileName).toLowerCase()))
        .sort((first, second) => first.localeCompare(second, undefined, { numeric: true }))
        .map((fileName) => `/projects/${slug}/gallery/${fileName}`)
}
