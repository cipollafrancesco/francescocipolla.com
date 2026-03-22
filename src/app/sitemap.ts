import { MetadataRoute } from 'next'
import { getProjectSlugs } from '@/lib/projects'

const BASE_URL = 'https://francescocipolla.com'

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date()
    const projectRoutes = getProjectSlugs().map((slug) => ({
        url: `${BASE_URL}/projects/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    return [
        { url: BASE_URL, lastModified: now, changeFrequency: 'monthly', priority: 1 },
        {
            url: `${BASE_URL}/services`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
        ...projectRoutes,
    ]
}
