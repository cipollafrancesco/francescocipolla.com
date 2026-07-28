'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'
import {
    localeCookieName,
    localeNames,
    localeShortNames,
    locales,
    type Locale,
} from '@/i18n/config'
import { trackEvent } from '@/lib/analytics'
import { cn } from '@/lib/utils'

function switchPath(pathname: string, nextLocale: Locale) {
    const parts = pathname.split('/')
    const currentLocale = parts[1]

    if (locales.includes(currentLocale as Locale)) {
        parts[1] = nextLocale
        return parts.join('/') || `/${nextLocale}`
    }

    return `/${nextLocale}${pathname === '/' ? '' : pathname}`
}

/** Elevated surface: a hairline ring plus two depth layers, so the menu reads as
 *  floating over whatever it covers without a hard border. */
const menuShadow =
    'shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_4px_8px_-2px_rgba(0,0,0,0.10),0_12px_24px_-6px_rgba(0,0,0,0.08)]'

/** The two-letter codes are the same typography in the trigger and the menu, so
 *  the open menu reads as the trigger expanding rather than a separate control.
 *  `text-sm font-semibold` is the control type scale from `ui/Button`; the extra
 *  tracking is for the uppercase codes, which set tight without it. */
const codeType = 'text-sm font-semibold uppercase tracking-wide'

/** `ui/Button` spells its focus ring out rather than leaning on the global
 *  `:focus-visible` rule, so controls ring consistently wherever they land. */
const focusRing = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-black'

