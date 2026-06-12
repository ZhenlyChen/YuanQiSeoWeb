'use client'

import { DiscoverFilterChip } from '@/components/discover/DiscoverFilterChip'
import { useHorizontalDragScroll } from '@/lib/use-horizontal-drag-scroll'

type Props = {
  categories: string[]
  selected: string
  allLabel: string
  onChange: (categoryLabel: string) => void
  className?: string
}

export function DiscoverCategoryFilter({ categories, selected, allLabel, onChange, className }: Props) {
  const scrollRef = useHorizontalDragScroll<HTMLDivElement>()

  return (
    <div className={className} role="group" aria-label={allLabel}>
      <div
        ref={scrollRef}
        className="-mx-1 pg-hide-scrollbar flex cursor-grab gap-3 overflow-x-auto px-1 active:cursor-grabbing"
      >
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
