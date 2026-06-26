import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface EyebrowProps {
    children: ReactNode
    /** 'light' (default) renders on white/light backgrounds; 'dark' renders on black sections. */
    tone?: 'light' | 'dark'
    /**
     * Optional icon that replaces the default hairline rule marker.
     * Use when the eyebrow already has semantic meaning conveyed by an icon
     * (e.g. a Calendar icon on a booking section).
     */
    icon?: ReactNode
    className?: string
}

export function Eyebrow({ children, tone = 'light', icon, className }: EyebrowProps) {
    const isLight = tone === 'light'
    return (
        <p
            className={cn(
                'flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em]',
                isLight ? 'text-gray-500' : 'text-gray-400',
                className
            )}
        >
            {icon && <span aria-hidden="true">{icon}</span>}
            <span>{children}</span>
        </p>
    )
}
