import type { Metadata } from 'next'
import StackedProjects from '@/components/StackedProjects'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { getI18nContent } from '@/i18n/server'
import { isLocale } from '@/i18n/config'
import { withLocaleMetadata } from '@/lib/metadata'

interface ProjectsPageProps {
    params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
    const { lang: langParam } = await params
    const { lang, content } = await getI18nContent(langParam)

    return withLocaleMetadata(content.metadata.projects, lang, '/projects')
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
    const { lang: langParam } = await params

    if (!isLocale(langParam)) {
        return null
    }

    const { lang, content } = await getI18nContent(langParam)
    const intro =
        lang === 'it'
            ? 'Una selezione di progetti pubblici: siti, piattaforme, MVP e sistemi digitali costruiti con attenzione a prodotto, interfaccia e sviluppo.'
            : 'A selection of public projects: websites, platforms, MVPs, and digital systems built with attention to product, interface, and engineering.'
    const eyebrow = lang === 'it' ? 'Portfolio selezionato' : 'Selected portfolio'

    return (
        <div className="min-h-screen bg-white text-black md:mt-[88px]">
            <main id="main-content">
                <section className="border-b border-black">
                    <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
                        <div>
                            <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
                            <h1 className="max-w-4xl text-6xl font-black leading-none tracking-tight md:text-8xl lg:text-9xl">
                                {content.home.projectsTitle}
                            </h1>
                        </div>
                        <p className="max-w-2xl text-lg leading-8 text-gray-700">{intro}</p>
                    </div>
                </section>

                <section className="overflow-hidden py-14 md:py-20">
                    <div className="mx-auto max-w-6xl px-5 md:px-8">
                        <StackedProjects
                            projects={content.projects}
                            lang={lang}
                            labels={{
                                caseStudy: content.common.cta.caseStudy,
                                liveSite: content.common.cta.liveSite,
                            }}
                            className=""
                        />
                    </div>
                </section>
            </main>
        </div>
    )
}
