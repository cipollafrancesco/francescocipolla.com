import type { Metadata } from 'next'
import { absoluteLocalizedUrl, baseUrl } from '@/content/site'
import type { Locale } from '@/i18n/config'

export function withLocaleMetadata(metadata: Metadata, locale: Locale, path = ''): Metadata {
    const title = metadata.title
    const description = metadata.description
    const url = absoluteLocalizedUrl(locale, path)

    return {
        ...metadata,
        metadataBase: new URL(baseUrl),
        title,
        description,
        openGraph: {
            title: typeof title === 'string' ? title : undefined,
            description: typeof description === 'string' ? description : undefined,
            url,
            locale: locale === 'it' ? 'it_IT' : 'en_US',
            alternateLocale: locale === 'it' ? ['en_US'] : ['it_IT'],
            ...(metadata.openGraph ?? {}),
        },
        alternates: {
            canonical: url,
            languages: {
                it: absoluteLocalizedUrl('it', path),
                en: absoluteLocalizedUrl('en', path),
                'x-default': absoluteLocalizedUrl('it', path),
            },
        },
    }
}
