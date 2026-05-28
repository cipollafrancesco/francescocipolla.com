import type { Metadata } from 'next'
import { existsSync } from 'fs'
import Link from 'next/link'
import { join } from 'path'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { BookingEmphasisCard } from '@/components/BookingEmphasisCard'
import CalEmbed from '@/components/CalEmbed'
import { CompanyLogoMarquee } from '@/components/CompanyLogoMarquee'
import { HeroContourField } from '@/components/HeroContourField'
import { InspectableProjectImage } from '@/components/InspectableProjectImage'
import { ProcessProgressSteps } from '@/components/ProcessProgressSteps'
import { ProfileTiltCard } from '@/components/ProfileTiltCard'
import { Reveal } from '@/components/Reveal'
import { TrackedLink } from '@/components/TrackedLink'
import { TrackOnView } from '@/components/TrackOnView'
import { AccordionItem } from '@/components/ui/Accordion'
import { Section } from '@/components/ui/Section'
import { getI18nContent } from '@/i18n/server'
import { isLocale } from '@/i18n/config'
import { withLocaleMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'

interface HomePageProps {
    params: Promise<{ lang: string }>
}

const profileImageSrc = '/profile/me.webp'
const profileImageFile = join(process.cwd(), 'public', profileImageSrc.slice(1))

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
    const { lang: langParam } = await params
    const { lang, content } = await getI18nContent(langParam)

    return withLocaleMetadata(content.metadata.home, lang)
}

