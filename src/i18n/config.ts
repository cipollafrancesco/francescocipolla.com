export const locales = ['it', 'en'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'it'
export const localeCookieName = 'NEXT_LOCALE'

/** Endonyms — each language in its own name, so they never need translating. */
export const localeNames: Record<Locale, string> = {
    it: 'Italiano',
    en: 'English',
}

export function isLocale(value: string | undefined): value is Locale {
    return !!value && locales.includes(value as Locale)
}

export function getLocale(value: string | undefined): Locale {
    return isLocale(value) ? value : defaultLocale
}

export function getOppositeLocale(locale: Locale): Locale {
    return locale === 'it' ? 'en' : 'it'
}
