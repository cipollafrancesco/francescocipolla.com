import './globals.css'
import type { Metadata } from 'next'
import {Inter} from 'next/font/google'
import Link from 'next/link'
import Header from '@/components/Header'

const inter = Inter({subsets: ['latin'], weight: ['400', '500', '700', '900']})

export const metadata: Metadata = {
    title: 'Francesco Cipolla - Senior Frontend Engineer',
    description: 'Currently working in the Sport Streaming Industry | ISAAC Co-Founder | Passionate Product Contributor | Design Enthusiast',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={`${inter.className}`}>
        <Header/>
        {children}
        <footer className="bg-white border-t border-gray-100 py-12">
            <div className="max-w-screen-2xl mx-auto px-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div>
                        <span className="font-extrabold text-2xl">cipo.</span>
                        <p className="text-gray-500 text-sm mt-1">Senior Frontend Engineer &amp; Freelancer</p>
                    </div>
                    <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm lowercase">
                        <Link href="/#about-me" className="hover:underline underline-offset-2">About</Link>
                        <Link href="/#experiences" className="hover:underline underline-offset-2">Experiences</Link>
                        <Link href="/#projects" className="hover:underline underline-offset-2">Projects</Link>
                        <Link href="/blog" className="hover:underline underline-offset-2">Blog</Link>
                        <Link href="/#contacts" className="hover:underline underline-offset-2">Contacts</Link>
                    </nav>
                    <div className="flex gap-6 text-sm">
                        <a
                            href="https://www.linkedin.com/in/francesco-cipolla-41768411b"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline underline-offset-2"
                            aria-label="LinkedIn"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="https://github.com/cipollafrancesco"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline underline-offset-2"
                            aria-label="GitHub"
                        >
                            GitHub
                        </a>
                        <a
                            href="mailto:info@francescocipolla.com"
                            className="hover:underline underline-offset-2"
                            aria-label="Email"
                        >
                            Email
                        </a>
                    </div>
                </div>
                <p className="text-xs text-gray-400 mt-10">
                    &copy; {new Date().getFullYear()} Francesco Cipolla. All rights reserved.
                </p>
            </div>
        </footer>
        </body>
        </html>
    )
}

