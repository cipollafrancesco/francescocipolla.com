import { NextResponse, type NextRequest } from 'next/server'
import {
    defaultLocale,
    isLocale,
    localeCookieName,
    localeHeaderName,
    type Locale,
} from '@/i18n/config'

const PUBLIC_FILE = /\.(.*)$/

/** Next's file-convention metadata images (`opengraph-image.tsx`, `icon.tsx`, …)
 *  are served from extensionless root paths like `/opengraph-image?<hash>` —
 *  `PUBLIC_FILE` requires a dot, so without this they'd fall through to the
 *  unprefixed-path branch below and get redirected into a 404 at `/it/opengraph-image`. */
const METADATA_IMAGE_ROUTE =
    /^\/(opengraph-image|twitter-image|icon|apple-icon)\d*(\.[a-zA-Z0-9]+)?$/

function preferredLocale(request: NextRequest): Locale {
    const cookieLocale = request.cookies.get(localeCookieName)?.value

    if (isLocale(cookieLocale)) {
        return cookieLocale
    }

    return defaultLocale
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const firstSegment = pathname.split('/')[1]

    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname === '/favicon.ico' ||
        pathname === '/robots.txt' ||
        pathname === '/sitemap.xml' ||
        METADATA_IMAGE_ROUTE.test(pathname) ||
        PUBLIC_FILE.test(pathname)
    ) {
        return NextResponse.next()
    }

    if (isLocale(firstSegment)) {
        // The portfolio lives at the locale root again, so `/about` is a leftover.
        // Redirected here rather than from a page, because `redirect()` inside a
        // prerendered route only ships a 200 shell that navigates after hydration.
        // Temporary (307): the landing page is meant to take over the root later.
        const rest = pathname.slice(firstSegment.length + 1)

        if (rest === '/about' || rest === '/about/') {
            const url = request.nextUrl.clone()
            url.pathname = `/${firstSegment}`

            return NextResponse.redirect(url, 307)
        }

        // Carries the locale forward on a header: an unmatched path under this
        // prefix (e.g. `/it/totally-bogus`) falls through to
        // `global-not-found.tsx`, which gets no route params and isn't nested
        // under `[lang]`, so this is the only way it can resolve which
        // language to render.
        const headers = new Headers(request.headers)
        headers.set(localeHeaderName, firstSegment)

        return NextResponse.next({ request: { headers } })
    }

    const locale = preferredLocale(request)
    const url = request.nextUrl.clone()
    url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`

    return NextResponse.redirect(url)
}

export const config = {
    // Anything with a dot in it is a static asset and is excluded here rather
    // than by the `PUBLIC_FILE` early return above: the early return still costs
    // a full middleware invocation (and a possible cold start) before it runs,
    // and the matcher is the only thing that can prevent one. That is not
    // marginal — the book covers are plain `/covers/*.webp` requests (they're
    // CSS backgrounds, so they never go through `/_next/image`), so a single
    // uncached visit to `/books` was firing ~23 of them.
    //
    // Safe because no route slug contains a dot; `site.ts` keeps `dpulses-2-0`
    // dash-only for exactly this reason. Extensionless metadata routes like
    // `/opengraph-image` have no dot and are still matched, which is what
    // `METADATA_IMAGE_ROUTE` above is for.
    matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
