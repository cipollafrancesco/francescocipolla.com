'use client'

import { useEffect, useRef } from 'react'
import { trackEvent, type AnalyticsEvent } from '@/lib/analytics'

export function TrackOnView({
    event,
    params,
}: {
    event: AnalyticsEvent
    params?: Record<string, string | number>
}) {
    const markerRef = useRef<HTMLSpanElement>(null)
    const sent = useRef(false)

    useEffect(() => {
        const marker = markerRef.current
        if (!marker || sent.current) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || sent.current) return
                sent.current = true
                trackEvent(event, params)
                observer.disconnect()
            },
            { threshold: 0.3 }
        )

        observer.observe(marker)

        return () => observer.disconnect()
    }, [event, params])

    return <span ref={markerRef} aria-hidden="true" className="sr-only" />
}
