import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700', '900'] })

export const metadata: Metadata = {
    title: 'Francesco Cipolla - Senior Frontend Engineer',
    description:
        'Currently working in the Sport Streaming Industry | ISAAC Co-Founder | Passionate Product Contributor | Design Enthusiast',
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
        <html lang="en">
            <body className={`${inter.className}`}>
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
                <Header />
                {children}
                <footer className="border-t border-gray-100 bg-white py-12">
                    <div className="mx-auto max-w-screen-2xl px-8">
                        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                            <div>
                                <span className="text-2xl font-extrabold">cipo.</span>
                                <p className="mt-1 text-sm text-gray-500">
                                    Senior Frontend Engineer &amp; Freelancer
                                </p>
                            </div>
                            <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm lowercase">
                                <Link
                                    href="/#about-me"
                                    className="underline-offset-2 hover:underline"
                                >
                                    About
                                </Link>
                                <Link
                                    href="/#experiences"
                                    className="underline-offset-2 hover:underline"
                                >
                                    Experiences
                                </Link>
                                <Link
                                    href="/#projects"
                                    className="underline-offset-2 hover:underline"
                                >
                                    Projects
                                </Link>
                                <Link href="/blog" className="underline-offset-2 hover:underline">
                                    Blog
                                </Link>
                                <Link
                                    href="/#contacts"
                                    className="underline-offset-2 hover:underline"
                                >
                                    Contacts
                                </Link>
                            </nav>
                            <div className="flex gap-6 text-sm">
                                <a
                                    href="https://www.linkedin.com/in/francesco-cipolla-41768411b"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline-offset-2 hover:underline"
                                    aria-label="LinkedIn"
                                >
                                    LinkedIn
                                </a>
                                <a
                                    href="https://github.com/cipollafrancesco"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline-offset-2 hover:underline"
                                    aria-label="GitHub"
                                >
                                    GitHub
                                </a>
                                <a
                                    href="mailto:info@francescocipolla.com"
                                    className="underline-offset-2 hover:underline"
                                    aria-label="Email"
                                >
                                    Email
                                </a>
                            </div>
                        </div>
                        <p className="mt-10 text-xs text-gray-400">
                            &copy; {new Date().getFullYear()} Francesco Cipolla. All rights
                            reserved.
                        </p>
                    </div>
                </footer>
            </body>
        </html>
    )
}
