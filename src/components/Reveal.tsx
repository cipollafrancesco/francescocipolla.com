'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { revealProps } from '@/lib/motion'

interface RevealProps {
    children: ReactNode
    className?: string
    delay?: number
}

/** Wrapper form of the house scroll-reveal, for content that can take an extra
 *  `<div>`. Elements that can't — a `motion.h2` inside a flex row, an anchor
 *  that must stay the flex item — spread `revealProps()` directly instead. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
    const reduceMotion = useReducedMotion()

    if (reduceMotion) {
        return <div className={className}>{children}</div>
    }

    return (
        <motion.div
            className={className}
            {...revealProps(reduceMotion, { delay, margin: '-80px' })}
        >
            {children}
        </motion.div>
    )
}
