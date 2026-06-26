import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Eyebrow } from './Eyebrow'

interface SectionProps extends HTMLAttributes<HTMLElement> {
    eyebrow?: string
    title?: string
    description?: string
    children: ReactNode
}

export function Section({
    eyebrow,
    title,
    description,
    className,
    children,
    ...props
}: SectionProps) {
    return (
        <section className={cn('py-20 md:py-28', className)} {...props}>
            <div className="mx-auto max-w-6xl px-5 md:px-8">
                {(eyebrow || title || description) && (
                    <div className="mb-12 max-w-3xl">
                        {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
                        {title && (
                            <h2 className="text-3xl font-black tracking-tight md:text-5xl">
                                {title}
                            </h2>
                        )}
                        {description && (
                            <p className="mt-5 text-base leading-7 text-gray-600 md:text-lg">
                                {description}
                            </p>
                        )}
                    </div>
                )}
                {children}
            </div>
        </section>
    )
}
