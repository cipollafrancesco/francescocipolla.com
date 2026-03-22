'use client'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { useParams } from 'next/navigation'

const localeLabels: Record<string, string> = {
    en: 'EN',
    it: 'IT',
    es: 'ES',
    fr: 'FR',
}

export default function LanguageSwitcher() {
    const router = useRouter()
    const pathname = usePathname()
    const params = useParams()
    const currentLocale = (params.locale as string) ?? 'en'

    const handleSwitch = (locale: string) => {
        router.replace(pathname, { locale })
    }

    return (
        <div className="flex items-center gap-1 text-sm">
            {routing.locales.map((locale, i) => (
                <span key={locale} className="flex items-center">
                    <button
                        onClick={() => handleSwitch(locale)}
                        className={`px-1 transition-opacity ${
                            locale === currentLocale
                                ? 'font-bold opacity-100'
                                : 'opacity-40 hover:opacity-70'
                        }`}
                        aria-label={`Switch to ${locale.toUpperCase()}`}
                    >
                        {localeLabels[locale]}
                    </button>
                    {i < routing.locales.length - 1 && (
                        <span className="select-none opacity-20">|</span>
                    )}
                </span>
            ))}
        </div>
    )
}
