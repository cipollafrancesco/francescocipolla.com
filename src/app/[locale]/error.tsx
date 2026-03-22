'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const t = useTranslations('error')

    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-black">
            <h1 className="mb-4 text-6xl font-extrabold tracking-tighter">oops.</h1>
            <p className="mb-8 max-w-sm text-center text-gray-500">{t('message')}</p>
            <button
                onClick={reset}
                className="text-sm underline underline-offset-4 transition-colors hover:text-gray-600"
            >
                {t('retry')}
            </button>
        </div>
    )
}
