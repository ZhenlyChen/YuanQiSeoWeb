'use client'

import { DiscoverFilterChip } from '@/components/discover/DiscoverFilterChip'

type Props = {
  categories: string[]
  selected: string
  allLabel: string
  onChange: (categoryLabel: string) => void
  className?: string
}

export function DiscoverCategoryFilter({ categories, selected, allLabel, onChange, className }: Props) {
  return (
    <div className={className} role="group" aria-label={allLabel}>
      <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1 [scrollbar-width:thin]">
        <DiscoverFilterChip
          selected={selected === ''}
          label={allLabel}
          onClick={() => onChange('')}
        />
        {categories.map((label) => (
          <DiscoverFilterChip
            key={label}
            selected={selected === label}
            label={label}
            onClick={() => onChange(label)}
          />
        ))}
      </div>
    </div>
  )
}
