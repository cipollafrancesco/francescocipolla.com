import type { Metadata } from 'next'
import { absoluteLocalizedUrl, baseUrl } from '@/content/site'
import type { Locale } from '@/i18n/config'

/** The site-wide social card, served by `app/opengraph-image.tsx`.
 *
 *  Named here rather than left to the file convention, because the convention
 *  does not survive this app's shape: declaring an `openGraph` block — which
 *  every page routed through this helper does — drops the image an *ancestor*
 *  segment's `opengraph-image.tsx` would otherwise contribute. Only a file
 *  sitting in the page's own segment still applies. Left implicit, that
 *  silently stripped `og:image` from every route except `/services` (own file)
 *  and the project pages (which pass `images` themselves), so shared links
 *  rendered with no preview card at all. */
const defaultOgImages = [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }]

export function withLocaleMetadata(metadata: Metadata, locale: Locale, path = ''): Metadata {
    const title = metadata.title
    const description = metadata.description
    const url = absoluteLocalizedUrl(locale, path)
    const titleText = typeof title === 'string' ? title : undefined
    const descriptionText = typeof description === 'string' ? description : undefined
    // A caller's own images win; `defaultOgImages` is only the floor. Resolved
    // once and reused for the Twitter card so the two can't describe different
    // pictures of the same page.
    const images = metadata.openGraph?.images ?? defaultOgImages

    return {
        ...metadata,
        metadataBase: new URL(baseUrl),
        title,
        description,
        openGraph: {
            title: titleText,
            description: descriptionText,
            url,
            locale: locale === 'it' ? 'it_IT' : 'en_US',
            alternateLocale: locale === 'it' ? ['en_US'] : ['it_IT'],
            ...(metadata.openGraph ?? {}),
            images,
        },
        twitter: {
            card: 'summary_large_image',
            title: titleText,
            description: descriptionText,
            images,
            ...(metadata.twitter ?? {}),
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
