import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn, isExternalHref } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

/** `icon`/`iconRound` are the gallery and slider arrows — a fixed square or
 *  circle around a lone glyph, with none of the text button's padding. */
type ButtonShape = 'default' | 'icon' | 'iconRound'

const variantClasses: Record<ButtonVariant, string> = {
    primary: 'border-black bg-black text-white hover:bg-white hover:text-black',
    secondary: 'border-black bg-white text-black hover:bg-black hover:text-white',
    ghost: 'border-transparent bg-transparent text-black hover:bg-gray-100',
}

const shapeClasses: Record<ButtonShape, string> = {
    default: 'min-h-11 gap-2 rounded-md px-5 py-2.5 text-sm font-semibold',
    icon: 'h-10 w-10',
    iconRound: 'h-11 w-11 rounded-full',
}

/** The focus ring lives in the base on purpose: every hand-rolled copy of these
 *  classes that dropped it shipped a CTA with no visible focus state. */
const baseClasses =
    'inline-flex items-center justify-center border transition-[color,background-color,border-color,transform] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'

interface ButtonStyleOptions {
    variant?: ButtonVariant
    shape?: ButtonShape
    /** Pass `static` to suppress the scale-on-press animation. */
    static?: boolean
    className?: string
}

/**
 * The button look as a class string, for the cases that can't be a `Button` —
 * chiefly `TrackedLink`, which owns its own element so it can fire analytics.
 * Anything styled like a button should come through here rather than restating
 * the classes.
 */
export function buttonClasses({
    variant = 'primary',
    shape = 'default',
    static: isStatic,
    className,
}: ButtonStyleOptions = {}) {
    return cn(
        baseClasses,
        shapeClasses[shape],
        variantClasses[variant],
        !isStatic && 'active:scale-[0.96]',
        className
    )
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonStyleOptions {}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement>, ButtonStyleOptions {
    href: string
    children: ReactNode
}

/** `type` defaults to `button`, not the HTML default of `submit`: every call site
 *  so far is an ordinary click target, and the one that isn't (`ContactForm`) says
 *  `type="submit"` outright. Without this, adding a `Button` to a form and
 *  forgetting the attribute submits it. */
export function Button({
    className,
    variant,
    shape,
    static: isStatic,
    type = 'button',
    ...props
}: ButtonProps) {
    return (
        <button
            type={type}
            className={buttonClasses({ variant, shape, static: isStatic, className })}
            {...props}
        />
    )
}

export function ButtonLink({
    className,
    variant,
    shape,
    href,
    children,
    static: isStatic,
    ...props
}: ButtonLinkProps) {
    const classes = buttonClasses({ variant, shape, static: isStatic, className })

    if (isExternalHref(href)) {
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