export default async function HomePage({ params }: HomePageProps) {
    const { lang: langParam } = await params

    if (!isLocale(langParam)) {
        notFound()
    }

    const { lang, content } = await getI18nContent(langParam)
    const services = content.services
    const bookingHref = `/${lang}/#booking`
    const casesHref = `/${lang}/#case-studies`
    const caseStudiesLabel = lang === 'it' ? 'Vedi casi studio' : 'View case studies'
    const diagnosticLabel = lang === 'it' ? 'Diagnosi' : 'Diagnostic'
    const diagnosticTitle =
        lang === 'it'
            ? 'Prima di rifare il sito, capiamo dove perde valore.'
            : 'Before rebuilding the site, find where it loses value.'
    const hasProfileImage = existsSync(profileImageFile)
    const heroLead =
        lang === 'it'
            ? 'Se le persone ti trovano online ma non capiscono subito perche sceglierti, ogni visita diventa un’occasione persa.'
            : 'If people find you online but do not quickly understand why they should choose you, every visit is a missed opportunity.'

    return (
        <div className="min-h-screen bg-white text-black md:mt-[88px]">
            <TrackOnView event="services_view" params={{ locale: lang }} />
            <main id="main-content">
                <section className="relative overflow-hidden border-b border-black">
                    <HeroContourField className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-70 md:opacity-100" />
                    <div className="relative z-10 mx-auto grid min-h-[calc(100svh-88px)] min-w-0 max-w-6xl content-start gap-8 px-5 pb-7 pt-8 md:content-between md:px-8 md:pb-9 md:pt-14 lg:grid-cols-[minmax(0,1fr)_330px]">
                        <Reveal className="min-w-0 self-center">
                            <div className="mb-6 flex items-center gap-4">
                                <span className="h-px w-12 bg-black" aria-hidden="true" />
                                <p className="max-w-[16rem] text-xs font-semibold uppercase leading-5 tracking-[0.22em] text-gray-500 md:max-w-none md:tracking-[0.3em]">
                                    {services.hero.eyebrow}
                                </p>
                            </div>
                            <h1 className="max-w-full text-[clamp(2.65rem,12.2vw,6.5rem)] font-black leading-[0.92] tracking-tight md:max-w-5xl md:text-[clamp(3.1rem,5.7vw,6.5rem)] md:leading-[0.9]">
                                {services.hero.title}
                            </h1>
                        </Reveal>

                        <Reveal
                            delay={0.08}
                            className="min-w-0 self-center lg:border-l lg:border-black lg:pl-8"
                        >
                            <p className="max-w-full text-lg leading-8 text-black md:text-xl md:leading-8">
                                {heroLead}
                            </p>
                            <div className="mt-6 flex flex-col gap-3">
                                <TrackedLink
                                    href={bookingHref}
                                    event="booking_cta_click"
                                    eventParams={{ locale: lang, location: 'hero' }}
                                    className="inline-flex min-h-11 w-full max-w-full items-center justify-center gap-2 rounded-md border border-black bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black sm:w-fit"
                                >
                                    {content.common.cta.book}
                                    <ArrowRight className="h-4 w-4" />
                                </TrackedLink>
                                <Link
                                    href={casesHref}
                                    className="inline-flex items-center justify-center gap-2 px-1 py-2 text-sm font-semibold text-black underline underline-offset-4 transition-opacity hover:opacity-60"
                                >
                                    {caseStudiesLabel} <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </Reveal>

                        <Reveal
                            delay={0.14}
                            className="min-w-0 border-t border-black pt-5 lg:col-span-2"
                        >
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">
                                    {services.proof.eyebrow}
                                </p>
                                <CompanyLogoMarquee names={services.proof.names} />
                            </div>
                        </Reveal>
                    </div>
                </section>

                <section className="border-b border-black py-16 md:py-24">
                    <div className="mx-auto max-w-6xl px-5 md:px-8">
                        <Reveal className="mb-10 grid gap-5 md:grid-cols-[0.75fr_1.25fr] md:items-end">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-500">
                                {diagnosticLabel}
                            </p>
                            <h2 className="text-3xl font-black tracking-tight md:text-5xl">
                                {diagnosticTitle}
                            </h2>
                        </Reveal>
                        {services.pains.map((pain, index) => (
                            <Reveal key={pain.title} delay={index * 0.06}>
                                <article
                                    tabIndex={0}
                                    className="group relative grid gap-5 overflow-hidden border-t border-black py-8 outline-none transition-colors duration-300 last:border-b hover:bg-gray-50 focus-visible:bg-gray-50 md:grid-cols-[120px_0.8fr_1.2fr] md:items-start"
                                >
                                    <span
                                        className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-black transition-transform duration-300 group-hover:scale-y-100 group-focus-visible:scale-y-100"
                                        aria-hidden="true"
                                    />
                                    <span
                                        className="absolute left-0 top-0 h-px w-full -translate-x-full bg-black/30 transition-transform duration-500 group-hover:translate-x-0 group-focus-visible:translate-x-0"
                                        aria-hidden="true"
                                    />
                                    <span className="text-5xl font-black leading-none text-gray-200 transition-colors duration-300 group-hover:text-black group-focus-visible:text-black md:text-6xl">
                                        0{index + 1}
                                    </span>
                                    <h3 className="text-2xl font-black tracking-tight transition-transform duration-300 group-hover:translate-x-2 group-focus-visible:translate-x-2 motion-reduce:transition-none md:text-3xl">
                                        {pain.title}
                                    </h3>
                                    <p className="max-w-2xl text-base leading-7 text-gray-600 transition-colors duration-300 group-hover:text-gray-800 group-focus-visible:text-gray-800">
                                        {pain.description}
                                    </p>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </section>

                <Section
                    eyebrow={services.serviceIntro.eyebrow}
                    title={services.serviceIntro.title}
                    description={services.serviceIntro.description}
                    className="border-b border-black py-16 md:py-28"
                >
                    <div className="grid border border-black md:grid-cols-3">
                        {services.buckets.map((bucket, index) => (
                            <Reveal key={bucket.title} delay={index * 0.06} className="h-full">
                                <article className="group flex h-full flex-col border-b border-black bg-white transition-colors duration-300 last:border-b-0 hover:bg-gray-50 md:min-h-[520px] md:border-b-0 md:border-r md:last:border-r-0">
                                    <div className="border-b border-black p-4 md:p-6">
                                        <div className="flex items-start justify-between gap-4">
                                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
                                                {bucket.title}
                                            </p>
                                            <span className="text-4xl font-black leading-none text-gray-200 transition-colors duration-300 group-hover:text-black md:text-5xl">
                                                0{index + 1}
                                            </span>
                                        </div>
                                        <h3 className="mt-6 max-w-[12ch] text-2xl font-black leading-none tracking-tight md:mt-8 md:text-4xl">
                                            {bucket.plainLabel}
                                        </h3>
                                    </div>
                                    <div className="grid flex-1 grid-rows-[auto_1fr]">
                                        <div className="border-b border-gray-200 p-4 md:p-6">
                                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
                                                {services.serviceIntro.situationLabel}
                                            </p>
                                            <p className="mt-3 text-base leading-7 text-gray-700">
                                                {bucket.situation}
                                            </p>
                                        </div>
                                        <div className="p-5 md:p-6">
                                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
                                                {services.serviceIntro.buildLabel}
                                            </p>
                                            <ul className="mt-4 grid gap-2">
                                                {bucket.bullets.map((bullet) => (
                                                    <li
                                                        key={bullet}
                                                        className="flex min-h-10 items-center gap-3 border border-gray-200 bg-white px-3 py-2 text-sm leading-5 text-gray-700 transition-colors duration-300 group-hover:border-gray-300 group-hover:text-black"
                                                    >
                                                        <Check className="h-4 w-4 shrink-0 text-black" />
                                                        <span>{bullet}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal delay={0.2}>
                        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-y border-black py-5 md:flex-row md:items-center">
                            <p className="max-w-2xl text-sm leading-6 text-gray-600">
                                {services.serviceIntro.ctaHelper}
                            </p>
                            <TrackedLink
                                href={bookingHref}
                                event="booking_cta_click"
                                eventParams={{ locale: lang, location: 'service_options' }}
                                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-black bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
                            >
                                {services.serviceIntro.ctaLabel}
                                <ArrowRight className="h-4 w-4" />
                            </TrackedLink>
                        </div>
                    </Reveal>
                </Section>

                <section
                    id="case-studies"
                    className="overflow-hidden border-b border-black bg-black py-16 text-white md:py-24"
                >
                    <div className="mx-auto max-w-6xl px-5 md:px-8">
                        <Reveal className="grid gap-5 md:grid-cols-[0.75fr_1.25fr] md:items-end">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-400">
                                    {services.cases.eyebrow}
                                </p>
                                <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
                                    {services.cases.title}
                                </h2>
                            </div>
                            <p className="max-w-2xl text-base leading-7 text-gray-300 md:text-lg">
                                {services.cases.description}
                            </p>
                        </Reveal>
                    </div>
                    <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-[max(1.25rem,calc((100vw-72rem)/2+2rem))] pb-8 md:gap-8">
                        {content.projects.map((project, index) => (
                            <Reveal
                                key={project.slug}
                                delay={index * 0.05}
                                className="min-w-[88vw] snap-start md:min-w-[720px] lg:min-w-[840px]"
                            >
                                <article className="group overflow-hidden rounded-lg border border-white/15 bg-white text-black shadow-[0_24px_90px_rgba(0,0,0,0.38)] transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:shadow-[0_30px_110px_rgba(0,0,0,0.5)]">
                                    <div className="border-b border-black/10 bg-neutral-100 px-4 py-3">
                                        <div className="flex items-center gap-1.5">
                                            <div className="flex gap-1.5" aria-hidden="true">
                                                <span className="h-2.5 w-2.5 rounded-full bg-black/20" />
                                                <span className="h-2.5 w-2.5 rounded-full bg-black/20" />
                                                <span className="h-2.5 w-2.5 rounded-full bg-black/20" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-neutral-100 p-3 md:p-4">
                                        <InspectableProjectImage
                                            src={project.image}
                                            alt={project.title}
                                            sizes="(min-width: 1024px) 840px, 88vw"
                                        />
                                    </div>
                                    <div className="grid min-h-[172px] gap-4 border-t border-black/10 p-5 md:grid-cols-[1fr_auto] md:items-center md:p-6">
                                        <div className="grid min-h-[100px] content-start">
                                            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                                                <span>0{index + 1}</span>
                                                <span aria-hidden="true">/</span>
                                                <span>{project.client}</span>
                                                <span aria-hidden="true">/</span>
                                                <span>{project.year}</span>
                                            </div>
                                            <p className="mt-2 max-w-2xl overflow-hidden text-sm leading-6 text-gray-700 [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [display:-webkit-box]">
                                                {project.showcaseOutcome ?? project.outcome}
                                            </p>
                                        </div>
                                        <TrackedLink
                                            href={`/${lang}/projects/${project.slug}`}
                                            event="case_study_click"
                                            eventParams={{ locale: lang, project: project.slug }}
                                            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-black px-4 py-2 text-sm font-semibold transition-colors hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                        >
                                            {content.common.cta.caseStudy}
                                            <ArrowUpRight className="h-4 w-4" />
                                        </TrackedLink>
                                    </div>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </section>

                <Section
                    eyebrow={services.process.eyebrow}
                    title={services.process.title}
                    className="border-b border-black"
                >
                    <ProcessProgressSteps steps={services.process.steps} />
                </Section>

                <section className="border-b border-black bg-white py-16 md:py-24">
                    <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-[320px_1fr] md:px-8 lg:grid-cols-[340px_1fr] lg:gap-12">
                        <Reveal className="mx-auto w-full max-w-[280px] md:max-w-none">
                            {hasProfileImage ? (
                                <ProfileTiltCard
                                    src={profileImageSrc}
                                    alt={services.profile.imageAlt}
                                    sizes="(min-width: 1024px) 340px, (min-width: 768px) 320px, 280px"
                                    caption={
                                        <>
                                            <span>{services.profile.imageCaption}</span>
                                            <span aria-hidden="true">/</span>
                                        </>
                                    }
                                />
                            ) : (
                                <figure className="relative overflow-hidden border border-black bg-neutral-100">
                                    <div className="aspect-[4/5] overflow-hidden">
                                        <div className="grid h-full place-items-center bg-white">
                                            <div className="relative flex h-full w-full items-end justify-start overflow-hidden p-6">
                                                <span
                                                    className="absolute inset-x-0 top-1/2 h-px -rotate-12 bg-black/15"
                                                    aria-hidden="true"
                                                />
                                                <span
                                                    className="absolute bottom-8 right-6 text-[clamp(5rem,18vw,9rem)] font-black leading-none tracking-tight text-black"
                                                    aria-hidden="true"
                                                >
                                                    FC
                                                </span>
                                                <span className="max-w-[14rem] text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">
                                                    {services.profile.imageCaption}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <figcaption className="flex items-center justify-between gap-4 border-t border-black bg-white px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                                        <span>{services.profile.imageCaption}</span>
                                        <span aria-hidden="true">/</span>
                                    </figcaption>
                                </figure>
                            )}
                        </Reveal>

                        <Reveal delay={0.08} className="flex flex-col justify-center">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-500">
                                {services.profile.eyebrow}
                            </p>
                            <h2 className="mt-4 max-w-2xl text-3xl font-black tracking-tight md:text-5xl">
                                {services.profile.title}
                            </h2>
                            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-700">
                                {services.profile.description}
                            </p>
                            <div className="mt-8 grid border border-black md:grid-cols-3">
                                {services.proof.stats.map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="border-b border-black p-4 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
                                    >
                                        <p className="text-3xl font-black tracking-tight">
                                            {stat.value}
                                        </p>
                                        <p className="mt-1 text-xs leading-5 text-gray-600">
                                            {stat.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </section>

                <Section
                    eyebrow={services.faq.eyebrow}
                    title={services.faq.title}
                    className="border-b border-black"
                >
                    <div className="max-w-4xl border-t border-black">
                        {services.faq.items.map((item) => (
                            <AccordionItem key={item.question} question={item.question}>
                                {item.answer}
                            </AccordionItem>
                        ))}
                    </div>
                </Section>

                <Section
                    id="booking"
                    eyebrow={services.booking.eyebrow}
                    title={services.booking.title}
                    description={services.booking.description}
                >
                    <TrackOnView
                        event="calendar_section_view"
                        params={{ locale: lang, location: 'home_booking' }}
                    />
                    <div className="mt-10 grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
                        <BookingEmphasisCard>
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-400">
                                {lang === 'it' ? '30 minuti' : '30 minutes'}
                            </p>
                            <p className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
                                {content.common.cta.book}
                            </p>
                            <p className="mt-4 text-sm leading-7 text-gray-300">
                                {services.booking.description}
                            </p>
                        </BookingEmphasisCard>
                        <div className="overflow-hidden rounded-lg border border-gray-200">
                            <CalEmbed calLink="francescocipolla/free-intro-call-30-minutes" />
                        </div>
                    </div>
                </Section>
            </main>
        </div>
    )
}
