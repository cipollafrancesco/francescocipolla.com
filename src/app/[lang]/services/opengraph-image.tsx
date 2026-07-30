import { ImageResponse } from 'next/og'
import { siteContent } from '@/content/site'
import { getLocale } from '@/i18n/config'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
    const { lang: langParam } = await params
    const lang = getLocale(langParam)
    const { hero } = siteContent[lang].services

    return new ImageResponse(
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%',
                height: '100%',
                background: '#fff',
                padding: '72px 80px',
                fontFamily: 'sans-serif',
            }}
        >
            <span
                style={{
                    fontSize: 24,
                    color: '#9ca3af',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                }}
            >
                francescocipolla.com
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <span
                    style={{
                        fontSize: 14,
                        color: '#6b7280',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                    }}
                >
                    {hero.eyebrow}
                </span>
                <h1
                    style={{
                        fontSize: 60,
                        fontWeight: 900,
                        letterSpacing: '-0.03em',
                        lineHeight: 1.1,
                        color: '#000',
                        margin: 0,
                        maxWidth: 980,
                    }}
                >
                    {hero.title}
                </h1>
                <p style={{ fontSize: 24, color: '#4b5563', margin: 0, maxWidth: 800 }}>
                    {hero.lead}
                </p>
            </div>
            <span style={{ fontSize: 22, fontWeight: 700, color: '#000' }}>cipo.</span>
        </div>,
        { ...size }
    )
}
