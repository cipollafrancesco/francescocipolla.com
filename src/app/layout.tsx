import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700', '900'] })

export const metadata: Metadata = {
    title: 'Francesco Cipolla - Digital Product Partner',
    description:
        'Siti web, applicazioni e digitalizzazione per aziende. Digital product partner per trasformare idee, processi e presenza online in strumenti concreti.',
    metadataBase: new URL('https://francescocipolla.com'),
}

const personJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Person',
            '@id': 'https://francescocipolla.com/#person',
            name: 'Francesco Cipolla',
            url: 'https://francescocipolla.com',
            jobTitle: 'Senior Frontend Engineer',
            sameAs: [
                'https://www.linkedin.com/in/francesco-cipolla-41768411b',
                'https://github.com/cipollafrancesco',
            ],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="it">
            <body className={`${inter.className} antialiased`}>
                {/* JSON-LD structured data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
                />
                {/* Scroll progress indicator — U5 */}
                <div id="scroll-progress" aria-hidden="true" />
                {/* Skip to content — A2 */}
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-black focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
                >
                    Skip to content
                </a>
                {children}
                <Analytics />
            </body>
        </html>
    )
}
