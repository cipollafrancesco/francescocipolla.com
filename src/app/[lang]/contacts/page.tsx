import type { Metadata } from 'next'
import { Calendar, Linkedin, Mail } from 'lucide-react'
import CalEmbed from '@/components/CalEmbed'
import { getI18nContent } from '@/i18n/server'
import { isLocale } from '@/i18n/config'
import { withLocaleMetadata } from '@/lib/metadata'

interface ContactsPageProps {
    params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: ContactsPageProps): Promise<Metadata> {
    const { lang: langParam } = await params
    const { lang, content } = await getI18nContent(langParam)

    return withLocaleMetadata(content.metadata.contacts, lang, '/contacts')
}

export default async function ContactsPage({ params }: ContactsPageProps) {
    const { lang: langParam } = await params

    if (!isLocale(langParam)) {
        return null
    }

    const { lang, content } = await getI18nContent(langParam)
    const eyebrow = lang === 'it' ? 'Parliamone' : 'Let’s talk'
    const intro =
        lang === 'it'
            ? 'Scrivimi direttamente se hai gia un contesto chiaro, oppure usa il calendario per fissare una prima call.'
            : 'Write directly if you already have clear context, or use the calendar to book a first call.'
    const bookingEyebrow = lang === 'it' ? 'Disponibilita' : 'Availability'
    const bookingLabel =
        lang === 'it'
            ? 'Scegli un orario per parlare del progetto.'
            : 'Choose a time to talk through the project.'

    return (
        <div className="min-h-screen bg-white text-black md:mt-[88px]">
            <main id="main-content" className="border-b border-black">
                <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
                    <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
                        <div>
                            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-gray-500">
                                {eyebrow}
                            </p>
                            <h1 className="max-w-4xl text-6xl font-black leading-none tracking-tight md:text-8xl lg:text-9xl">
                                {content.home.contactsTitle}
                            </h1>
                            <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-700">
                                {intro}
                            </p>
                        </div>

                        <div className="grid content-start border border-black">
                            <a
                                href="mailto:info@francescocipolla.com"
                                className="group flex min-h-24 items-center justify-between gap-5 border-b border-black p-5 transition-colors hover:bg-black hover:text-white md:p-6"
                            >
                                <span className="flex min-w-0 items-center gap-4 break-all text-lg font-semibold tracking-tight md:text-2xl">
                                    <Mail className="h-5 w-5 shrink-0" />
                                    info@francescocipolla.com
                                </span>
                                <span className="text-sm uppercase tracking-[0.2em] text-gray-500 transition-colors group-hover:text-white/70">
                                    {lang === 'it' ? 'diretto' : 'direct'}
                                </span>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/francesco-cipolla-41768411b"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex min-h-24 items-center justify-between gap-5 border-b border-black p-5 transition-colors hover:bg-black hover:text-white md:p-6"
                            >
                                <span className="flex items-center gap-4 text-lg font-semibold tracking-tight md:text-2xl">
                                    <Linkedin className="h-5 w-5 shrink-0" />
                                    LinkedIn
                                </span>
                                <span className="text-sm uppercase tracking-[0.2em] text-gray-500 transition-colors group-hover:text-white/70">
                                    {lang === 'it' ? 'professionale' : 'professional'}
                                </span>
                            </a>
                        </div>
                    </div>
                </section>

                <section className="border-t border-black bg-black text-white">
                    <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[0.75fr_1.25fr]">
                        <div>
                            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-gray-400">
                                <Calendar className="h-4 w-4" />
                                {bookingEyebrow}
                            </p>
                            <h2 className="text-3xl font-black tracking-tight md:text-5xl">
                                {content.common.cta.book}
                            </h2>
                            <p className="mt-5 max-w-xl text-base leading-7 text-gray-300">
                                {bookingLabel}
                            </p>
                        </div>
                        <div className="overflow-hidden rounded-lg border border-white/20 bg-white text-black">
                            <CalEmbed calLink="francescocipolla/free-intro-call-30-minutes" />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
