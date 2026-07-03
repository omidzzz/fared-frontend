'use client'

import { motion } from 'framer-motion'
import Spinner from './Spinner'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'gold'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    'bg-white/[0.06] backdrop-blur-md border-white/10 text-white shadow-lg shadow-black/20',
    'hover:border-[#c9a84c] hover:shadow-[0_0_20px_rgba(201,168,76,0.25)] hover:bg-white/[0.09]',
  ].join(' '),
  secondary: [
    'bg-transparent border-[#c9a84c] text-[#fecb7d] shadow-md shadow-black/10',
    'hover:bg-[#c9a84c]/10 hover:shadow-lg',
  ].join(' '),
  ghost: [
    'bg-transparent border-transparent text-white shadow-sm',
    'hover:border-white/50 hover:bg-white/5 hover:shadow-md',
  ].join(' '),
  gold: [
    'bg-[#fecb7d] border-[#fecb7d] text-[#0a0a1a] font-semibold shadow-lg shadow-amber-500/30',
    'hover:bg-[#c9a84c] hover:border-[#c9a84c] hover:shadow-xl hover:shadow-amber-500/40',
  ].join(' '),
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-1.5 text-sm',
  md: 'px-6 py-2.5 text-base',
  lg: 'px-8 py-3.5 text-lg',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading,
  disabled,
  children,
  onClick,
  className,
  type = 'button',
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      whileHover={{ scale: isDisabled ? 1 : 1.02 }}
      whileTap={{ scale: isDisabled ? 1 : 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={[
        'rounded-full font-display border transition-all duration-200',
        'flex items-center justify-center gap-2 cursor-pointer',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className ?? '',
      ].join(' ')}
    >
      {loading ? <Spinner size="sm" /> : children}
    </motion.button>
  )
}
