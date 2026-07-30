import type { Metadata } from 'next'
import Link from 'next/link'
import { AppWindow, ArrowRight, ArrowUpRight, Globe, Smartphone, Sparkles } from 'lucide-react'
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
import { ButtonLink } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'
import { getI18nContent } from '@/i18n/server'
import { isLocale } from '@/i18n/config'
import { withLocaleMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'

interface ServicesPageProps {
    params: Promise<{ lang: string }>
}

const capabilityIcons: Record<string, typeof Globe> = {
    websites: Globe,
    webApps: AppWindow,
    mobile: Smartphone,
    ai: Sparkles,
}

const profileImageSrc = '/profile/me.webp'

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
    const { lang: langParam } = await params
    const { lang, content } = await getI18nContent(langParam)

    return withLocaleMetadata(content.metadata.services, lang, '/services')
}

export default async function ServicesPage({ params }: ServicesPageProps) {
    const { lang: langParam } = await params

    if (!isLocale(langParam)) {
        notFound()
    }

    const { lang, content } = await getI18nContent(langParam)
    const services = content.services
    // Same-page anchors: every one of these sections lives on this page.
    const bookingHref = '#booking'
    const casesHref = '#case-studies'
    const caseStudiesLabel = content.common.cta.seePastWork

    return (
        <div className="min-h-screen bg-white text-black md:mt-[88px]">
            <TrackOnView event="services_view" params={{ locale: lang }} />
            <main id="main-content">
                <section className="relative overflow-hidden border-b border-black">
                    <HeroContourField className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-70 md:opacity-100" />
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-white from-5% via-white/80 via-55% to-transparent"
                    />
                    <div className="relative z-10 mx-auto flex min-h-[calc(100svh-88px)] max-w-6xl flex-col px-5 py-8 md:px-8 md:py-14">
                        {/* Main content — vertically centered */}
                        <div className="flex flex-1 items-center">
                            <Reveal className="w-full max-w-5xl">
                                <Eyebrow className="mb-4">{services.hero.eyebrow}</Eyebrow>
                                <h1 className="max-w-5xl text-[clamp(2.6rem,10vw,4.5rem)] font-black leading-[0.95] tracking-tight md:text-[clamp(3rem,5.8vw,5.5rem)]">
                                    {services.hero.title}
                                </h1>
                                <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-700 md:text-xl">
                                    {services.hero.lead}
                                </p>
                                <p className="mt-3 max-w-2xl text-base leading-7 text-gray-600">
                                    {services.hero.secondary}
                                </p>
                                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                                    <TrackedLink
                                        href={bookingHref}
                                        event="booking_cta_click"
                                        eventParams={{ locale: lang, location: 'hero' }}
                                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-black bg-black px-5 py-2.5 text-sm font-semibold text-white transition-[color,background-color,border-color,transform] duration-200 hover:bg-white hover:text-black active:scale-[0.96] sm:w-fit"
                                    >
                                        {content.common.cta.book}
                                        <ArrowRight className="h-4 w-4" />
                                    </TrackedLink>
                                    <ButtonLink
                                        href={casesHref}
                                        variant="secondary"
                                        className="sm:w-fit"
                                    >
                                        {caseStudiesLabel} <ArrowUpRight className="h-4 w-4" />
                                    </ButtonLink>
                                </div>
                                <p className="mt-3 text-sm text-gray-500">
                                    {content.common.cta.bookMicrocopy}
                                </p>
                            </Reveal>
                        </div>

                        {/* Logo strip — anchored to the bottom */}
                        <Reveal delay={0.14} className="mt-10 border-t border-black pt-5">
                            <Eyebrow>{services.proof.eyebrow}</Eyebrow>
                            <CompanyLogoMarquee names={services.proof.names} />
                        </Reveal>
                    </div>
                </section>

                <Section
                    id="services"
                    eyebrow={services.serviceIntro.eyebrow}
                    title={services.serviceIntro.title}
                    description={services.serviceIntro.description}
                    className="border-b border-black py-16 md:py-28"
                >
                    <div className="grid border-l border-t border-black md:grid-cols-2">
                        {services.buckets.map((bucket, index) => (
                            <Reveal key={bucket.title} delay={index * 0.06} className="h-full">
                                <article className="group flex h-full flex-col border-b border-r border-black bg-white p-6 transition-colors duration-300 hover:bg-gray-50 md:p-8">
                                    <h3 className="text-xl font-black leading-tight tracking-tight md:text-2xl">
                                        {bucket.plainLabel}
                                    </h3>
                                    <p className="mt-3 text-base leading-7 text-gray-600">
                                        {bucket.situation}
                                    </p>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal delay={0.2}>
                        <div className="mt-8 flex flex-col items-start justify-between gap-5 md:mt-10 md:flex-row md:items-center md:gap-8">
                            <div className="max-w-2xl">
                                <p className="text-lg font-black tracking-tight md:text-xl">
                                    {services.serviceIntro.ctaHelperTitle}
                                </p>
                                <p className="mt-1.5 text-sm leading-6 text-gray-600 md:text-base">
                                    {services.serviceIntro.ctaHelper}
                                </p>
                            </div>
                            <TrackedLink
                                href={bookingHref}
                                event="booking_cta_click"
                                eventParams={{ locale: lang, location: 'service_options' }}
                                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md border border-black bg-black px-5 py-2.5 text-sm font-semibold text-white transition-[color,background-color,border-color,transform] duration-200 hover:bg-white hover:text-black active:scale-[0.96]"
                            >
                                {services.serviceIntro.ctaLabel}
                                <ArrowRight className="h-4 w-4" />
                            </TrackedLink>
                        </div>
                    </Reveal>
                </Section>

                <Section
                    eyebrow={services.capabilities.eyebrow}
                    title={services.capabilities.title}
                    description={services.capabilities.description}
                    className="border-b border-black py-16 md:py-28"
                >
                    <div className="grid border-l border-t border-black sm:grid-cols-2">
                        {services.capabilities.items.map((item, index) => {
                            const Icon = capabilityIcons[item.key]
                            return (
                                <Reveal key={item.key} delay={index * 0.06} className="h-full">
                                    <div className="group flex h-full flex-col border-b border-r border-black p-6 transition-colors duration-300 hover:bg-gray-50 md:p-8">
                                        {Icon && <Icon className="h-6 w-6 text-black" />}
                                        <h3 className="mt-5 text-xl font-black tracking-tight md:text-2xl">
                                            {item.name}
                                        </h3>
                                        <p className="mt-2 text-sm leading-6 text-gray-600">
                                            {item.description}
                                        </p>
                                    </div>
                                </Reveal>
                            )
                        })}
                    </div>
                </Section>

                <section
                    id="case-studies"
                    className="border-b border-black bg-black py-16 text-white [overflow-y:clip] md:py-24"
                >
                    <div className="mx-auto max-w-6xl px-5 md:px-8">
                        <Reveal className="grid gap-5 md:grid-cols-[0.75fr_1.25fr] md:items-end">
                            <div>
                                <Eyebrow tone="dark">{services.cases.eyebrow}</Eyebrow>
                                <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
                                    {services.cases.title}
                                </h2>
                            </div>
                            <p className="max-w-2xl text-base leading-7 text-gray-300 md:text-lg">
                                {services.cases.description}
                            </p>
                        </Reveal>
                    </div>
                    <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-[max(1.25rem,calc((100vw-72rem)/2+2rem))] pb-8 pt-2 md:gap-8">
                        {content.projects.map((project, index) => (
                            <Reveal
                                key={project.slug}
                                delay={index * 0.05}
                                className="min-w-[88vw] snap-start md:min-w-[720px] lg:min-w-[840px]"
                            >
                                <article className="group overflow-hidden rounded-lg border border-white/15 bg-white text-black shadow-[0_24px_90px_rgba(0,0,0,0.38)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-white/40 hover:shadow-[0_30px_110px_rgba(0,0,0,0.5)]">
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
                                    <div className="flex flex-col gap-3 border-t border-black/10 p-5 md:p-6">
                                        <div className="grid content-start">
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
                    <div className="mx-auto mt-4 max-w-6xl px-5 text-right md:px-8">
                        <Link
                            href={`/${lang}/projects`}
                            className="inline-flex items-center gap-2 px-1 py-2 text-sm font-semibold text-white underline underline-offset-4 transition-opacity hover:opacity-60"
                        >
                            {services.cases.seeAllCta}
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
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
                        </Reveal>

                        <Reveal delay={0.08} className="flex flex-col justify-center">
                            <Eyebrow>{services.profile.eyebrow}</Eyebrow>
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
                            <div className="mt-6">
                                <TrackedLink
                                    href={bookingHref}
                                    event="booking_cta_click"
                                    eventParams={{ locale: lang, location: 'profile' }}
                                    className="inline-flex items-center gap-2 px-1 py-2 text-sm font-semibold text-black underline underline-offset-4 transition-opacity hover:opacity-60"
                                >
                                    {content.common.cta.tellProject}{' '}
                                    <ArrowRight className="h-4 w-4" />
                                </TrackedLink>
                            </div>
                        </Reveal>
                    </div>
                </section>

                <Section
                    eyebrow={services.faq.eyebrow}
                    title={services.faq.title}
                    className="border-b border-black"
                >
                    <div className="max-w-3xl border-t border-black">
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
                            <Eyebrow tone="dark">{services.booking.callDuration}</Eyebrow>
                            <p className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
                                {content.common.cta.book}
                            </p>
                            <p className="mt-4 text-sm leading-7 text-gray-300">
                                {services.booking.callIntro}
                            </p>
                            <p className="mt-4 text-xs text-gray-400">
                                {content.common.cta.bookMicrocopy}
                            </p>
                            <p className="mt-6 text-sm">
                                <Link
                                    href={`/${lang}/contacts`}
                                    className="underline underline-offset-4 transition-opacity hover:opacity-70"
                                >
                                    {services.booking.formLinkLabel}
                                </Link>
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
