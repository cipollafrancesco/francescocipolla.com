'use client'

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-4">
            <h1 className="text-6xl font-extrabold tracking-tighter mb-4">oops.</h1>
            <p className="text-gray-500 mb-8 text-center max-w-sm">
                Something went wrong on our end. It&apos;s not you — it&apos;s us.
            </p>
            <button
                onClick={reset}
                className="underline underline-offset-4 text-sm hover:text-gray-600 transition-colors"
            >
                Try again
            </button>
        </div>
    )
}
