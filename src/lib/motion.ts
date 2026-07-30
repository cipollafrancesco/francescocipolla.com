/** The house reduced-motion presets.
 *
 *  These started life as local `const`s in `HomeClient.tsx` and became the
 *  pattern CLAUDE.md points at — but being local, every new motion site had to
 *  retype `prefersReducedMotion ? 0 : x` by hand. Defined once here instead.
 *
 *  Takes the `useReducedMotion()` result rather than calling the hook itself,
 *  so the returned `dur` stays a plain function usable inside `map` callbacks.
 *
 *  ```tsx
 *  const { initFadeUp, dur } = motionPresets(useReducedMotion())
 *  <motion.div initial={initFadeUp} transition={dur(0.8, index * 0.2)} />
 *  ```
 */
export function motionPresets(reduced: boolean | null) {
    return {
        /** `initial` for a plain fade-in. `false` disables the enter animation
         *  outright under reduced motion, which is what stops the element from
         *  flashing rather than merely animating instantly. */
        initFade: reduced ? false : { opacity: 0 },

        /** `initial` for the fade-and-rise used by most sections. */
        initFadeUp: reduced ? false : { opacity: 0, y: 50 },

        /** A `transition` whose duration and delay both collapse to zero under
         *  reduced motion, so variants still resolve — just instantly. Keeping
         *  them resolving matters: disabling `whileInView` entirely leaves
         *  variant-driven styles stuck at their unanimated values. */
        dur: (duration: number, delay = 0) => ({
            duration: reduced ? 0 : duration,
            delay: reduced ? 0 : delay,
        }),
    }
}
