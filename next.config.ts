import type { NextConfig } from 'next'
import { existsSync, readFileSync } from 'fs'

const blobHostsPath = new URL('./src/content/blob-hosts.generated.json', import.meta.url)

function getBlobImageRemotePatterns() {
    if (!existsSync(blobHostsPath)) {
        return []
    }

    let hosts: string[]

    try {
        hosts = JSON.parse(readFileSync(blobHostsPath, 'utf8'))
    } catch (error) {
        throw new Error(
            `Failed to parse ${blobHostsPath} — run \`pnpm gallery:sync\` to regenerate it, or check it for corruption.`,
            { cause: error }
        )
    }

    return hosts.map((hostname) => ({
        protocol: 'https' as const,
        hostname,
    }))
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
