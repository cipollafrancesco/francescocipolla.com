'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface ProcessStep {
    title: string
    description: string
}

interface ProcessProgressStepsProps {
    steps: ProcessStep[]
}

export function ProcessProgressSteps({ steps }: ProcessProgressStepsProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const reduceMotion = useReducedMotion()
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 70%', 'end 45%'],
    })
    const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1])

    return (
        <div ref={containerRef} className="relative">
            <div className="relative h-px bg-gray-200" aria-hidden="true">
                {reduceMotion ? (
                    <div className="h-px w-full bg-black" />
                ) : (
                    <motion.div
                        className="h-px origin-left bg-black"
                        style={{ scaleX: progressScale }}
                    />
                )}
            </div>
            <div className="grid border-x border-b border-black md:grid-cols-2 lg:grid-cols-4">
                {steps.map((step, index) => (
                    <motion.div
                        key={step.title}
                        className="group h-full border-b border-black p-5 transition-colors duration-300 last:border-b-0 hover:bg-gray-50 md:min-h-[260px] md:border-r md:last:border-r-0 lg:border-b-0"
                        initial={reduceMotion ? false : 'rest'}
                        whileInView={reduceMotion ? undefined : 'active'}
                        viewport={{ once: true, amount: 0.45 }}
                        transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.05 }}
                        variants={{
                            rest: {
                                opacity: 0.86,
                                y: 16,
                                boxShadow: 'inset 0 0 0 0 rgba(0, 0, 0, 0)',
                            },
                            active: {
                                opacity: 1,
                                y: 0,
                                boxShadow: 'inset 0 3px 0 0 rgba(0, 0, 0, 1)',
                            },
                        }}
                    >
                        <motion.span
                            className="block text-6xl font-black text-gray-100 transition-colors duration-300 group-focus-within:text-black group-hover:text-black"
                            variants={{
                                rest: { color: 'rgb(243 244 246)' },
                                active: { color: 'rgb(17 24 39)' },
                            }}
                            transition={{ duration: 0.35, ease: 'easeOut', delay: index * 0.05 }}
                        >
                            0{index + 1}
                        </motion.span>
                        <motion.h3
                            className="mt-8 text-xl font-black tracking-tight transition-transform duration-300 group-focus-within:-translate-y-1 group-hover:-translate-y-1 motion-reduce:transition-none"
                            variants={{
                                rest: { y: 0 },
                                active: { y: -4 },
                            }}
                            transition={{ duration: 0.35, ease: 'easeOut', delay: index * 0.05 }}
                        >
                            {step.title}
                        </motion.h3>
                        <p className="mt-3 text-sm leading-7 text-gray-600">{step.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
