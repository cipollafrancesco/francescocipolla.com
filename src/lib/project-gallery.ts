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

// `dpulses-2-0`'s route slug is dash-only on purpose (see the comment in
// site.ts — a dotted path would be treated as a static file by the locale
// middleware), but its media folder — wherever it ends up populated, whether
// the generated manifest or the `public/` fallback — is the original dotted
// name. As of this writing neither actually has an entry for this project
// (`.media-source` was never synced for it), so this mapping doesn't yet
// change what renders — it just means the gallery will resolve correctly
// once that media is added, instead of needing this fixed at that point too.
const slugToAssetFolder: Record<string, string> = {
    'dpulses-2-0': 'dpulses2.0',
}

export function getProjectGalleryMedia(slug: string): ProjectGalleryMedia[] {
    const folder = slugToAssetFolder[slug] ?? slug
    const generatedMedia = galleryManifest[folder]

    if (generatedMedia?.length) {
        return generatedMedia
    }

    const galleryDirectory = path.join(process.cwd(), 'public', 'projects', folder, 'gallery')

    if (!existsSync(galleryDirectory)) {
        return []
    }

    return [
        ...readGalleryDirectory(galleryDirectory, folder, 'mobile'),
        ...readGalleryDirectory(galleryDirectory, folder, 'desktop'),
        ...readGalleryDirectory(galleryDirectory, folder),
    ]
}

export function getProjectGalleryImages(slug: string) {
    return getProjectGalleryMedia(slug)
        .filter((media) => media.type === 'image' && media.viewport !== 'mobile')
        .map((media) => media.src)
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
