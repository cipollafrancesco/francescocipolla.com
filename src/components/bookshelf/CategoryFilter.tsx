'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CategoryFilterProps {
    categories: string[]
    /** Currently active categories (empty = show everything). */
    active: Set<string>
    counts: Record<string, number>
    /** Localised display labels, keyed by the raw category value. */
    labels: Record<string, string>
    onToggle: (category: string) => void
    onClear: () => void
    /** Label of the chip that clears the filter. */
    allLabel: string
    /** Accessible name of the chip group. */
    groupLabel: string
}

function Chip({
    label,
    count,
    selected,
    onClick,
}: {
    label: string
    count?: number
    selected: boolean
    onClick: () => void
}) {
    return (
        <motion.button
            type="button"
            onClick={onClick}
            aria-pressed={selected}
            whileTap={{ scale: 0.94 }}
            className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
                selected
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
            )}
        >
            {label}
            {typeof count === 'number' && (
                <span
                    className={cn(
                        'text-xs tabular-nums',
                        selected ? 'text-white/70' : 'text-gray-400'
                    )}
                >
                    {count}
                </span>
            )}
        </motion.button>
    )
}

/**
 * Filter chips listing every category present in the library. Toggling chips
 * narrows the visible books; the "all" chip clears the filter. Multi-select (OR).
 */
function CategoryFilter({
    categories,
    active,
    counts,
    labels,
    onToggle,
    onClear,
    allLabel,
    groupLabel,
}: CategoryFilterProps) {
    if (categories.length === 0) return null

    return (
        <div
            role="group"
            aria-label={groupLabel}
            className="flex flex-wrap justify-center gap-2 md:justify-start"
        >
            <Chip label={allLabel} selected={active.size === 0} onClick={onClear} />
            {categories.map((category) => (
                <Chip
                    key={category}
                    label={labels[category] ?? category}
                    count={counts[category]}
                    selected={active.has(category)}
                    onClick={() => onToggle(category)}
                />
            ))}
        </div>
    )
}

export default CategoryFilter
