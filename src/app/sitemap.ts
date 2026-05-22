import { MetadataRoute } from 'next'
import { absoluteLocalizedUrl, getProjectSlugs } from '@/content/site'
import { locales } from '@/i18n/config'

const staticRoutes = ['', '/services', '/about', '/projects', '/contacts', '/blog']

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
                changeFrequency: route === '/blog' ? ('weekly' as const) : ('monthly' as const),
                priority: route === '' ? 1 : route === '/services' ? 0.9 : 0.75,
            })),
            ...projectRoutes,
        ]
    })
}
