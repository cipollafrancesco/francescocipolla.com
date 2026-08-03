'use client'

import { useEffect, useState } from 'react'

/** Renders the current year, correcting itself after mount if the real year
 * has moved on since the page was built.
 *
 * These pages are statically generated, so `new Date().getFullYear()` in a
 * Server Component bakes the year in at *build* time rather than evaluating it
 * fresh on every request — correct until the calendar rolls over without a
 * redeploy.
 * Mirrors the `HtmlLangSync` pattern: the server-computed `buildYear` is
 * used as the initial client state too, so the first client render matches
 * SSR exactly (no hydration mismatch to suppress), and the effect only ever
 * changes anything in the rare case a real visitor's year has actually
 * advanced past the last build. */
export function CurrentYear({ buildYear }: { buildYear: number }) {
    const [year, setYear] = useState(buildYear)

    useEffect(() => {
        setYear(new Date().getFullYear())
    }, [])

    return <>{year}</>
}
