'use client'

interface InputProps {
  label?: string
  placeholder?: string
  type?: string
  value: string
  onChange: (value: string) => void
  error?: string
  className?: string
}

export default function Input({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  className,
}: InputProps) {
  return (
    <div className={`flex flex-col gap-1 ${className ?? ''}`}>
      {label && (
        <label
          className="text-sm text-[var(--text-secondary)]"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={[
          'w-full px-4 py-2.5 rounded-xl text-sm',
          'bg-white/[0.06] backdrop-blur-md',
          'border transition-all duration-200 outline-none',
          'text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
          error
            ? 'border-red-500 focus:border-red-400'
            : 'border-white/10 focus:border-[#c9a84c] focus:shadow-[0_0_12px_rgba(201,168,76,0.2)]',
        ].join(' ')}
      />
      {error && (
        <p className="text-xs text-red-400 mt-0.5">{error}</p>
      )}
    </div>
  )
}
