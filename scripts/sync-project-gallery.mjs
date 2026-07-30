#!/usr/bin/env node

import { createReadStream } from 'node:fs'
import { createHash } from 'node:crypto'
import { copyFile, mkdir, readdir, readFile, rename, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'
import { put } from '@vercel/blob'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const publicProjectsRoot = path.join(root, 'public', 'projects')
const sourceProjectsRoot = path.join(root, '.media-source', 'projects')
const outputProjectsRoot = path.join(root, '.media-output', 'projects')
const manifestPath = path.join(root, 'src', 'content', 'project-gallery.generated.json')
const blobHostsPath = path.join(root, 'src', 'content', 'blob-hosts.generated.json')

const imageExtensions = new Set(['.avif', '.gif', '.jpg', '.jpeg', '.png', '.webp'])
const videoExtensions = new Set(['.mp4', '.mov', '.webm'])
const viewportNames = new Set(['desktop', 'mobile'])
const args = new Set(process.argv.slice(2))
const prepareOnly = args.has('--prepare-only')

main().catch((error) => {
    console.error(error instanceof Error ? error.message : error)
    process.exit(1)
})

async function main() {
    await loadLocalEnv()
    await ensureCommand('ffmpeg')
    await ensureCommand('ffprobe')
    await movePublicGalleryMediaToSource()

    const sourceMedia = await collectSourceMedia()

    if (sourceMedia.length === 0) {
        throw new Error(
            `No gallery media found in ${path.relative(root, sourceProjectsRoot)}. ` +
                'Drop project media under .media-source/projects/<slug>/{desktop,mobile}/ before running ' +
                'this script — refusing to overwrite the existing manifest with an empty one.'
        )
    }

    if (!prepareOnly && !process.env.BLOB_READ_WRITE_TOKEN) {
        throw new Error(
            'BLOB_READ_WRITE_TOKEN is missing. Set it in the environment before running pnpm gallery:sync.'
        )
    }

    const preparedMedia = []

    for (const media of sourceMedia) {
        preparedMedia.push(await prepareMedia(media))
    }

    await syncPublicFallback(preparedMedia)

    if (prepareOnly) {
        console.log(`Prepared ${preparedMedia.length} gallery assets in .media-output.`)
        return
    }

    // Merge into the existing manifest rather than rebuilding from scratch: this
    // run only touches the slugs found in .media-source, and any slug not
    // represented there (e.g. media temporarily missing from a contributor's
    // checkout) must keep its previously synced entries instead of being dropped.
    // Known tradeoff: if a slug's media is deliberately and fully removed from
    // .media-source (project retired), its old entries are never pruned —
    // there's no way to distinguish that from "just not synced this run."
    // Silent staleness is a much smaller failure than the wipe this replaced;
    // clean up a retired project's manifest entry by hand if that comes up.
    const manifest = await readExistingManifest()
    const touchedSlugs = new Set(preparedMedia.map((media) => media.slug))

    for (const slug of touchedSlugs) {
        manifest[slug] = []
    }

    const hosts = new Set(
        Object.values(manifest)
            .flat()
            .map((entry) => tryGetHostname(entry.src))
            .filter(Boolean)
    )
    const token = process.env.BLOB_READ_WRITE_TOKEN

    for (const media of preparedMedia) {
        const uploadFileName = await getContentHashedFileName(media.uploadPath)
        const blobPath = `portfolio/projects/${media.slug}/gallery/${media.viewport}/${uploadFileName}`
        const blob = await put(blobPath, createReadStream(media.uploadPath), {
            access: 'public',
            addRandomSuffix: false,
            allowOverwrite: true,
            multipart: true,
            contentType: media.contentType,
            cacheControlMaxAge: 31_536_000,
            token,
        })
        const metadata = await getMediaMetadata(media.uploadPath)
        const entry = {
            src: blob.url,
            pathname: blob.pathname,
            type: media.type,
            viewport: media.viewport,
            width: metadata.width,
            height: metadata.height,
            bytes: metadata.bytes,
            duration: metadata.duration,
        }

        manifest[media.slug] = [...(manifest[media.slug] ?? []), entry]
        hosts.add(new URL(blob.url).hostname)
        console.log(`Uploaded ${blobPath}`)
    }

    for (const entries of Object.values(manifest)) {
        entries.sort(compareManifestEntries)
    }

    await writeJson(manifestPath, sortManifest(manifest))
    await writeJson(blobHostsPath, [...hosts].sort())
    console.log(`Wrote ${path.relative(root, manifestPath)}.`)
    console.log(`Wrote ${path.relative(root, blobHostsPath)}.`)
}

async function movePublicGalleryMediaToSource() {
    const files = await walk(publicProjectsRoot)

    for (const file of files) {
        const relative = path.relative(publicProjectsRoot, file)
        const parts = relative.split(path.sep)
        const galleryIndex = parts.indexOf('gallery')

        if (galleryIndex < 0 || !isSupportedMedia(file)) {
            continue
        }

        const slug = parts[0]
        const canonicalSourceDirectory = path.join(sourceProjectsRoot, slug, 'gallery')

        if (await pathExists(canonicalSourceDirectory)) {
            continue
        }

        const destination = path.join(sourceProjectsRoot, relative)
        await mkdir(path.dirname(destination), { recursive: true })

        try {
            await rename(file, destination)
        } catch (error) {
            if (error?.code !== 'EEXIST') {
                throw error
            }

            await rm(file)
        }
    }
}

async function collectSourceMedia() {
    const files = await walk(sourceProjectsRoot)

    return files
        .filter(isSupportedMedia)
        .map((file) => {
            const relative = path.relative(sourceProjectsRoot, file)
            const parts = relative.split(path.sep)
            const slug = parts[0]
            const galleryIndex = parts.indexOf('gallery')
            const maybeViewport = parts[galleryIndex + 1]
            const viewport = viewportNames.has(maybeViewport) ? maybeViewport : 'desktop'

            return {
                sourcePath: file,
                slug,
                viewport,
                type: videoExtensions.has(path.extname(file).toLowerCase()) ? 'video' : 'image',
            }
        })
        .sort((first, second) =>
            `${first.slug}/${first.viewport}/${first.sourcePath}`.localeCompare(
                `${second.slug}/${second.viewport}/${second.sourcePath}`,
                undefined,
                { numeric: true }
            )
        )
}

async function syncPublicFallback(preparedMedia) {
    const slugs = new Set(preparedMedia.map((media) => media.slug))

    for (const slug of slugs) {
        await removePublicGalleryMedia(path.join(publicProjectsRoot, slug, 'gallery'))
    }

    for (const media of preparedMedia) {
        const destination = path.join(
            publicProjectsRoot,
            media.slug,
            'gallery',
            media.viewport,
            path.basename(media.uploadPath)
        )

        await mkdir(path.dirname(destination), { recursive: true })
        await copyFile(media.uploadPath, destination)
    }
}

async function removePublicGalleryMedia(directory) {
    const files = await walk(directory)

    await Promise.all(files.filter(isSupportedMedia).map((file) => rm(file)))
}

async function prepareMedia(media) {
    if (media.type === 'image') {
        return {
            ...media,
            uploadPath: media.sourcePath,
            contentType: getContentType(media.sourcePath),
        }
    }

    const sourceMetadata = await getMediaMetadata(media.sourcePath)
    const outputPath = path.join(
        outputProjectsRoot,
        media.slug,
        'gallery',
        media.viewport,
        `${path.basename(media.sourcePath, path.extname(media.sourcePath))}.mp4`
    )
    const maxWidth = media.viewport === 'mobile' ? 828 : 1920
    const crf = media.viewport === 'mobile' ? 26 : 25
    const browserSafeSource =
        path.extname(media.sourcePath).toLowerCase() === '.mp4' &&
        sourceMetadata.codec === 'h264' &&
        sourceMetadata.width <= maxWidth &&
        sourceMetadata.fps <= 30.5
    const alreadyOptimized =
        browserSafeSource &&
        sourceMetadata.bytes <= (media.viewport === 'mobile' ? 4_000_000 : 8_000_000)

    if (alreadyOptimized) {
        return {
            ...media,
            uploadPath: media.sourcePath,
            contentType: 'video/mp4',
        }
    }

    const reusableOutput = await isReusableOutput(media.sourcePath, outputPath)

    if (!reusableOutput) {
        await mkdir(path.dirname(outputPath), { recursive: true })
        await encodeVideo(media.sourcePath, outputPath, {
            crf,
            maxWidth,
            capFps: sourceMetadata.fps > 30.5,
        })
    }

    const outputMetadata = await getMediaMetadata(outputPath)
    const uploadPath =
        browserSafeSource && outputMetadata.bytes > sourceMetadata.bytes
            ? media.sourcePath
            : outputPath

    return {
        ...media,
        uploadPath,
        contentType: 'video/mp4',
    }
}

async function getContentHashedFileName(file) {
    const hash = createHash('sha256')
    const stream = createReadStream(file)

    for await (const chunk of stream) {
        hash.update(chunk)
    }

    const extension = path.extname(file)
    const baseName = path.basename(file, extension)
    const digest = hash.digest('hex').slice(0, 12)

    return `${baseName}.${digest}${extension}`
}

async function encodeVideo(input, output, { crf, maxWidth, capFps }) {
    const filters = [`scale=w='min(${maxWidth},iw)':h=-2:force_original_aspect_ratio=decrease`]

    if (capFps) {
        filters.push('fps=30')
    }

    await run('ffmpeg', [
        '-y',
        '-i',
        input,
        '-vf',
        filters.join(','),
        '-an',
        '-c:v',
        'libx264',
        '-preset',
        'slow',
        '-crf',
        String(crf),
        '-pix_fmt',
        'yuv420p',
        '-movflags',
        '+faststart',
        output,
    ])
}

async function getMediaMetadata(file) {
    const probe = await run('ffprobe', [
        '-v',
        'error',
        '-show_streams',
        '-show_format',
        '-of',
        'json',
        file,
    ])
    const payload = JSON.parse(probe)
    const stream = payload.streams?.find((item) => item.codec_type === 'video') ?? {}
    const info = await stat(file)

    return {
        width: Number(stream.width) || undefined,
        height: Number(stream.height) || undefined,
        duration: Number(payload.format?.duration) || undefined,
        bytes: info.size,
        codec: stream.codec_name,
        fps: parseFrameRate(stream.avg_frame_rate),
    }
}

async function isReusableOutput(source, output) {
    try {
        const [sourceInfo, outputInfo] = await Promise.all([stat(source), stat(output)])

        return outputInfo.mtimeMs >= sourceInfo.mtimeMs
    } catch (error) {
        if (error?.code === 'ENOENT') {
            return false
        }

        throw error
    }
}

function parseFrameRate(value) {
    if (!value || value === '0/0') return 0
    const [numerator, denominator] = value.split('/').map(Number)

    if (!denominator) {
        return numerator || 0
    }

    return numerator / denominator
}

async function ensureCommand(command) {
    await run(command, ['-version'])
}

async function loadLocalEnv() {
    for (const fileName of ['.env.local', '.env']) {
        const file = path.join(root, fileName)
        const text = await readFile(file, 'utf8').catch(() => '')

        for (const line of text.split(/\r?\n/)) {
            const trimmed = line.trim()

            if (!trimmed || trimmed.startsWith('#')) {
                continue
            }

            const separatorIndex = trimmed.indexOf('=')

            if (separatorIndex < 1) {
                continue
            }

            const key = trimmed.slice(0, separatorIndex).trim()
            const value = trimmed
                .slice(separatorIndex + 1)
                .trim()
                .replace(/^['"]|['"]$/g, '')

            process.env[key] ??= value
        }
    }
}

async function walk(directory) {
    try {
        const entries = await readdir(directory, { withFileTypes: true })
        const files = await Promise.all(
            entries.map(async (entry) => {
                const fullPath = path.join(directory, entry.name)

                if (entry.isDirectory()) {
                    return walk(fullPath)
                }

                return fullPath
            })
        )

        return files.flat()
    } catch (error) {
        if (error?.code === 'ENOENT') {
            return []
        }

        throw error
    }
}

async function readExistingManifest() {
    try {
        const text = await readFile(manifestPath, 'utf8')
        return JSON.parse(text)
    } catch (error) {
        if (error?.code === 'ENOENT') {
            return {}
        }

        throw error
    }
}

function tryGetHostname(url) {
    try {
        return new URL(url).hostname
    } catch {
        return null
    }
}

async function pathExists(file) {
    try {
        await stat(file)
        return true
    } catch (error) {
        if (error?.code === 'ENOENT') {
            return false
        }

        throw error
    }
}

async function run(command, commandArgs) {
    return new Promise((resolve, reject) => {
        const child = spawn(command, commandArgs, {
            cwd: root,
            stdio: ['ignore', 'pipe', 'pipe'],
        })
        let stdout = ''
        let stderr = ''

        child.stdout.on('data', (chunk) => {
            stdout += chunk
        })
        child.stderr.on('data', (chunk) => {
            stderr += chunk
        })
        child.on('close', (code) => {
            if (code === 0) {
                resolve(stdout)
                return
            }

            reject(new Error(`${command} ${commandArgs.join(' ')} failed:\n${stderr}`))
        })
    })
}

function isSupportedMedia(file) {
    const extension = path.extname(file).toLowerCase()

    return imageExtensions.has(extension) || videoExtensions.has(extension)
}

function getContentType(file) {
    const extension = path.extname(file).toLowerCase()

    if (extension === '.avif') return 'image/avif'
    if (extension === '.gif') return 'image/gif'
    if (extension === '.jpg' || extension === '.jpeg') return 'image/jpeg'
    if (extension === '.png') return 'image/png'
    if (extension === '.webp') return 'image/webp'
    if (extension === '.webm') return 'video/webm'
    if (extension === '.mov') return 'video/quicktime'
    return 'video/mp4'
}

function compareManifestEntries(first, second) {
    return `${first.viewport}/${first.src}`.localeCompare(
        `${second.viewport}/${second.src}`,
        undefined,
        {
            numeric: true,
        }
    )
}

function sortManifest(manifest) {
    return Object.fromEntries(
        Object.entries(manifest).sort(([first], [second]) => first.localeCompare(second))
    )
}

async function writeJson(file, value) {
    await mkdir(path.dirname(file), { recursive: true })
    const current = await readFile(file, 'utf8').catch(() => '')
    const next = `${JSON.stringify(value, null, 2)}\n`

    if (current !== next) {
        await writeFile(file, next)
    }
}
