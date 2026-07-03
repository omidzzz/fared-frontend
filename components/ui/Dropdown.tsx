'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface DropdownOption {
  value: string
  label: string
}

interface DropdownProps {
  options: DropdownOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
}

export default function Dropdown({ options, value, onChange, placeholder = 'Select…', label }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const selected = options.find((o) => o.value === value)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative w-full">
      {label && (
        <label
          className="block mb-1 text-sm text-[var(--text-secondary)]"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          {label}
        </label>
      )}

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={[
          'w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm',
          'bg-white/[0.06] backdrop-blur-md border transition-all duration-200',
          open ? 'border-[#c9a84c]' : 'border-white/10 hover:border-white/20',
          selected ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]',
        ].join(' ')}
      >
        <span>{selected?.label ?? placeholder}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[#fecb7d] text-xs ml-2"
        >
          ▾
        </motion.span>
      </button>

      {/* Options list */}
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            className={[
              'absolute z-50 mt-1 w-full rounded-xl overflow-hidden',
              'glass-dark border border-white/10',
            ].join(' ')}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            {options.map((opt, i) => (
              <motion.li
                key={opt.value}
                role="option"
                aria-selected={opt.value === value}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => { onChange(opt.value); setOpen(false) }}
                className={[
                  'px-4 py-2.5 text-sm cursor-pointer transition-colors duration-100',
                  opt.value === value
                    ? 'text-[#fecb7d] bg-[#c9a84c]/15'
                    : 'text-[var(--text-secondary)] hover:text-[#fecb7d] hover:bg-[#c9a84c]/10',
                ].join(' ')}
              >
                {opt.label}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
