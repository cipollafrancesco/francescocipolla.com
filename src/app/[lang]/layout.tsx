import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import { ConsentBanner } from '@/components/ConsentBanner'
import { ConsentSettingsButton } from '@/components/ConsentSettingsButton'
import { CurrentYear } from '@/components/CurrentYear'
import { HtmlLangSync } from '@/components/HtmlLangSync'
import { localizedPath, siteLinks } from '@/content/site'
import { getI18nContent } from '@/i18n/server'
import { isLocale, locales, type Locale } from '@/i18n/config'

export function generateStaticParams() {
    return locales.map((lang) => ({ lang }))
}

const footerLinkClass = 'underline-offset-2 hover:underline'

/** `label` keys into `copy.footer.links`, so a new entry needs the copy in both
 *  locales before it will typecheck.
 *
 *  `/blog` is deliberately absent: the route works, but the only post is a
 *  placeholder, so nothing links to it and `sitemap.ts` leaves it out to match.
 *  Add the entry back here and there together once there's a real post. */
const footerLinks = [
    { path: '/#about-me', label: 'about' },
    { path: '/#experiences', label: 'experiences' },
    { path: '/projects', label: 'projects' },
    { path: '/books', label: 'books' },
    { path: '/services', label: 'services' },
    { path: '/contacts', label: 'contacts' },
] as const

const footerSocials = [
    { key: 'linkedin', href: (l: typeof siteLinks) => l.linkedin, external: true },
    { key: 'github', href: (l: typeof siteLinks) => l.github, external: true },
    { key: 'email', href: (l: typeof siteLinks) => `mailto:${l.email}`, external: false },
] as const

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ lang: string }>
}) {
    const { lang: langParam } = await params

    if (!isLocale(langParam)) {
        notFound()
    }

    const { lang, content } = await getI18nContent(langParam)

    return (
        <>
            <HtmlLangSync lang={lang} />
            {/* Skip to content — A2. Lives here rather than the root layout:
                this layout has the `lang` route param statically, so the
                link stays correctly localized without any request-time cost. */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-black focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
            >
                {content.common.skipToContent}
            </a>
            <Header lang={lang} copy={content.common} />
            {children}
            <Footer lang={lang} copy={content.common} />
            <ConsentBanner copy={content.consent} />
        </>
    )
}

function Footer({
    lang,
    copy,
}: {
    lang: Locale
    copy: Awaited<ReturnType<typeof getI18nContent>>['content']['common']
}) {
    return (
        <footer className="border-t border-gray-100 bg-white py-12">
            <div className="mx-auto max-w-screen-2xl px-8">
                <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                    <div>
                        <Link href={localizedPath(lang)} className="text-2xl font-extrabold">
                            cipo.
                        </Link>
                        <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
                            {copy.footer.tagline}
                        </p>
                    </div>
                    <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm lowercase">
                        {footerLinks.map(({ path, label }) => (
                            <Link
                                key={path}
                                href={localizedPath(lang, path)}
                                className={footerLinkClass}
                            >
                                {copy.footer.links[label]}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex flex-wrap gap-6 text-sm">
                        {footerSocials.map(({ href, key, external }) => (
                            <a
                                key={key}
                                href={href(siteLinks)}
                                {...(external
                                    ? { target: '_blank', rel: 'noopener noreferrer' }
                                    : {})}
                                className={footerLinkClass}
                                aria-label={copy.footer.socials[key]}
                            >
                                {copy.footer.socials[key]}
                            </a>
                        ))}
                        <ConsentSettingsButton label={copy.footer.privacySettings} />
                    </div>
                </div>
                <p className="mt-10 text-xs text-gray-400">
                    &copy; <CurrentYear buildYear={new Date().getFullYear()} /> Francesco Cipolla.{' '}
                    {copy.footer.rights}
                </p>
            </div>
        </footer>
    )
}
