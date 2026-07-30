import type { Locale } from '@/i18n/config'

/** Copy for the error boundary, split out of `site.ts` so the *client* bundle
 *  can have it without the rest.
 *
 *  `app/error.tsx` has to be a client component, and `site.ts` is one ~1.5k-line
 *  module carrying every page's copy plus every project case study — importing
 *  it there would ship all of that to the browser for three strings. Keeping
 *  these here, and re-exporting them into `siteContent` below, means the strings
 *  still live in exactly one place and the `SiteContent` contract still covers
 *  them; only the module boundary is different.
 *
 *  `notFound` deliberately did *not* move here: `global-not-found.tsx` is an
 *  async Server Component, so it reads `siteContent` directly at no client cost.
 */
export const errorCopy: Record<Locale, { title: string; description: string; retry: string }> = {
    it: {
        title: 'ops.',
        description: 'Qualcosa è andato storto da parte nostra. Non è colpa tua — è nostra.',
        retry: 'Riprova',
    },
    en: {
        title: 'oops.',
        description: "Something went wrong on our end. It's not you — it's us.",
        retry: 'Try again',
    },
}
