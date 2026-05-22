import { NextResponse, type NextRequest } from 'next/server'
import { defaultLocale, isLocale, localeCookieName, type Locale } from '@/i18n/config'

const PUBLIC_FILE = /\.(.*)$/

function preferredLocale(request: NextRequest): Locale {
    const cookieLocale = request.cookies.get(localeCookieName)?.value

    if (isLocale(cookieLocale)) {
        return cookieLocale
    }

    return defaultLocale
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname === '/favicon.ico' ||
        pathname === '/robots.txt' ||
        pathname === '/sitemap.xml' ||
        PUBLIC_FILE.test(pathname)
    ) {
        return NextResponse.next()
    }

    const firstSegment = pathname.split('/')[1]

    if (isLocale(firstSegment)) {
        return NextResponse.next()
    }

    const locale = preferredLocale(request)
    const url = request.nextUrl.clone()
    url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`

    return NextResponse.redirect(url)
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
