import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import { ConsentBanner } from '@/components/ConsentBanner'
import { ConsentSettingsButton } from '@/components/ConsentSettingsButton'
import { I18nProvider } from '@/i18n/I18nProvider'
import { getI18nContent } from '@/i18n/server'
import { isLocale, locales, type Locale } from '@/i18n/config'

export function generateStaticParams() {
    return locales.map((lang) => ({ lang }))
}

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
        <I18nProvider lang={lang}>
            <Header lang={lang} copy={content.common} />
            {children}
            <Footer lang={lang} copy={content.common} />
            <ConsentBanner copy={content.consent} />
        </I18nProvider>
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
                        <Link href={`/${lang}`} className="text-2xl font-extrabold">
                            cipo.
                        </Link>
                        <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
                            {copy.footer.tagline}
                        </p>
                    </div>
                    <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm lowercase">
                        <Link
                            href={`/${lang}/#about-me`}
                            className="underline-offset-2 hover:underline"
                        >
                            {copy.footer.links.about}
                        </Link>
                        <Link
                            href={`/${lang}/#experiences`}
                            className="underline-offset-2 hover:underline"
                        >
                            {copy.footer.links.experiences}
                        </Link>
                        <Link
                            href={`/${lang}/#projects`}
                            className="underline-offset-2 hover:underline"
                        >
                            {copy.footer.links.projects}
                        </Link>
                        <Link
                            href={`/${lang}/services`}
                            className="underline-offset-2 hover:underline"
                        >
                            {copy.footer.links.services}
                        </Link>
                        <Link href={`/${lang}/blog`} className="underline-offset-2 hover:underline">
                            {copy.footer.links.blog}
                        </Link>
                        <Link
                            href={`/${lang}/#contacts`}
                            className="underline-offset-2 hover:underline"
                        >
                            {copy.footer.links.contacts}
                        </Link>
                    </nav>
                    <div className="flex flex-wrap gap-6 text-sm">
                        <a
                            href="https://www.linkedin.com/in/francesco-cipolla-41768411b"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline-offset-2 hover:underline"
                            aria-label={copy.footer.socials.linkedin}
                        >
                            {copy.footer.socials.linkedin}
                        </a>
                        <a
                            href="https://github.com/cipollafrancesco"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline-offset-2 hover:underline"
                            aria-label={copy.footer.socials.github}
                        >
                            {copy.footer.socials.github}
                        </a>
                        <a
                            href="mailto:info@francescocipolla.com"
                            className="underline-offset-2 hover:underline"
                            aria-label={copy.footer.socials.email}
                        >
                            {copy.footer.socials.email}
                        </a>
                        <ConsentSettingsButton label={copy.footer.privacySettings} />
                    </div>
                </div>
                <p className="mt-10 text-xs text-gray-400">
                    &copy; {new Date().getFullYear()} Francesco Cipolla. {copy.footer.rights}
                </p>
            </div>
        </footer>
    )
}
