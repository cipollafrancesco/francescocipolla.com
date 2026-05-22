import i18next from 'i18next'
import { defaultLocale, getLocale, type Locale } from './config'
import { siteContent } from '@/content/site'

let initialized = false

export async function initI18n(locale: Locale) {
    if (!initialized) {
        await i18next.init({
            lng: locale,
            fallbackLng: defaultLocale,
            resources: {
                it: { translation: siteContent.it.common },
                en: { translation: siteContent.en.common },
            },
            interpolation: { escapeValue: false },
        })
        initialized = true
    } else {
        await i18next.changeLanguage(locale)
    }

    return i18next
}

export async function getI18nContent(locale: string | undefined) {
    const lang = getLocale(locale)
    await initI18n(lang)

    return {
        lang,
        content: siteContent[lang],
    }
}
