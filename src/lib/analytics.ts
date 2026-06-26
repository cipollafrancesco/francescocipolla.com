'use client'

const gaId = process.env.NEXT_PUBLIC_GA_ID

declare global {
    interface Window {
        dataLayer?: unknown[]
        gtag?: (...args: unknown[]) => void
    }
}

export type AnalyticsEvent =
    | 'services_view'
    | 'booking_cta_click'
    | 'calendar_section_view'
    | 'language_switch'
    | 'case_study_click'
    | 'contact_form_submit'

export function hasAnalyticsConsent() {
    if (typeof document === 'undefined') return false

    return document.cookie.split('; ').some((item) => item === 'analytics_consent=accepted')
}

export function loadGoogleAnalytics() {
    if (typeof window === 'undefined' || !gaId || !hasAnalyticsConsent()) return
    if (document.querySelector(`script[src*="${gaId}"]`)) return

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer?.push(args)
    }
    window.gtag('js', new Date())
    window.gtag('config', gaId, { anonymize_ip: true })
}

export function trackEvent(event: AnalyticsEvent, params?: Record<string, string | number>) {
    if (typeof window === 'undefined' || !hasAnalyticsConsent()) return
    loadGoogleAnalytics()
    window.gtag?.('event', event, params ?? {})
}
