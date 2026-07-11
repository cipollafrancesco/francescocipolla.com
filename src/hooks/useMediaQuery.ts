import { useEffect, useState } from 'react'

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
