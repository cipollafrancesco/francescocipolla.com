import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HomeClient from '../HomeClient'
import { getI18nContent } from '@/i18n/server'
import { isLocale } from '@/i18n/config'
import { withLocaleMetadata } from '@/lib/metadata'

interface AboutPageProps {
    params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
    const { lang: langParam } = await params
    const { lang, content } = await getI18nContent(langParam)

    return withLocaleMetadata(content.metadata.about, lang, '/about')
}

export default async function AboutPage({ params }: AboutPageProps) {
    const { lang: langParam } = await params

    if (!isLocale(langParam)) {
        notFound()
    }

    const { lang, content } = await getI18nContent(langParam)

    return <HomeClient lang={lang} content={content} />
}
