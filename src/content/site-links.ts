/** Contact channels shared across the JSON-LD, the footer, the contacts page,
 *  and the homepage contact section — one source instead of four copies that
 *  can silently drift apart.
 *
 *  Split out of `site.ts` for the same reason as `system-copy.ts`: `Contacts.tsx`
 *  is a client component and imports these as *values*, so keeping them in
 *  `site.ts` risks shipping ~1.5k lines of copy and case studies to the browser
 *  for three constants. `site.ts` re-exports it, so server callers are unaffected.
 */
export const siteLinks = {
    email: 'info@francescocipolla.com',
    linkedin: 'https://www.linkedin.com/in/francesco-cipolla-41768411b',
    github: 'https://github.com/cipollafrancesco',
} as const
