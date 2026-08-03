import { MetadataRoute } from 'next'
import { absoluteLocalizedUrl, getProjectSlugs } from '@/content/site'
import { locales } from '@/i18n/config'

// `/about` is intentionally absent — it redirects to the locale root.
// `/blog` likewise: the route still renders, but its only post is a
// placeholder, so it is unlisted here and in the footer nav until there's
// something worth indexing. Re-add it in both places together.
const staticRoutes = ['', '/services', '/projects', '/books', '/contacts']

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date()

    return locales.flatMap((locale) => {
        const projectRoutes = getProjectSlugs(locale).map((slug) => ({
            url: absoluteLocalizedUrl(locale, `/projects/${slug}`),
            lastModified: now,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }))

        return [
            ...staticRoutes.map((route) => ({
                url: absoluteLocalizedUrl(locale, route),
                lastModified: now,
                changeFrequency: 'monthly' as const,
                priority: route === '' ? 1 : route === '/services' ? 0.9 : 0.75,
            })),
            ...projectRoutes,
        ]
    })
}
