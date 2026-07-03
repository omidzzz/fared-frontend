'use client'

import { useState } from 'react'

interface StarRatingProps {
  rating: number
  size?: 'sm' | 'md'
  interactive?: boolean
  onChange?: (rating: number) => void
}

const sizeMap = { sm: 'w-4 h-4', md: 'w-5 h-5' }

export default function StarRating({ rating, size = 'md', interactive, onChange }: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null)
  const display = hovered ?? rating

  return (
    <div
      className="flex items-center gap-0.5"
      onMouseLeave={() => interactive && setHovered(null)}
    >
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i < display
        return (
          <svg
            key={i}
            viewBox="0 0 24 24"
            className={[
              sizeMap[size],
              'transition-colors duration-100',
              interactive ? 'cursor-pointer' : '',
              filled ? 'text-[#fecb7d]' : 'text-[var(--text-muted)]',
            ].join(' ')}
            fill={filled ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={1.5}
            onMouseEnter={() => interactive && setHovered(i + 1)}
            onClick={() => interactive && onChange?.(i + 1)}
          >
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        )
      })}
    </div>
  )
}
