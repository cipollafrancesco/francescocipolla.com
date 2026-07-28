import { NextResponse, type NextRequest } from 'next/server'
import {
    defaultLocale,
    isLocale,
    localeCookieName,
    localeHeaderName,
    type Locale,
} from '@/i18n/config'

const PUBLIC_FILE = /\.(.*)$/

function preferredLocale(request: NextRequest): Locale {
    const cookieLocale = request.cookies.get(localeCookieName)?.value

    if (isLocale(cookieLocale)) {
        return cookieLocale
    }

    return defaultLocale
}

/** Passes the request through with the resolved locale attached. `not-found.tsx`
 *  gets no route params, so this header is the only way it can tell which
 *  language to render — without it the prerendered 404 is always Italian. */
function passThrough(request: NextRequest, locale: Locale) {
    const headers = new Headers(request.headers)
    headers.set(localeHeaderName, locale)

    return NextResponse.next({ request: { headers } })
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const firstSegment = pathname.split('/')[1]
    const locale = isLocale(firstSegment) ? firstSegment : preferredLocale(request)

    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname === '/favicon.ico' ||
        pathname === '/robots.txt' ||
        pathname === '/sitemap.xml' ||
        PUBLIC_FILE.test(pathname)
    ) {
        return passThrough(request, locale)
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

        return passThrough(request, locale)
    }

    const url = request.nextUrl.clone()
    url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`

    return NextResponse.redirect(url)
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
