'use client'

import { useRef } from 'react'
import { useReducedMotion, useScroll, useTransform } from 'framer-motion'

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

interface RevealOptions {
    delay?: number
    /** Distance the element rises from, in px. */
    y?: number
    /** `viewport.margin` — shifts the trigger point relative to the viewport. */
    margin?: string
    duration?: number
}

/**
 * The house scroll-reveal: fade-and-rise once, on entering the viewport.
 *
 * Spread onto any `motion.*` element. This exists because the recipe was
 * hand-written at a dozen call sites — `initial={{opacity:0,y:20}}
 * whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{...}}` —
 * and every hand-written copy forgot reduced motion.
 *
 * Note it collapses the *duration* rather than dropping `whileInView`: keeping
 * the trigger is what stops variant-driven styles sticking at their unanimated
 * values (see the `dur()` note above and CLAUDE.md).
 */
export function revealProps(
    reduced: boolean | null,
    { delay = 0, y = 28, margin, duration = 0.5 }: RevealOptions = {}
) {
    return {
        initial: reduced ? false : { opacity: 0, y },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, ...(margin ? { margin } : {}) },
        transition: {
            duration: reduced ? 0 : duration,
            delay: reduced ? 0 : delay,
            ease: 'easeOut' as const,
        },
    }
}

/**
 * The fade-in/fade-out-on-scroll a full-page section rides on: invisible at the
 * edges of its own scroll range, fully opaque through the middle, rising a
 * little on the way in.
 *
 * Owns its own ref so a section can wire itself up (`const { ref, style } =
 * useSectionScrollFade()`), rather than having one threaded down from the page.
 *
 * Reduced motion flattens the output *ranges* rather than swapping in plain
 * numbers. The style has to stay a `MotionValue` either way: the server renders
 * it at scroll progress 0, baking `opacity:0; transform:translateY(100px)` into
 * the HTML, and React does not patch a mismatched `style` attribute during
 * hydration — so a plain `{ opacity: 1 }` would never overwrite it and the
 * section would stay invisible forever. A `MotionValue` is applied imperatively
 * by framer after mount, which does.
 */
export function useSectionScrollFade<T extends HTMLElement = HTMLDivElement>() {
    const ref = useRef<T>(null)
    const reduced = useReducedMotion()
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

    const opacity = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        reduced ? [1, 1, 1, 1] : [0, 1, 1, 0]
    )
    const y = useTransform(scrollYProgress, [0, 0.2], reduced ? [0, 0] : [100, 0])

    return { ref, style: { opacity, y } }
}
