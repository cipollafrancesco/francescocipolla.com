'use client'
import React from 'react'
import {Link, usePathname} from '@/i18n/navigation'
import {useTranslations, useLocale} from 'next-intl'

const Header: React.FC = () => {
    const t = useTranslations('common.nav')
    const locale = useLocale()
    const pathname = usePathname()

    const menuItems = [
        {href: '/about', label: t('about')},
        {href: '/#experiences', label: t('experiences')},
        {href: '/#projects', label: t('projects')},
        {href: '/#contacts', label: t('contacts')}
    ]

    return (
        <header className="static md:fixed top-0 left-0 right-0 z-50">
            <nav
                className="hidden lg:block max-w-screen-2xl mx-auto px-8 py-8 bg-white/80 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none">
                <div className="flex justify-center items-center lg:justify-end">
                    <Link href="/" className="font-extrabold text-2xl mr-auto">cipo.</Link>
                    <div className="flex space-x-6 items-center lowercase">
                        {menuItems.map(item => (
                            <Link key={item.href} href={item.href}
                                  className="lg:text-lg text-black hover:underline underline-offset-2">
                                {item.label}
                            </Link>
                        ))}
                        
                        <div className="flex items-center space-x-2 border-l pl-6 border-gray-200 ml-4">
                            <Link 
                                href={pathname} 
                                locale="en"
                                className={`text-sm ${locale === 'en' ? 'font-bold underline' : 'text-gray-500'}`}
                            >
                                EN
                            </Link>
                            <span className="text-gray-300">/</span>
                            <Link 
                                href={pathname} 
                                locale="it"
                                className={`text-sm ${locale === 'it' ? 'font-bold underline' : 'text-gray-500'}`}
                            >
                                IT
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
