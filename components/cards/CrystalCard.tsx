'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { CategoryHandle } from '@/types/product'

interface CrystalCardProps {
  id: string
  name: string
  price: number
  image: string
  category: CategoryHandle
  onAddToCart?: () => void
}

const categoryGlows: Record<CategoryHandle, string> = {
  clothes: 'rgba(192,57,43,0.3)',
  stones: 'rgba(41,128,185,0.3)',
  tours: 'rgba(39,174,96,0.3)',
  candles: 'rgba(230,126,34,0.3)',
  courses: 'rgba(142,68,173,0.3)',
  mentorship: 'rgba(155,89,182,0.3)',
  accessories: 'rgba(241,196,15,0.3)',
}

export default function CrystalCard({
  id,
  name,
  price,
  image,
  category,
  onAddToCart,
}: CrystalCardProps) {
  const glowColor = categoryGlows[category]

  return (
    <Link href={`/product/${id}`} className="block">
      <motion.div
        className="relative group cursor-pointer"
        whileHover={{ y: -6 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
      <div
        className="relative rounded-2xl overflow-hidden transition-all duration-400"
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(254,203,125,0.5)'
          e.currentTarget.style.boxShadow = `0 0 30px ${glowColor}, 0 4px 24px rgba(0,0,0,0.3)`
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {/* Image */}
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, rgba(10,10,26,0.7) 0%, transparent 40%)`,
            }}
          />

        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-display text-sm text-[#F0EBE3] group-hover:text-[#FECB7D] transition-colors duration-200 mb-1">
            {name}
          </h3>
          <p className="text-[#FECB7D] text-sm font-semibold mb-3">
            ${price.toFixed(2)}
          </p>

          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onAddToCart?.()
            }}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-full border border-[#C9A84C]/40 text-[#FECB7D] text-[10px] tracking-[0.12em] uppercase hover:bg-[#FECB7D]/10 hover:border-[#FECB7D]/70 transition-all duration-200"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
      </motion.div>
    </Link>
  )
}
