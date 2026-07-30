'use client'

import { Analytics } from '@vercel/analytics/next'
import { useEffect, useState } from 'react'
import { hasAnalyticsConsent, subscribeToAnalyticsConsent } from '@/lib/analytics'

/** Vercel's `<Analytics />` has no built-in consent gate — unlike the GA
 *  loader in `lib/analytics.ts`, it fired unconditionally, contradicting the
 *  cookie banner. Mirrors the same consent cookie and reacts to the banner's
 *  accept/reject choice without needing a reload. */
export function ConsentedVercelAnalytics() {
    const [consented, setConsented] = useState(false)

    useEffect(() => {
        setConsented(hasAnalyticsConsent())

        return subscribeToAnalyticsConsent(() => setConsented(hasAnalyticsConsent()))
    }, [])

    if (!consented) return null

    return <Analytics />
}
