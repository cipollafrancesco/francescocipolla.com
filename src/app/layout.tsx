import type { Metadata } from 'next'
import { ConsentedVercelAnalytics } from '@/components/ConsentedVercelAnalytics'
import { baseUrl, siteLinks, siteTitle } from '@/content/site'
import { defaultLocale } from '@/i18n/config'
import { inter } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
    title: siteTitle,
    description:
        'Digital product partner e ingegnere informatico: prodotti web, streaming, design e sistemi digitali.',
    metadataBase: new URL(baseUrl),
}

// `@id`/`url` are deliberately pinned to the production domain rather than
// `baseUrl` — this identifies the Person/WebSite entity itself, which doesn't
// change across preview deploys, unlike page-level canonical URLs.
const personJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Person',
            '@id': 'https://francescocipolla.com/#person',
            name: 'Francesco Cipolla',
            url: 'https://francescocipolla.com',
            jobTitle: 'Senior Frontend Engineer',
            sameAs: [siteLinks.linkedin, siteLinks.github],
        },
        {
            '@type': 'WebSite',
            '@id': 'https://francescocipolla.com/#website',
            url: 'https://francescocipolla.com',
            name: 'Francesco Cipolla',
            author: { '@id': 'https://francescocipolla.com/#person' },
        },
    ],
}

// The root layout can't know `lang` itself — it wraps every route including
// the statically generated `[lang]` pages, and a parent layout never receives
// a child segment's params. Reading it from `headers()` instead would work,
// but a dynamic API in the root layout forces the *entire* site out of static
// generation: every locale page would move from a prebuilt, CDN-served
// response to a per-request server render. So this renders the default, and
// `HtmlLangSync` (in `[lang]/layout.tsx`, which does have `lang`) corrects the
// attribute client-side — see that component for why it also needs to run on
// every navigation, not just once.
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang={defaultLocale}>
            <body className={`${inter.className} antialiased`}>
                {/* JSON-LD structured data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
                />
                {/* Scroll progress indicator — U5 */}
                <div id="scroll-progress" aria-hidden="true" />
                {children}
                <ConsentedVercelAnalytics />
            </body>
        </html>
    )
}
