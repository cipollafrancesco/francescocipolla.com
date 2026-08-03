'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { localeFromPathname } from '@/i18n/config'
// Not `siteContent`: this is a client component (error boundaries must be), and
// `siteContent` carries every page's copy plus every project case study, all of
// which would ship to the browser for three strings. `system-copy` holds just
// these and is re-exported into `siteContent.error`, so the copy still has a
// single home — see the note in that file.
import { errorCopy } from '@/content/system-copy'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    // Like `global-not-found.tsx`, this receives no route params — so the locale
    // has to come off the URL.
    const lang = localeFromPathname(usePathname())
    const copy = errorCopy[lang]

    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div
            lang={lang}
            className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-black"
        >
            <h1 className="mb-4 text-6xl font-extrabold tracking-tighter">{copy.title}</h1>
            <p className="mb-8 max-w-sm text-center text-gray-500">{copy.description}</p>
            <Button type="button" onClick={reset}>
                {copy.retry}
            </Button>
        </div>
    )
}
