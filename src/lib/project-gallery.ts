import { existsSync, readdirSync } from 'fs'
import path from 'path'
import generatedGalleryManifest from '@/content/project-gallery.generated.json'

const supportedImageExtensions = new Set(['.avif', '.gif', '.jpg', '.jpeg', '.png', '.webp'])
const supportedVideoExtensions = new Set(['.mp4', '.mov', '.webm'])

export type ProjectGalleryMedia = {
    src: string
    pathname?: string
    type: 'image' | 'video'
    viewport: 'desktop' | 'mobile'
    width?: number
    height?: number
    bytes?: number
    duration?: number
}

type ProjectGalleryManifest = Record<string, ProjectGalleryMedia[]>

const galleryManifest = generatedGalleryManifest as ProjectGalleryManifest

export function getProjectGalleryMedia(slug: string): ProjectGalleryMedia[] {
    const generatedMedia = galleryManifest[slug]

    if (generatedMedia?.length) {
        return generatedMedia
    }

    // Local-preview escape hatch only. `public/projects/*/gallery/**` binaries are
    // gitignored, so on a deployed build these directories hold nothing but
    // `.gitkeep` and this branch can never return anything — it exists so dropping
    // files straight into `public/` renders without running `pnpm gallery:sync`.
    if (process.env.NODE_ENV !== 'development') {
        return []
    }

    const galleryDirectory = path.join(process.cwd(), 'public', 'projects', slug, 'gallery')

    if (!existsSync(galleryDirectory)) {
        return []
    }

    return [
        ...readGalleryDirectory(galleryDirectory, slug, 'mobile'),
        ...readGalleryDirectory(galleryDirectory, slug, 'desktop'),
        ...readGalleryDirectory(galleryDirectory, slug),
    ]
}

function readGalleryDirectory(
    galleryDirectory: string,
    slug: string,
    viewport?: ProjectGalleryMedia['viewport']
): ProjectGalleryMedia[] {
    const directory = viewport ? path.join(galleryDirectory, viewport) : galleryDirectory

    if (!existsSync(directory)) {
        return []
    }

    return readdirSync(directory, { withFileTypes: true })
        .filter((entry) => entry.isFile())
        .map((entry) => entry.name)
        .filter((fileName) => {
            const extension = path.extname(fileName).toLowerCase()

            return (
                supportedImageExtensions.has(extension) || supportedVideoExtensions.has(extension)
            )
        })
        .sort((first, second) => first.localeCompare(second, undefined, { numeric: true }))
        .map((fileName) => {
            const extension = path.extname(fileName).toLowerCase()
            const folder = viewport ? `${viewport}/` : ''

            return {
                src: `/projects/${slug}/gallery/${folder}${fileName}`,
                type: supportedVideoExtensions.has(extension) ? 'video' : 'image',
                viewport: viewport ?? 'desktop',
            }
        })
}
