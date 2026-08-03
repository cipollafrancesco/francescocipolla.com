/** Route transition (U3).
 *
 *  A Server Component on purpose. Next gives every navigation a fresh
 *  `template` instance, which is all a CSS animation needs to replay — so the
 *  fade-and-rise costs no client JS, no framer-motion mount per navigation, and
 *  no `useReducedMotion` subscription. The keyframes and the reduced-motion
 *  opt-out live in `globals.css` under `.page-enter`.
 */
export default function Template({ children }: { children: React.ReactNode }) {
    return <div className="page-enter">{children}</div>
}
