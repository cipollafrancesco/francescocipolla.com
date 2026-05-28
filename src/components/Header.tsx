'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import type { SiteContent } from '@/content/site'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

interface HeaderProps {
    lang: Locale
    copy: SiteContent['common']
}

const BrandLogo = () => <span className="text-2xl font-extrabold">cipo.</span>

const Header = ({ lang, copy }: HeaderProps) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const menuItems = [
        { href: `/${lang}/about`, label: copy.nav.about },
        { href: `/${lang}/projects`, label: copy.nav.projects },
        { href: `/${lang}/blog`, label: 'blog' },
        { href: `/${lang}/contacts`, label: copy.nav.contacts },
    ]

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
            <nav className="mx-auto hidden max-w-screen-2xl bg-white/85 px-8 py-6 backdrop-blur-sm lg:block">
                <div className="flex items-center justify-center lg:justify-end">
                    <Link href={`/${lang}`} aria-label="Home">
                        <BrandLogo />
                    </Link>
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
                            aria-label={copy.nav.resume}
                        >
                            {copy.nav.resume}
                        </a>
                        <Link
                            href={`/${lang}/#booking`}
                            className="rounded bg-black px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-800 lg:text-base"
                        >
                            {copy.nav.bookCall}
                        </Link>
                        <LanguageSwitcher
                            currentLocale={lang}
                            label={copy.nav.switchLanguage}
                            className="ml-1"
                        />
                    </div>
                </div>
            </nav>

            {/* Mobile hamburger button */}
            <div className="flex w-full items-center justify-between bg-white/85 px-8 py-6 backdrop-blur-sm lg:hidden">
                <Link href={`/${lang}`} aria-label="Home">
                    <BrandLogo />
                </Link>
                <button onClick={toggleDrawer} aria-label={copy.nav.openMenu}>
                    <Menu width={40} height={40} />
                </button>
            </div>

            {/* Mobile drawer overlay */}
            {isDrawerOpen && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-95 backdrop-blur-md">
                    <button
                        onClick={toggleDrawer}
                        className="absolute right-8 top-8 text-black"
                        aria-label={copy.nav.closeMenu}
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
                    <Link
                        href={`/${lang}/#booking`}
                        className="mt-2 rounded bg-black px-5 py-3 text-base font-semibold text-white"
                        onClick={toggleDrawer}
                    >
                        {copy.nav.bookCall}
                    </Link>
                    <LanguageSwitcher
                        currentLocale={lang}
                        label={copy.nav.switchLanguage}
                        className="mt-8"
                    />
                </div>
            )}
        </header>
    )
}

export default Header
