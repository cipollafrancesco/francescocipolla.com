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

/** Fired by the consent banner whenever the stored choice changes.
 *
 *  Private to this module on purpose — `ConsentBanner` dispatches it and
 *  `ConsentedVercelAnalytics` subscribes, and while the name was a bare string
 *  literal in both, a typo on either side silently disabled the gate with no
 *  type error to catch it. Go through `notifyConsentChanged` /
 *  `subscribeToAnalyticsConsent` instead. */
const CONSENT_CHANGED_EVENT = 'analytics-consent-changed'

/** Tells live consumers the consent cookie just changed, so they can re-read it
 *  without waiting for the next full page load. */
export function notifyConsentChanged() {
    if (typeof window === 'undefined') return

    window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT))
}

/** Subscribes to consent changes. Returns an unsubscribe function. */
export function subscribeToAnalyticsConsent(onChange: () => void) {
    if (typeof window === 'undefined') return () => {}

    window.addEventListener(CONSENT_CHANGED_EVENT, onChange)
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onChange)
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
