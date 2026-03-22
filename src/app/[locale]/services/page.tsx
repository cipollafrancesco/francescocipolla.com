import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { ArrowRight, Check } from 'lucide-react'
import CalEmbed from '@/components/CalEmbed'

interface ServicesPageProps {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'services.meta' })
    return {
        title: t('title'),
        description: t('description'),
        openGraph: {
            title: t('title'),
            description: t('ogDescription'),
            url: `https://francescocipolla.com/${locale}/services`,
        },
        alternates: {
            canonical: `https://francescocipolla.com/${locale}/services`,
        },
    }
}

export default async function ServicesPage({ params }: ServicesPageProps) {
    const { locale } = await params
    setRequestLocale(locale)

    const t = await getTranslations('services')

    const services = t.raw('servicesList') as Array<{
        title: string
        description: string
        bullets: string[]
    }>
    const process = t.raw('process') as Array<{
        step: string
        title: string
        description: string
    }>
    const clients = t.raw('clients') as Array<{ type: string; description: string }>

    return (
        <div className="mt-[88px] min-h-screen bg-white text-black">
            <main id="main-content">
                {/* ── Hero ───────────────────────────────────────────────── */}
                <section className="mx-auto max-w-5xl px-6 pb-32 pt-20">
                    <p className="mb-6 text-sm uppercase tracking-widest text-gray-400">
                        {t('hero.tag')}
                    </p>
                    <h1 className="mb-8 text-5xl font-extrabold leading-none tracking-tighter md:text-7xl xl:text-8xl">
                        {t('hero.headline').split('great.')[0]}
                        <br />
                        <span className="font-semibold italic">great.</span>
                    </h1>
                    <p className="mb-10 max-w-xl text-lg leading-relaxed text-gray-600 md:text-xl">
                        {t('hero.intro')}
                    </p>
                    <a
                        href="#book"
                        className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                    >
                        {t('hero.cta')} <ArrowRight className="h-4 w-4" />
                    </a>
                </section>

                {/* ── Services grid ──────────────────────────────────────── */}
                <section className="border-t border-gray-100 py-24">
                    <div className="mx-auto max-w-5xl px-6">
                        <h2 className="mb-16 text-3xl font-bold tracking-tight">
                            {t('sections.whatIOffer')}
                        </h2>
                        <div className="grid gap-12 md:grid-cols-2">
                            {services.map((svc) => (
                                <div
                                    key={svc.title}
                                    className="rounded-2xl border border-gray-100 p-8 transition-all duration-300 hover:border-gray-300 hover:shadow-sm"
                                >
                                    <h3 className="mb-3 text-xl font-bold">{svc.title}</h3>
                                    <p className="mb-6 text-sm leading-relaxed text-gray-600">
                                        {svc.description}
                                    </p>
                                    <ul className="space-y-2">
                                        {svc.bullets.map((b) => (
                                            <li
                                                key={b}
                                                className="flex items-center gap-2 text-sm text-gray-700"
                                            >
                                                <Check className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                                                {b}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Who I work with ────────────────────────────────────── */}
                <section className="border-t border-gray-100 bg-gray-50 py-24">
                    <div className="mx-auto max-w-5xl px-6">
                        <h2 className="mb-16 text-3xl font-bold tracking-tight">
                            {t('sections.whoIWorkWith')}
                        </h2>
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {clients.map((c) => (
                                <div key={c.type}>
                                    <p className="mb-2 text-lg font-bold">{c.type}</p>
                                    <p className="text-sm leading-relaxed text-gray-600">
                                        {c.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Process ────────────────────────────────────────────── */}
                <section className="border-t border-gray-100 py-24">
                    <div className="mx-auto max-w-5xl px-6">
                        <h2 className="mb-16 text-3xl font-bold tracking-tight">
                            {t('sections.howItWorks')}
                        </h2>
                        <div className="grid gap-8 md:grid-cols-4">
                            {process.map((p) => (
                                <div key={p.step}>
                                    <span className="text-4xl font-extrabold text-gray-100">
                                        {p.step}
                                    </span>
                                    <h3 className="mb-2 mt-2 font-bold">{p.title}</h3>
                                    <p className="text-sm leading-relaxed text-gray-600">
                                        {p.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Work samples ───────────────────────────────────────── */}
                <section className="border-t border-gray-100 bg-gray-50 py-24">
                    <div className="mx-auto flex max-w-5xl flex-col justify-between gap-8 px-6 md:flex-row md:items-center">
                        <div>
                            <h2 className="mb-4 text-3xl font-bold tracking-tight">
                                {t('sections.seeMyWork')}
                            </h2>
                            <p className="max-w-md text-gray-600">{t('seeMyWork.description')}</p>
                        </div>
                        <Link
                            href="/#projects"
                            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-black px-6 py-3 text-sm font-medium transition-colors hover:bg-black hover:text-white"
                        >
                            {t('seeMyWork.cta')} <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </section>

                {/* ── Book a call ────────────────────────────────────────── */}
                <section id="book" className="border-t border-gray-100 py-24">
                    <div className="mx-auto max-w-5xl px-6">
                        <h2 className="mb-4 text-3xl font-bold tracking-tight">
                            {t('sections.bookACall')}
                        </h2>
                        <p className="mb-12 max-w-md text-gray-600">{t('booking.description')}</p>
                        <CalEmbed calLink="francescocipolla/free-intro-call-30-minutes" />
                    </div>
                </section>
            </main>
        </div>
    )
}
