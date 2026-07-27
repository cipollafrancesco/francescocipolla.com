import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BooksClient from './BooksClient'
import { getI18nContent } from '@/i18n/server'
import { isLocale } from '@/i18n/config'
import { withLocaleMetadata } from '@/lib/metadata'

interface BooksPageProps {
    params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: BooksPageProps): Promise<Metadata> {
    const { lang: langParam } = await params
    const { lang, content } = await getI18nContent(langParam)

    return withLocaleMetadata(content.metadata.books, lang, '/books')
}

export default async function BooksPage({ params }: BooksPageProps) {
    const { lang: langParam } = await params

    if (!isLocale(langParam)) {
        notFound()
    }

    const { lang, content } = await getI18nContent(langParam)

    return <BooksClient lang={lang} copy={content.books} />
}
