import { getLocale } from './config'
import { siteContent } from '@/content/site'

// Copy is prop-drilled from `site.ts`, not looked up through i18next — every
// page reads `siteContent[lang]` directly, so there is no translation
// machinery to initialize here. Kept `async` so call sites can keep `await`ing
// it uniformly with the rest of the server-page pattern.
export async function getI18nContent(locale: string | undefined) {
    const lang = getLocale(locale)

    return {
        lang,
        content: siteContent[lang],
    }
}
