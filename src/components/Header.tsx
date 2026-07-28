'use client'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import type { SiteContent } from '@/content/site'
import type { Locale } from '@/i18n/config'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface HeaderProps {
    lang: Locale
    copy: SiteContent['common']
}

const BrandLogo = () => <span className="text-2xl font-extrabold">cipo.</span>

const Header = ({ lang, copy }: HeaderProps) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const reduceMotion = useReducedMotion()

    const menuItems = [
        { href: `/${lang}/#about-me`, label: copy.nav.about },
        { href: `/${lang}/projects`, label: copy.nav.projects },
        { href: `/${lang}/books`, label: copy.nav.books },
        { href: `/${lang}/services`, label: copy.nav.services },
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

    const iconSpring = { type: 'spring', duration: 0.3, bounce: 0 } as const
    const ease = [0.2, 0, 0, 1] as const

    return (
        <header className="sticky left-0 right-0 top-0 z-50 md:fixed">
            {/* Desktop nav */}
            <nav className="mx-auto hidden max-w-screen-2xl px-8 py-6 lg:block">
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
                        <LanguageSwitcher
                            currentLocale={lang}
                            label={copy.nav.switchLanguage}
                            className="ml-1"
                        />
                    </div>
                </div>
            </nav>

            {/* Mobile hamburger button */}
            <div className="flex w-full items-center justify-between bg-white px-8 py-4 lg:hidden">
                <Link href={`/${lang}`} aria-label="Home">
                    <BrandLogo />
                </Link>
                <button
                    onClick={toggleDrawer}
                    aria-label={isDrawerOpen ? copy.nav.closeMenu : copy.nav.openMenu}
                    className="-m-1 p-1"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            key={isDrawerOpen ? 'close' : 'menu'}
                            initial={
                                reduceMotion
                                    ? false
                                    : { opacity: 0, scale: 0.25, filter: 'blur(4px)' }
                            }
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            exit={
                                reduceMotion
                                    ? { opacity: 1 }
                                    : { opacity: 0, scale: 0.25, filter: 'blur(4px)' }
                            }
                            transition={reduceMotion ? { duration: 0 } : iconSpring}
                            style={{ display: 'flex' }}
                        >
                            {isDrawerOpen ? (
                                <X width={40} height={40} />
                            ) : (
                                <Menu width={40} height={40} />
                            )}
                        </motion.span>
                    </AnimatePresence>
                </button>
            </div>

            {/* Mobile drawer overlay */}
            <AnimatePresence>
                {isDrawerOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-95 backdrop-blur-md"
                        initial={{ opacity: reduceMotion ? 1 : 0 }}
                        animate={{ opacity: 1 }}
                        exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                        transition={{ duration: reduceMotion ? 0 : 0.2, ease }}
                    >
                        <button
                            onClick={toggleDrawer}
                            className="absolute right-8 top-4 -m-1 p-1 text-black"
                            aria-label={copy.nav.closeMenu}
                        >
                            <X width={40} height={40} />
                        </button>
                        {menuItems.map((item, index) => (
                            <motion.div
                                key={item.href}
                                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: reduceMotion ? 0 : 0.25,
                                    delay: reduceMotion ? 0 : 0.05 + index * 0.08,
                                    ease,
                                }}
                            >
                                <Link
                                    href={item.href}
                                    className="mb-6 block text-3xl font-semibold lowercase tracking-tighter text-black underline-offset-4 hover:underline"
                                    onClick={toggleDrawer}
                                >
                                    {item.label}
                                </Link>
                            </motion.div>
                        ))}
                        <motion.div
                            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: reduceMotion ? 0 : 0.25,
                                delay: reduceMotion ? 0 : 0.05 + menuItems.length * 0.08,
                                ease,
                            }}
                        >
                            <LanguageSwitcher
                                currentLocale={lang}
                                label={copy.nav.switchLanguage}
                                className="mt-4"
                                placement="top"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

export default Header
