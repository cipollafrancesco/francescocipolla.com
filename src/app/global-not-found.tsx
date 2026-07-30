import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Inter } from 'next/font/google'
import { ButtonLink } from '@/components/ui/Button'
import { baseUrl } from '@/content/site'
import { getLocale, localeHeaderName } from '@/i18n/config'
import './globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700', '900'] })

// Bypassing the root layout (see the component doc below) also means losing
// its `metadata` export — without this, the tab title would go blank instead
// of inheriting the site's default. Matches `app/layout.tsx`'s `title`
// exactly; `metadataBase` isn't otherwise used on this page but silences a
// build warning about resolving OG/Twitter image URLs.
export const metadata: Metadata = {
    title: 'Francesco Cipolla - Digital Product Partner',
    metadataBase: new URL(baseUrl),
}

// A dedicated copy map rather than importing `siteContent` — see the (now
// deleted) `not-found.tsx`'s equivalent comment: this stays small on
// purpose. `global-not-found.tsx` is Next's purpose-built escape hatch for
// exactly this app's shape (docs literally name "top-level dynamic segments
// like `app/[country]/layout.tsx`" as the motivating case): unlike a plain
// root `not-found.tsx`, it is *not* eagerly embedded into every other
// route's render tree, so it can read a genuinely per-request value
// (`headers()`) without forcing every other page out of static generation.
// It also bypasses every layout (root included), which is why it renders
// its own `<html>/<body>`, its own font, and its own `globals.css` import.
const notFoundCopy = {
    it: {
        title: 'perso?',
        label: '404',
        description: 'La pagina che cercavi non esiste o è stata spostata altrove.',
        backHome: 'Torna alla home',
    },
    en: {
        title: 'lost?',
        label: '404',
        description: "The page you were looking for doesn't exist, or it moved somewhere else.",
        backHome: 'Back to home',
    },
}

export default async function GlobalNotFound() {
    const lang = getLocale((await headers()).get(localeHeaderName) ?? undefined)
    const copy = notFoundCopy[lang]

    return (
        <html lang={lang}>
            <body className={`${inter.className} antialiased`}>
                <main
                    lang={lang}
                    className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-black"
                >
                    <p className="mb-4 text-sm uppercase tracking-widest text-gray-400">
                        {copy.label}
                    </p>
                    <h1 className="mb-4 text-6xl font-extrabold tracking-tighter">{copy.title}</h1>
                    <p className="mb-8 max-w-sm text-center text-gray-500">{copy.description}</p>
                    <ButtonLink href={`/${lang}`}>{copy.backHome}</ButtonLink>
                </main>
            </body>
        </html>
    )
}
