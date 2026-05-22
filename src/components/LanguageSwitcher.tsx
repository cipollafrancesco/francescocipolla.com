'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { localeCookieName, locales, type Locale } from '@/i18n/config'
import { trackEvent } from '@/lib/analytics'
import { cn } from '@/lib/utils'

function switchPath(pathname: string, nextLocale: Locale) {
    const parts = pathname.split('/')
    const currentLocale = parts[1]

    if (locales.includes(currentLocale as Locale)) {
        parts[1] = nextLocale
        return parts.join('/') || `/${nextLocale}`
    }

    return `/${nextLocale}${pathname === '/' ? '' : pathname}`
}

export function LanguageSwitcher({
    currentLocale,
    label,
    className,
}: {
    currentLocale: Locale
    label: string
    className?: string
}) {
    const pathname = usePathname()

    return (
        <div className={cn('flex items-center gap-1', className)} aria-label={label}>
            {locales.map((locale) => (
                <Link
                    key={locale}
                    href={switchPath(pathname, locale)}
                    hrefLang={locale}
                    onClick={() => {
                        document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`
                        trackEvent('language_switch', {
                            from: currentLocale,
                            to: locale,
                        })
                    }}
                    className={cn(
                        'rounded px-2 py-1 text-xs font-semibold uppercase tracking-wide transition-colors',
                        locale === currentLocale
                            ? 'bg-black text-white'
                            : 'text-gray-500 hover:bg-gray-100 hover:text-black'
                    )}
                    aria-current={locale === currentLocale ? 'true' : undefined}
                >
                    {locale}
                </Link>
            ))}
        </div>
    )
}
