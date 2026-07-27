'use client'

import { motion } from 'framer-motion'

interface CategoryFilterProps {
  categories: string[]
  /** Currently active categories (empty = show everything). */
  active: Set<string>
  counts: Record<string, number>
  onToggle: (category: string) => void
  onClear: () => void
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
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
        selected
          ? 'border-black bg-black text-white'
          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
      }`}
    >
      {label}
      {typeof count === 'number' && (
        <span
          className={`text-xs tabular-nums ${
            selected ? 'text-white/70' : 'text-gray-400'
          }`}
        >
          {count}
        </span>
      )}
    </motion.button>
  )
}

/**
 * Filter chips listing every category present in the library. Toggling chips
 * narrows the visible books; "Tutti" clears the filter. Multi-select (OR).
 */
function CategoryFilter({
  categories,
  active,
  counts,
  onToggle,
  onClear,
}: CategoryFilterProps) {
  if (categories.length === 0) return null

  return (
    <div
      role="group"
      aria-label="Filtra per categoria"
      className="flex flex-wrap justify-center gap-2 md:justify-start"
    >
      <Chip label="Tutti" selected={active.size === 0} onClick={onClear} />
      {categories.map((category) => (
        <Chip
          key={category}
          label={category}
          count={counts[category]}
          selected={active.has(category)}
          onClick={() => onToggle(category)}
        />
      ))}
    </div>
  )
}

export default CategoryFilter