export function LanguageSwitcher({
    currentLocale,
    label,
    className,
    placement = 'bottom',
}: {
    currentLocale: Locale
    label: string
    className?: string
    /** Which side the menu opens towards. Use `top` when the trigger sits low. */
    placement?: 'bottom' | 'top'
}) {
    const pathname = usePathname()
    const reduceMotion = useReducedMotion()
    const [isOpen, setIsOpen] = useState(false)

    const containerRef = useRef<HTMLDivElement>(null)
    const triggerRef = useRef<HTMLButtonElement>(null)
    const itemsRef = useRef<(HTMLAnchorElement | null)[]>([])

    const close = useCallback((restoreFocus = false) => {
        setIsOpen(false)
        if (restoreFocus) triggerRef.current?.focus()
    }, [])

    // Dismiss on outside pointer or Escape.
    useEffect(() => {
        if (!isOpen) return

        const onPointerDown = (event: PointerEvent) => {
            if (!containerRef.current?.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') close(true)
        }

        document.addEventListener('pointerdown', onPointerDown)
        document.addEventListener('keydown', onKeyDown)

        return () => {
            document.removeEventListener('pointerdown', onPointerDown)
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [isOpen, close])

    // Open with focus already on the active language, so keyboard users land
    // somewhere meaningful and arrow keys have a starting point.
    useEffect(() => {
        if (!isOpen) return

        const index = locales.indexOf(currentLocale)
        itemsRef.current[index === -1 ? 0 : index]?.focus()
    }, [isOpen, currentLocale])

    const onItemKeyDown = (event: React.KeyboardEvent, index: number) => {
        if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return

        event.preventDefault()
        const delta = event.key === 'ArrowDown' ? 1 : -1
        itemsRef.current[(index + delta + locales.length) % locales.length]?.focus()
    }

    const selectLocale = (locale: Locale) => {
        document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`
        trackEvent('language_switch', { from: currentLocale, to: locale })
        setIsOpen(false)
    }

    const offset = placement === 'top' ? 6 : -6
    const menuMotion = reduceMotion
        ? {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              transition: { duration: 0 },
          }
        : {
              initial: { opacity: 0, scale: 0.96, y: offset, filter: 'blur(4px)' },
              animate: { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' },
              // Softer than the enter — the user's attention is already moving on.
              exit: {
                  opacity: 0,
                  y: offset,
                  filter: 'blur(4px)',
                  transition: { duration: 0.15, ease: 'easeIn' as const },
              },
              transition: { type: 'spring' as const, duration: 0.3, bounce: 0 },
          }

    return (
        <div ref={containerRef} className={cn('relative', className)}>
            <button
                ref={triggerRef}
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                aria-label={`${label}: ${localeNames[currentLocale]}`}
                className={cn(
                    // Box model mirrors `ui/Button`'s ghost variant — same radius,
                    // transparent 1px border and 200ms curve — so the switcher sits on
                    // the same grid as every other control. Height stays at 40 rather
                    // than the Button's 44: the header's total height is what
                    // `section { scroll-margin-top: 88px }` is cut against.
                    'inline-flex min-h-10 items-center gap-1 rounded-md border border-transparent pl-2.5 pr-2 transition-[color,background-color,border-color,scale] duration-200 active:scale-[0.96]',
                    codeType,
                    focusRing,
                    'focus-visible:outline-offset-2',
                    isOpen
                        ? 'bg-gray-100 text-black'
                        : 'text-gray-500 hover:bg-gray-100 hover:text-black'
                )}
            >
                {localeShortNames[currentLocale]}
                <motion.span
                    aria-hidden="true"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={
                        reduceMotion
                            ? { duration: 0 }
                            : { type: 'spring', duration: 0.3, bounce: 0 }
                    }
                    style={{ display: 'flex' }}
                >
                    <ChevronDown className="h-3.5 w-3.5" />
                </motion.span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        role="menu"
                        aria-label={label}
                        className={cn(
                            // `rounded-lg` is the design system's `--radius` (8px), and
                            // the 4px `p-1` makes the rows' `rounded-sm` concentric with
                            // it. Fixed width (not `min-w`) so the `top` placement can be
                            // centred with a margin instead of a transform, which would
                            // fight the scale animation.
                            'absolute z-50 w-20 rounded-lg p-1',
                            // Same glass as the mobile drawer this also opens inside.
                            'bg-white/95 backdrop-blur-md',
                            menuShadow,
                            // Grow from the trigger: from its corner in the header, from
                            // its centre in the drawer, where the trigger is centred.
                            placement === 'top'
                                ? 'bottom-full left-1/2 -ml-10 mb-2 origin-bottom'
                                : 'right-0 top-full mt-2 origin-top-right'
                        )}
                        {...menuMotion}
                    >
                        {locales.map((locale, index) => {
                            const isCurrent = locale === currentLocale

                            return (
                                <Link
                                    key={locale}
                                    ref={(el) => {
                                        itemsRef.current[index] = el
                                    }}
                                    href={switchPath(pathname, locale)}
                                    hrefLang={locale}
                                    role="menuitem"
                                    // Codes read as letters to a screen reader ("I, T"),
                                    // so announce the language by name instead.
                                    aria-label={localeNames[locale]}
                                    aria-current={isCurrent ? 'true' : undefined}
                                    onClick={() => selectLocale(locale)}
                                    onKeyDown={(event) => onItemKeyDown(event, index)}
                                    className={cn(
                                        'flex min-h-10 items-center justify-between gap-3 rounded-sm px-2.5 transition-colors duration-200',
                                        codeType,
                                        focusRing,
                                        // Zero offset keeps the ring inside the menu's
                                        // own padding rather than spilling over its edge.
                                        'focus-visible:outline-offset-0',
                                        isCurrent
                                            ? 'text-black'
                                            : 'text-gray-500 hover:bg-gray-100 hover:text-black'
                                    )}
                                >
                                    {localeShortNames[locale]}
                                    <Check
                                        className={cn(
                                            'h-3.5 w-3.5 shrink-0 text-gray-400 transition-opacity duration-200',
                                            isCurrent ? 'opacity-100' : 'opacity-0'
                                        )}
                                        aria-hidden="true"
                                    />
                                </Link>
                            )
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
