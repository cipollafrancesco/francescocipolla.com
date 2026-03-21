import { MetadataRoute } from 'next'

const BASE_URL = 'https://francescocipolla.com'

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date()
    return [
        {url: BASE_URL, lastModified: now, changeFrequency: 'monthly', priority: 1},
        {url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8},
        {url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7},
    ]
}
