'use client'

import i18next from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { useMemo, type ReactNode } from 'react'
import type { Locale } from './config'
import { siteContent } from '@/content/site'

interface I18nProviderProps {
    lang: Locale
    children: ReactNode
}

export function I18nProvider({ lang, children }: I18nProviderProps) {
    const instance = useMemo(() => {
        const i18n = i18next.createInstance()

        i18n.use(initReactI18next).init({
            lng: lang,
            fallbackLng: 'it',
            resources: {
                it: { translation: siteContent.it.common },
                en: { translation: siteContent.en.common },
            },
            interpolation: { escapeValue: false },
        })

        return i18n
    }, [lang])

    return <I18nextProvider i18n={instance}>{children}</I18nextProvider>
}
