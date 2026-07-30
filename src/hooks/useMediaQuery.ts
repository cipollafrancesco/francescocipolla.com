import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Subscribe to a CSS media query. SSR-safe: returns `false` until mounted, so
 * the server and first client render agree, then updates on the client.
 *
 * Used by the bookshelf to switch the details view between a desktop side panel
 * and a mobile bottom sheet.
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const mql = window.matchMedia(query)
        setMatches(mql.matches)

        const onChange = (event: MediaQueryListEvent) => setMatches(event.matches)
        mql.addEventListener('change', onChange)
        return () => mql.removeEventListener('change', onChange)
    }, [query])

    return matches
}

/**
 * Whether pointer-driven hover effects (tilt, parallax inspect) should run at
 * all: a fine pointer that can hover, and motion not suppressed.
 *
 * Both conditions matter for more than taste — without the reduced-motion half,
 * `ProfileTiltCard`'s wrapper still renders `rotateX`/`rotateY` as a flat,
 * unforeshortened distortion, so a reduced-motion user gets an instant snap
 * between odd-looking shapes rather than no motion at all.
 */
export function usePointerEffects(): boolean {
    const hasFinePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
    const prefersReducedMotion = useReducedMotion()

    return hasFinePointer && !prefersReducedMotion
}
