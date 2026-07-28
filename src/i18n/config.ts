export const locales = ['it', 'en'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'it'
export const localeCookieName = 'NEXT_LOCALE'
/** Set by the middleware so renders without route params — `not-found.tsx` — can
 *  still resolve the locale. */
export const localeHeaderName = 'x-locale'

/** Endonyms — each language in its own name, so they never need translating.
 *  Used as the accessible name; the UI shows `localeShortNames` instead. */
export const localeNames: Record<Locale, string> = {
    it: 'Italiano',
    en: 'English',
}

/** What the language switcher actually renders — short, symmetric, and the same
 *  in every language, so the control never changes width when the locale does. */
export const localeShortNames: Record<Locale, string> = {
    it: 'IT',
    en: 'EN',
}

export function isLocale(value: string | undefined): value is Locale {
    return !!value && locales.includes(value as Locale)
}

export function getLocale(value: string | undefined): Locale {
    return isLocale(value) ? value : defaultLocale
}

/** Middleware guarantees a locale prefix, so the first path segment is the locale.
 *  Needed by `not-found.tsx` and `error.tsx`, which never receive route params. */
export function localeFromPathname(pathname: string): Locale {
    return getLocale(pathname.split('/')[1])
}

export function getOppositeLocale(locale: Locale): Locale {
    return locale === 'it' ? 'en' : 'it'
}
