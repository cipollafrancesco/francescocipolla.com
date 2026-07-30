'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { localeFromPathname, type Locale } from '@/i18n/config'

// A dedicated copy map rather than importing `siteContent`: this is a client
// component (error boundaries must be), and `siteContent` carries every
// page's copy plus every project case study — pulling it in here would ship
// all of it to the browser for three strings.
const errorCopy: Record<Locale, { title: string; description: string; retry: string }> = {
    it: {
        title: 'ops.',
        description: 'Qualcosa è andato storto da parte nostra. Non è colpa tua — è nostra.',
        retry: 'Riprova',
    },
    en: {
        title: 'oops.',
        description: "Something went wrong on our end. It's not you — it's us.",
        retry: 'Try again',
    },
}

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    // Same as `not-found.tsx`: no route params here, so read the locale off the URL.
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
