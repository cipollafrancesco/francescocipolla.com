import { MetadataRoute } from 'next'
import { getProjectSlugs } from '@/lib/projects'
import { routing } from '@/i18n/routing'

const BASE_URL = 'https://francescocipolla.com'

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date()
    const locales = routing.locales

    const staticRoutes = ['', '/services', '/about', '/blog']
    const projectRoutes = getProjectSlugs().map((slug) => `/projects/${slug}`)
    const allRoutes = [...staticRoutes, ...projectRoutes]

    return locales.flatMap((locale) =>
        allRoutes.map((route) => ({
            url: `${BASE_URL}/${locale}${route}`,
            lastModified: now,
            changeFrequency: route === '/blog' ? ('weekly' as const) : ('monthly' as const),
            priority: route === '' ? 1 : route === '/services' ? 0.9 : 0.7,
        }))
    )
}
