'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { siteContent } from '@/content/site'
import { localeFromPathname } from '@/i18n/config'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    // Same as `not-found.tsx`: no route params here, so read the locale off the URL.
    const lang = localeFromPathname(usePathname())
    const copy = siteContent[lang].error

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
