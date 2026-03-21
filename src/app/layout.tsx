import './globals.css'
import type { Metadata } from 'next'
import {Inter} from 'next/font/google'
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
        <footer className="bg-white py-8">
            <div className="mx-auto px-4 text-center">
                <p className="text-xs">&copy; {new Date().getFullYear()} Francesco Cipolla. All rights reserved.</p>
            </div>
        </footer>
        </body>
        </html>
    )
}

