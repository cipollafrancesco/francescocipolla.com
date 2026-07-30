import type { NextConfig } from 'next'
import { readFileSync } from 'fs'

/** The gallery manifest already stores absolute Blob URLs, so the set of hosts
 *  `next/image` must allow is a projection of it rather than something that
 *  needs generating and committing separately — which could go stale against
 *  the manifest and break remote images at build time. */
function getBlobImageRemotePatterns() {
    const manifestPath = new URL('./src/content/project-gallery.generated.json', import.meta.url)

    let manifest: Record<string, { src: string }[]>

    try {
        manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
    } catch (error) {
        // Raised from inside the Next config, which is a bad place to debug a bare
        // ENOENT/SyntaxError from — say which file and how to regenerate it.
        throw new Error(
            `Failed to read ${manifestPath} — run \`pnpm gallery:sync\` to regenerate it, or check it for corruption.`,
            { cause: error }
        )
    }

    const hosts = new Set(
        Object.values(manifest)
            .flat()
            .map((media) => media.src)
            .filter((src) => src.startsWith('https://'))
            .map((src) => new URL(src).hostname)
    )

    return [...hosts].map((hostname) => ({ protocol: 'https' as const, hostname }))
}

const securityHeaders = [
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

const nextConfig: NextConfig = {
    poweredByHeader: false,
    experimental: {
        globalNotFound: true,
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: getBlobImageRemotePatterns(),
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: securityHeaders,
            },
        ]
    },
}

export default nextConfig
