import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/** Hrefs that must render as a plain `<a>` rather than a `next/link`: absolute
 *  URLs, in-page anchors and `mailto:`. Shared so `ButtonLink` and `TrackedLink`
 *  can't drift on what counts as external. */
export function isExternalHref(href: string) {
    return href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')
}
