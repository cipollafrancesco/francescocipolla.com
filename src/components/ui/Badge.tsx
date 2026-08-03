import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-700',
                className
            )}
            {...props}
        />
    )
}
