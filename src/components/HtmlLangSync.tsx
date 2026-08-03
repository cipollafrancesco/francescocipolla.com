'use client'

import { useEffect } from 'react'
import type { Locale } from '@/i18n/config'

/** Keeps `<html lang>` in sync with the active locale.
 *
 * The root layout can't know `lang` itself — it sits above the `[lang]`
 * segment, and a parent layout never receives a child segment's params — so
 * it renders a static default. This component lives in `[lang]/layout.tsx`,
 * which does have `lang`, and corrects the attribute on mount *and* whenever
 * it changes, which a one-shot inline script would not: the language
 * switcher is a client-side `<Link>` navigation, and the root layout (with
 * any one-shot fixup) never remounts on it, so `<html lang>` would otherwise
 * go stale after switching languages without a full page reload. */
export function HtmlLangSync({ lang }: { lang: Locale }) {
    useEffect(() => {
        document.documentElement.lang = lang
    }, [lang])

    return null
}
