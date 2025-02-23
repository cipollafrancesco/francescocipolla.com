import './globals.css'
import {Inter} from 'next/font/google'
import Link from 'next/link'
import {Github, Linkedin, Mail} from 'lucide-react'

const inter = Inter({subsets: ['latin'], weight: ['400', '500', '700', '900']})

export const metadata = {
    title: 'Francesco Cipolla - Portfolio',
    description: 'Senior Frontend Engineer specializing in React and Next.js',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        {/*<header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
            <nav className="container mx-auto px-8 py-8">
                <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                        <Link href="/" className="text-black hover:text-gray-600">Home</Link>
                        <Link href="/about" className="text-black hover:text-gray-600">About</Link>
                        <Link href="/blog" className="text-black hover:text-gray-600">Blog</Link>
                    </div>
                    <div className="flex space-x-4">
                        <Link href="https://github.com/cipollafrancesco" className="text-black hover:text-gray-600">
                            <Github className="h-6 w-6"/>
                        </Link>
                        <Link href="https://www.linkedin.com/in/francesco-cipolla-41768411b"
                              className="text-black hover:text-gray-600">
                            <Linkedin className="h-6 w-6"/>
                        </Link>
                        <Link href="mailto:francescocpll@gmail.com" className="text-black hover:text-gray-600">
                            <Mail className="h-6 w-6"/>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>*/}
        {children}
        <footer className="bg-white py-8">
            <div className="container mx-auto px-4 text-center">
                <p className="text-xs">&copy; {new Date().getFullYear()} Francesco Cipolla. All rights reserved.</p>
            </div>
        </footer>
        </body>
        </html>
    )
}

