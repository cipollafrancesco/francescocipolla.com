'use client'
import ExperienceCard from '@/components/ExperienceCard'
import type { SiteContent } from '@/content/site'
import { cn } from '@/lib/utils'
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import React, { useRef } from 'react'

type Qualifier = SiteContent['home']['experiencesQualifier']

interface IExperiencesProps {
    ref: React.RefObject<HTMLDivElement | null>
    title: string
    qualifier: Qualifier
    experiences: SiteContent['experiences']
}

/**
 * The qualifier is anchored to an inline <span> wrapping the title rather than
 * to the <h2>: an inline box is sized by the font metrics and ignores
 * line-height, so the label stays glued to the glyphs even on the desktop
 * heading, which carries `leading-[1.2]`.
 *
 * `labelClassName` must use the `text-<size>/none` shorthand: Tailwind's
 * text-* utilities ship their own line-height, and a responsive variant like
 * `lg:text-3xl` is emitted after `leading-none` in the stylesheet, so a
 * standalone `leading-none` loses the cascade and the label stops hugging its
 * glyphs.
 */
const TitleWithQualifier: React.FC<{
    title: string
    qualifier: Qualifier
    labelClassName: string
}> = ({ title, qualifier, labelClassName }) => (
    <span className="relative">
        {title}
        <span
            className={cn(
                'absolute whitespace-nowrap font-semibold tracking-tighter',
                // Percentages, not px: the anchor box is always ~0.97x the
                // font-size, so one value holds the same optical relationship
                // from the 60px mobile heading up to the 248px xl one. Both
                // tuck the label inside the title's box — 85% lands in the
                // descender band under the final glyph, 80% clears the top of
                // the lowercase letters. No margins: they would offset the
                // percentage.
                qualifier.placement === 'before' ? 'bottom-[80%] left-0' : 'right-0 top-[85%]',
                labelClassName
            )}
        >
            {qualifier.label}
        </span>
    </span>
)

/**
 * Desktop-only ambient drift for the experience cards.
 *
 * Lives on its own wrapper rather than on the card's entrance `motion.div`:
 * that one already animates `y` (50 -> 0) and the two would fight over the
 * same transform.
 *
 * Gated on `useInView` rather than `whileInView`: with infinite keyframes,
 * `whileInView` leaves the card frozen wherever the loop happened to be when it
 * scrolled out, stranding it a few pixels off. An explicit `animate` target
 * lets us send it back to y: 0 on exit, and keeps the loop off-screen idle.
 *
 * Amplitudes alternate and every card gets its own duration, so they drift out
 * of phase instead of breathing in unison.
 */
const FloatingCard: React.FC<{ index: number; children: React.ReactNode }> = ({
    index,
    children,
}) => {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref)
    const reduceMotion = useReducedMotion()

    if (reduceMotion) {
        return <div className="flex w-full">{children}</div>
    }

    const amplitude = index % 2 === 0 ? -7 : 7

    return (
        <motion.div
            ref={ref}
            className="flex w-full"
            animate={inView ? { y: [0, amplitude, 0] } : { y: 0 }}
            transition={
                inView
                    ? {
                          duration: 5.4 + index * 0.7,
                          delay: index * 0.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                      }
                    : { duration: 0.3, ease: 'easeOut' }
            }
        >
            {children}
        </motion.div>
    )
}

const Experiences: React.FC<IExperiencesProps> = (props) => {
    const { title, qualifier, experiences } = props

    const { scrollYProgress } = useScroll({
        target: props.ref,
        offset: ['start end', 'end start'],
    })

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
    const y = useTransform(scrollYProgress, [0, 0.2], [100, 0])

    return (
        <motion.section id="experiences" className="py-20" ref={props.ref} style={{ opacity, y }}>
            <div className="flex flex-col items-start justify-start lg:items-center lg:justify-center">
                {/* Mobile title */}
                <motion.h2
                    className="mb-10 text-[60px] font-extrabold leading-[0.9] tracking-tighter md:hidden"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <TitleWithQualifier
                        title={title}
                        qualifier={qualifier}
                        labelClassName="text-sm/none"
                    />
                </motion.h2>

                {/* Mobile: Column layout for experiences */}
                <div className="flex w-full flex-col gap-4 md:hidden lg:px-4">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.company}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <ExperienceCard {...exp} />
                        </motion.div>
                    ))}
                </div>

                {/* Desktop layout - hidden on mobile */}
                <div className="hidden w-full max-w-[90vw] md:block xl:max-w-[1400px]">
                    {/* Container for maintaining center alignment */}
                    <div className="relative flex flex-col items-center">
                        {/* Top row */}
                        <div className="mb-20 flex w-full justify-center gap-20">
                            {experiences.slice(0, 2).map((exp, index) => (
                                <motion.div
                                    key={exp.company}
                                    className="flex min-w-0 flex-1"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                >
                                    <FloatingCard index={index}>
                                        <ExperienceCard {...exp} />
                                    </FloatingCard>
                                </motion.div>
                            ))}
                        </div>

                        {/* Title */}
                        <motion.h2
                            className="mb-20 text-4xl font-extrabold leading-[1.2] tracking-tighter md:text-[7.65rem] lg:text-9xl xl:text-[15.5rem]"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <TitleWithQualifier
                                title={title}
                                qualifier={qualifier}
                                labelClassName="text-2xl/none lg:text-3xl/none"
                            />
                        </motion.h2>

                        {/* Bottom row */}
                        <div className="flex w-full justify-center gap-20">
                            {experiences.slice(2, 4).map((exp, index) => (
                                <motion.div
                                    key={exp.company}
                                    className="flex min-w-0 flex-1"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                >
                                    {/* +2 so all four cards get distinct phases */}
                                    <FloatingCard index={index + 2}>
                                        <ExperienceCard {...exp} />
                                    </FloatingCard>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    )
}

export default Experiences
