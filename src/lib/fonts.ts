import { Inter } from 'next/font/google'

/** The site's only font, declared once.
 *
 *  `next/font` generates a separate CSS class and its own preload set per call
 *  site, so two identical `Inter({ … })` calls are not free — they are two
 *  fonts as far as the build is concerned. The root layout and
 *  `global-not-found.tsx` (which bypasses that layout, and so has to render its
 *  own `<html>/<body>`) both need it, hence this module. */
export const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700', '900'] })
