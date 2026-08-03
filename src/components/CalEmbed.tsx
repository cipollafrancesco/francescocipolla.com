'use client'
import Cal from '@calcom/embed-react'

interface CalEmbedProps {
    calLink: string
}

/** The booking widget.
 *
 *  UI options ride on the `config` prop rather than an imperative
 *  `getCalApi().then((cal) => cal('ui', …))` call in an effect. That call raced
 *  the embed's own iframe creation — `getCalApi()` resolves as soon as
 *  `embed.js` loads, which can beat `<Cal>`'s mount — so every page carrying
 *  the widget threw `iframe doesn't exist. createIframe must be called before
 *  doInIframe` on load, with the theme and `hideEventTypeDetails` options
 *  silently dropped. `config` is applied as the iframe is built, so there is no
 *  window in which it can arrive too early.
 *
 *  `hideEventTypeDetails` is a string because `config` is serialised into the
 *  iframe's query string; Cal coerces it on the far side. */
export default function CalEmbed({ calLink }: CalEmbedProps) {
    return <Cal calLink={calLink} config={{ theme: 'light', hideEventTypeDetails: 'true' }} />
}
