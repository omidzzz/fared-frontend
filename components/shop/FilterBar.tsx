'use client'

import ChipTag from '@/components/ui/ChipTag'
import Dropdown from '@/components/ui/Dropdown'

interface FilterBarProps {
  activeFilters?: string[]
  onRemoveFilter?: (filter: string) => void
  sortValue?: string
  onSortChange?: (value: string) => void
}

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
]

const DEFAULT_FILTERS = ['Chakra Aligned', 'Handmade', 'Ethically Sourced']

export default function FilterBar({
  activeFilters = DEFAULT_FILTERS,
  onRemoveFilter,
  sortValue = 'newest',
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="sticky top-20 z-30 py-3">
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-2xl"
        style={{
          background: 'rgba(10,10,26,0.7)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide flex-1">
          {activeFilters.map((f) => (
            <ChipTag
              key={f}
              label={f}
              active
              onRemove={onRemoveFilter ? () => onRemoveFilter(f) : undefined}
            />
          ))}
        </div>

        <div className="flex-shrink-0 w-40">
          <Dropdown
            options={SORT_OPTIONS}
            value={sortValue}
            onChange={(v) => onSortChange?.(v)}
            placeholder="Sort by"
          />
        </div>
      </div>
    </div>
  )
}
