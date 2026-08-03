'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface BookingEmphasisCardProps {
    children: ReactNode
}

export function BookingEmphasisCard({ children }: BookingEmphasisCardProps) {
    const reduceMotion = useReducedMotion()

    return (
        <div className="relative overflow-hidden rounded-lg border border-black bg-black p-6 text-white md:p-8">
            {children}
            {!reduceMotion && (
                <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 border border-white/70"
                    initial={{ x: '-101%' }}
                    whileInView={{ x: '101%' }}
                    viewport={{ once: true, amount: 0.65 }}
                    transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
                />
            )}
        </div>
    )
}
