'use client'

import Link from 'next/link'
import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { trackEvent, type AnalyticsEvent } from '@/lib/analytics'
import { isExternalHref } from '@/lib/utils'

interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string
    event: AnalyticsEvent
    eventParams?: Record<string, string | number>
    children: ReactNode
}

export function TrackedLink({
    href,
    event,
    eventParams,
    children,
    onClick,
    ...props
}: TrackedLinkProps) {
    const handleClick: AnchorHTMLAttributes<HTMLAnchorElement>['onClick'] = (evt) => {
        trackEvent(event, eventParams)
        onClick?.(evt)
    }

    if (isExternalHref(href)) {
        return (
            <a href={href} onClick={handleClick} {...props}>
                {children}
            </a>
        )
    }

    return (
        <Link href={href} onClick={handleClick} {...props}>
            {children}
        </Link>
    )
}
