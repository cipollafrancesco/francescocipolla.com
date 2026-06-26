import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

const variantClasses: Record<ButtonVariant, string> = {
    primary: 'border-black bg-black text-white hover:bg-white hover:text-black',
    secondary: 'border-black bg-white text-black hover:bg-black hover:text-white',
    ghost: 'border-transparent bg-transparent text-black hover:bg-gray-100',
}

const baseClasses =
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-5 py-2.5 text-sm font-semibold transition-[color,background-color,border-color,transform] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    /** Pass `static` to suppress the scale-on-press animation. */
    static?: boolean
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string
    variant?: ButtonVariant
    children: ReactNode
    /** Pass `static` to suppress the scale-on-press animation. */
    static?: boolean
}

export function Button({
    className,
    variant = 'primary',
    static: isStatic,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(
                baseClasses,
                variantClasses[variant],
                !isStatic && 'active:scale-[0.96]',
                className
            )}
            {...props}
        />
    )
}

export function ButtonLink({
    className,
    variant = 'primary',
    href,
    children,
    static: isStatic,
    ...props
}: ButtonLinkProps) {
    const classes = cn(
        baseClasses,
        variantClasses[variant],
        !isStatic && 'active:scale-[0.96]',
        className
    )

    if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) {
        return (
            <a href={href} className={classes} {...props}>
                {children}
            </a>
        )
    }

    return (
        <Link href={href} className={classes} {...props}>
            {children}
        </Link>
    )
}
