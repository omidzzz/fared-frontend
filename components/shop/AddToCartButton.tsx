'use client'

import { motion } from 'framer-motion'

interface AddToCartButtonProps {
  onClick?: () => void
  variant?: 'default' | 'soul'
  disabled?: boolean
}

export default function AddToCartButton({
  onClick,
  variant = 'default',
  disabled,
}: AddToCartButtonProps) {
  const isSoul = variant === 'soul'

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-full font-display text-xs tracking-[0.12em] uppercase transition-all duration-200 cursor-pointer',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        isSoul
          ? 'px-5 py-2.5 bg-transparent border border-[#C9A84C]/50 text-[#FECB7D] hover:bg-[#FECB7D]/10 hover:border-[#FECB7D]/80'
          : 'px-6 py-2.5 bg-[#FECB7D] border border-[#FECB7D] text-[#0A0A1A] font-semibold hover:bg-[#C9A84C] hover:border-[#C9A84C]',
      ].join(' ')}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
      Add to Cart
    </motion.button>
  )
}
