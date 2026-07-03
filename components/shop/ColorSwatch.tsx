'use client'

import { cn } from '@/lib/utils'

interface ColorSwatchProps {
  colors: string[]
  selectedColor?: string
  onSelect?: (color: string) => void
  size?: 'sm' | 'md'
}

const sizeMap = { sm: 'w-3 h-3', md: 'w-5 h-5' }

export default function ColorSwatch({
  colors,
  selectedColor,
  onSelect,
  size = 'sm',
}: ColorSwatchProps) {
  return (
    <div className="flex items-center gap-1.5">
      {colors.map((color) => {
        const isSelected = selectedColor === color
        return (
          <button
            key={color}
            type="button"
            onClick={() => onSelect?.(color)}
            className={cn(
              sizeMap[size],
              'rounded-full border transition-all duration-200 cursor-pointer',
              isSelected
                ? 'border-[#FECB7D] scale-110 ring-1 ring-[#FECB7D]/30'
                : 'border-white/20 hover:border-white/50 hover:scale-110',
            )}
            style={{ backgroundColor: color }}
            aria-label={`Color ${color}`}
          />
        )
      })}
    </div>
  )
}
