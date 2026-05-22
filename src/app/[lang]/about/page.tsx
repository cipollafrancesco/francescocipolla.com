import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getI18nContent } from '@/i18n/server'
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
    const { lang, content } = await getI18nContent(langParam)

    return (
        <div className="mt-[88px] min-h-screen bg-white text-black">
            <main id="main-content" className="mx-auto max-w-5xl px-6 py-20">
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-gray-500">
                    {content.common.nav.about}
                </p>
                <h1 className="max-w-4xl text-5xl font-black leading-none tracking-tight md:text-7xl">
                    Francesco Cipolla
                </h1>
                <div className="mt-10 grid gap-10 text-lg leading-8 text-gray-700 md:grid-cols-2">
                    <p>
                        {lang === 'it'
                            ? 'Sono un digital product partner e ingegnere informatico. Aiuto aziende e team a trasformare idee, processi e presenza online in prodotti web chiari, solidi e utili.'
                            : 'I am a digital product partner and senior engineer. I help businesses and teams turn ideas, workflows, and online presence into clear, solid, useful web products.'}
                    </p>
                    <p>
                        {lang === 'it'
                            ? 'Ho lavorato su prodotti streaming, siti editoriali, campagne interattive e sistemi web per brand, studi e aziende con esigenze molto diverse.'
                            : 'I have worked on streaming products, editorial websites, interactive campaigns, and web systems for brands, studios, and companies with very different needs.'}
                    </p>
                </div>
                <Link
                    href={`/${lang}/services`}
                    className="mt-12 inline-flex items-center gap-2 rounded-md bg-black px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                >
                    {content.common.nav.services}
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </main>
        </div>
    )
}
