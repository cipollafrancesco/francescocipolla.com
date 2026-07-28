import { headers } from 'next/headers'
import { ButtonLink } from '@/components/ui/Button'
import { siteContent } from '@/content/site'
import { getLocale, localeHeaderName } from '@/i18n/config'

export default async function NotFound() {
    // `not-found.tsx` never receives route params, and it is the same render for
    // every unmatched URL — so the locale comes from the header the middleware set.
    const lang = getLocale((await headers()).get(localeHeaderName) ?? undefined)
    const { notFound, common } = siteContent[lang]

    return (
        <main
            lang={lang}
            className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-black"
        >
            <p className="mb-4 text-sm uppercase tracking-widest text-gray-400">{notFound.label}</p>
            <h1 className="mb-4 text-6xl font-extrabold tracking-tighter">{notFound.title}</h1>
            <p className="mb-8 max-w-sm text-center text-gray-500">{notFound.description}</p>
            <ButtonLink href={`/${lang}`}>{common.cta.backHome}</ButtonLink>
        </main>
    )
}
