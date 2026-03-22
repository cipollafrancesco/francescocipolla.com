'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const menuItems = [
    { href: '/#about-me', label: 'About Me' },
    { href: '/#experiences', label: 'Experiences' },
    { href: '/#projects', label: 'Projects' },
    { href: '/services', label: 'Services' },
    { href: '/#contacts', label: 'Contacts' },
]

const BrandLogo = () => <span className="text-2xl font-extrabold">cipo.</span>

const Header = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const toggleDrawer = () => {
        setIsDrawerOpen((prev) => !prev)
    }

    useEffect(() => {
        if (isDrawerOpen) {
            document.body.classList.add('overflow-hidden')
        } else {
            document.body.classList.remove('overflow-hidden')
        }
        return () => {
            document.body.classList.remove('overflow-hidden')
        }
    }, [isDrawerOpen])

    return (
        <header className="relative left-0 right-0 top-0 z-50 md:fixed">
            {/* Desktop nav */}
            <nav className="mx-auto hidden max-w-screen-2xl bg-white/80 px-8 py-8 backdrop-blur-sm lg:block lg:bg-transparent lg:backdrop-blur-none">
                <div className="flex items-center justify-center lg:justify-end">
                    <BrandLogo />
                    <div className="ml-auto flex items-center space-x-4 lowercase">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-black underline-offset-2 hover:underline lg:text-lg"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <a
                            href="/resume.pdf"
                            download
                            className="rounded border border-black px-3 py-1 text-black transition-colors duration-200 hover:bg-black hover:text-white lg:text-lg"
                            aria-label="Download resume PDF"
                        >
                            résumé
                        </a>
                    </div>
                </div>
            </nav>

            {/* Mobile hamburger button */}
            <div className="flex w-full items-center justify-between px-8 py-8 lg:hidden">
                <BrandLogo />
                <button onClick={toggleDrawer} aria-label="Open menu">
                    <Menu width={40} height={40} />
                </button>
            </div>

            {/* Mobile drawer overlay */}
            {isDrawerOpen && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-95 backdrop-blur-md">
                    <button
                        onClick={toggleDrawer}
                        className="absolute right-8 top-8 text-black"
                        aria-label="Close menu"
                    >
                        <X width={40} height={40} />
                    </button>
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="mb-6 text-3xl font-semibold lowercase tracking-tighter text-black underline-offset-4 hover:underline"
                            onClick={toggleDrawer}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    )
}

export default Header
