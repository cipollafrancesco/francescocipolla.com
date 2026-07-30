import type { Metadata } from 'next'
import { ArrowUpRight, Calendar, Github, Linkedin, Mail } from 'lucide-react'
import { ContactForm } from '@/components/ContactForm'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/Reveal'
import CalEmbed from '@/components/CalEmbed'
import { siteLinks } from '@/content/site'
import { getI18nContent } from '@/i18n/server'
import { isLocale } from '@/i18n/config'
import { withLocaleMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'

interface ContactsPageProps {
    params: Promise<{ lang: string }>
}

const channels = [
    {
        Icon: Mail,
        label: siteLinks.email,
        href: `mailto:${siteLinks.email}`,
        external: false,
    },
    {
        Icon: Linkedin,
        label: 'LinkedIn',
        href: siteLinks.linkedin,
        external: true,
    },
    {
        Icon: Github,
        label: 'GitHub',
        href: siteLinks.github,
        external: true,
    },
]

export async function generateMetadata({ params }: ContactsPageProps): Promise<Metadata> {
    const { lang: langParam } = await params
    const { lang, content } = await getI18nContent(langParam)

    return withLocaleMetadata(content.metadata.contacts, lang, '/contacts')
}

export default async function ContactsPage({ params }: ContactsPageProps) {
    const { lang: langParam } = await params

    if (!isLocale(langParam)) {
        notFound()
    }

    const { lang, content } = await getI18nContent(langParam)
    const page = content.contact.page
    const newTab = page.opensInNewTab

    return (
        <div className="min-h-screen bg-white text-black md:mt-[88px]">
            <main id="main-content">
                <section className="border-b border-black">
                    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
                        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
                            <Reveal>
                                <Eyebrow className="mb-5">{page.eyebrow}</Eyebrow>
                                <h1 className="max-w-4xl text-6xl font-black leading-none tracking-tight md:text-8xl lg:text-[7rem]">
                                    {content.home.contactsTitle}
                                </h1>
                                <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-700">
                                    {page.intro}
                                </p>
                            </Reveal>

                            <Reveal
                                delay={0.08}
                                className="grid self-start border border-black bg-white"
                            >
                                {channels.map(({ Icon, label, href, external }) => (
                                    <a
                                        key={href}
                                        href={href}
                                        aria-label={external ? `${label} — ${newTab}` : undefined}
                                        {...(external
                                            ? { target: '_blank', rel: 'noopener noreferrer' }
                                            : {})}
                                        className="group flex min-h-24 items-center justify-between gap-5 border-b border-black p-5 transition-colors last:border-b-0 hover:bg-black hover:text-white md:p-6"
                                    >
                                        <span className="flex min-w-0 items-center gap-4 break-words text-lg font-semibold tracking-tight md:text-2xl">
                                            <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                                            {label}
                                        </span>
                                        <ArrowUpRight
                                            className="h-5 w-5 shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                                            aria-hidden="true"
                                        />
                                    </a>
                                ))}
                            </Reveal>
                        </div>
                    </div>
                </section>

                <section className="border-b border-black">
                    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
                        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
                            <Reveal>
                                <Eyebrow className="mb-5">{content.contact.form.eyebrow}</Eyebrow>
                                <h2 className="text-3xl font-black tracking-tight md:text-5xl">
                                    {content.contact.form.title}
                                </h2>
                                <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
                                    {content.contact.form.intro}
                                </p>
                            </Reveal>
                            <Reveal delay={0.08}>
                                <ContactForm form={content.contact.form} lang={lang} />
                            </Reveal>
                        </div>
                    </div>
                </section>

                <section className="border-b border-black bg-black text-white">
                    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
                        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
                            <Reveal>
                                <Eyebrow
                                    tone="dark"
                                    icon={<Calendar className="h-4 w-4" />}
                                    className="mb-5"
                                >
                                    {page.booking.eyebrow}
                                </Eyebrow>
                                <h2 className="text-3xl font-black tracking-tight md:text-5xl">
                                    {content.common.cta.book}
                                </h2>
                                <p className="mt-5 max-w-2xl text-base leading-7 text-gray-300 md:text-lg">
                                    {page.booking.description}
                                </p>
                            </Reveal>
                            {/* Not wrapped in Reveal: the Cal embed measures its own
                                container to size the iframe, so it must not mount
                                inside an animated/transformed element. */}
                            <div className="overflow-hidden rounded-lg border border-white/20 bg-white text-black">
                                <CalEmbed calLink="francescocipolla/free-intro-call-30-minutes" />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
