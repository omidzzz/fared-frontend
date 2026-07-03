'use client'

interface ChipTagProps {
  label: string
  onRemove?: () => void
  active?: boolean
  onClick?: () => void
}

export default function ChipTag({ label, onRemove, active, onClick }: ChipTagProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs',
        'border transition-all duration-150 cursor-pointer',
        active
          ? 'bg-[#fecb7d] border-[#fecb7d] text-[#0a0a1a] font-medium'
          : 'glass-light border-white/10 text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:border-white/20',
      ].join(' ')}
    >
      {label}
      {onRemove && (
        <span
          role="button"
          aria-label={`Remove ${label}`}
          onClick={(e) => { e.stopPropagation(); onRemove() }}
          className={[
            'w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] leading-none',
            active ? 'hover:bg-black/20' : 'hover:bg-white/10',
          ].join(' ')}
        >
          ✕
        </span>
      )}
    </button>
  )
}
