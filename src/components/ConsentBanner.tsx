'use client'

import { useEffect, useState } from 'react'
import { loadGoogleAnalytics, notifyConsentChanged } from '@/lib/analytics'
import type { SiteContent } from '@/content/site'

const consentCookie = 'analytics_consent'
const maxAge = 60 * 60 * 24 * 180

function getConsent() {
    if (typeof document === 'undefined') return null

    const cookie = document.cookie.split('; ').find((item) => item.startsWith(`${consentCookie}=`))

    return cookie?.split('=')[1] ?? null
}

function setConsent(value: 'accepted' | 'rejected') {
    document.cookie = `${consentCookie}=${value}; Path=/; Max-Age=${maxAge}; SameSite=Lax`
    // Lets consumers that gate on `hasAnalyticsConsent()` — e.g.
    // `ConsentedVercelAnalytics` — react immediately instead of waiting for
    // the next full page load.
    notifyConsentChanged()
}

export function ConsentBanner({ copy }: { copy: SiteContent['consent'] }) {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const consent = getConsent()
        setVisible(!consent)

        if (consent === 'accepted') {
            loadGoogleAnalytics()
        }

        const openPreferences = () => setVisible(true)
        window.addEventListener('open-cookie-preferences', openPreferences)

        return () => window.removeEventListener('open-cookie-preferences', openPreferences)
    }, [])

    const choose = (value: 'accepted' | 'rejected') => {
        setConsent(value)
        setVisible(false)

        if (value === 'accepted') {
            loadGoogleAnalytics()
        }
    }

    if (!visible) return null

    return (
        <div
            role="dialog"
            aria-live="polite"
            aria-label={copy.title}
            className="fixed bottom-4 left-4 right-4 z-[200] rounded-lg border border-gray-200 bg-white p-5 shadow-2xl md:left-auto md:max-w-md"
        >
            <h2 className="text-base font-bold">{copy.title}</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">{copy.description}</p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                    type="button"
                    onClick={() => choose('accepted')}
                    className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                >
                    {copy.accept}
                </button>
                <button
                    type="button"
                    onClick={() => choose('rejected')}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-gray-50"
                >
                    {copy.reject}
                </button>
            </div>
        </div>
    )
}
