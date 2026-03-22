import { ImageResponse } from 'next/og'
import { getProject } from '@/lib/projects'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const project = getProject(slug)

    const title = project?.title ?? 'Project'
    const tech = project?.technologies.slice(0, 3).join(' · ') ?? ''
    const role = project?.role ?? 'Freelance Frontend Engineer'

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
                francescocipolla.com / projects
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
                    {role}
                </span>
                <h1
                    style={{
                        fontSize: 96,
                        fontWeight: 900,
                        letterSpacing: '-0.04em',
                        lineHeight: 1,
                        color: '#000',
                        margin: 0,
                    }}
                >
                    {title}
                </h1>
                {tech && <p style={{ fontSize: 24, color: '#4b5563', margin: 0 }}>{tech}</p>}
            </div>
            <span style={{ fontSize: 22, fontWeight: 700, color: '#000' }}>cipo.</span>
        </div>,
        { ...size }
    )
}
