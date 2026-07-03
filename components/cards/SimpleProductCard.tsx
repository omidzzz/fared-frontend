'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface SimpleProductCardProps {
  id: string
  name: string
  price: number
  image: string
  glowColor: string
  colors: string[]
  onAddToCart?: () => void
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}

export default function SimpleProductCard({
  id,
  name,
  price,
  image,
  glowColor,
  colors,
  onAddToCart,
}: SimpleProductCardProps) {
  const rgb = hexToRgb(glowColor)

  return (
    <Link href={`/product/${id}`} className="block">
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative cursor-pointer"
      >
      <div
        className="relative w-full overflow-hidden"
        style={{
          borderRadius: 16,
          border: '1px solid rgba(201,168,76,0.3)',
          background: 'linear-gradient(180deg, #1A0F05 0%, #120A03 100%)',
        }}
      >
        {/* Layer 1 — Warm glow behind figure */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 70% at 50% 35%, rgba(${rgb},0.4) 0%, rgba(${rgb},0.15) 50%, transparent 75%)`,
          }}
        />

        {/* Layer 2 — Product image */}
        <div className="relative w-full" style={{ paddingBottom: '110%' }}>
          <div className="absolute inset-0">
            <img
              src={`/images/products/clothes/${image}`}
              alt={name}
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-16 h-32 rounded-full opacity-20"
                style={{
                  background: `radial-gradient(ellipse, ${glowColor}, transparent)`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Layer 4 — Bottom content */}
        <div className="px-3 pb-3 pt-2">
          {/* Name */}
          <p className="font-display text-[11px] tracking-[0.15em] uppercase text-center text-[#F0EBE3] leading-tight mb-1">
            {name}
          </p>

          {/* Price */}
          <p className="text-center text-[#FECB7D] text-sm font-semibold mb-2">
            ${price.toFixed(2)}
          </p>

          {/* Color swatches */}
          <div className="flex items-center justify-center gap-1.5 mb-3">
            {colors.map((color, i) => (
              <button
                key={i}
                className="w-3.5 h-3.5 rounded-full border border-white/20 hover:scale-110 hover:border-[#FECB7D]/50 transition-all duration-200"
                style={{ backgroundColor: color }}
                aria-label={`Color ${i + 1}`}
              />
            ))}
          </div>

          {/* Add to Cart row */}
          <div className="flex items-center justify-between gap-2 border-t border-white/10 pt-2.5">
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onAddToCart?.()
              }}
              className="flex items-center gap-1.5 text-[10px] tracking-[0.12em] uppercase text-[#B8AEAD] hover:text-[#FECB7D] transition-colors"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      </motion.div>
    </Link>
  )
}
