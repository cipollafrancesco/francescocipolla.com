import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { ButtonLink } from '@/components/ui/Button'
import { baseUrl, localizedPath, siteContent, siteTitle } from '@/content/site'
import { getLocale, localeHeaderName } from '@/i18n/config'
import { inter } from '@/lib/fonts'
import './globals.css'

// Bypassing the root layout (see the component doc below) also means losing
// its `metadata` export — without this, the tab title would go blank instead
// of inheriting the site's default. `metadataBase` isn't otherwise used on this
// page but silences a build warning about resolving OG/Twitter image URLs.
export const metadata: Metadata = {
    title: siteTitle,
    metadataBase: new URL(baseUrl),
}

// `global-not-found.tsx` is Next's purpose-built escape hatch for exactly this
// app's shape (the docs name "top-level dynamic segments like
// `app/[country]/layout.tsx`" as the motivating case): unlike a plain root
// `not-found.tsx`, it is *not* eagerly embedded into every other route's render
// tree, so it can read a genuinely per-request value (`headers()`) without
// forcing every other page out of static generation. It also bypasses every
// layout (root included), which is why it renders its own `<html>/<body>`, its
// own font, and its own `globals.css` import.
//
// It is a Server Component, though, so the copy comes straight from
// `siteContent` — no client bundle to keep small, and so no reason to fork the
// strings the way the client-side `error.tsx` has to.
export default async function GlobalNotFound() {
    const lang = getLocale((await headers()).get(localeHeaderName) ?? undefined)
    const { notFound: copy, common } = siteContent[lang]

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
                    <ButtonLink href={localizedPath(lang)}>{common.cta.backHome}</ButtonLink>
                </main>
            </body>
        </html>
    )
}
