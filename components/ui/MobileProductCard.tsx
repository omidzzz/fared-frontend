'use client'

import Image from 'next/image'
import Link from 'next/link'

export interface MobileProductCardProps {
  id: string
  name: string
  nameFA?: string
  price: number
  image: string
  accentColor?: string
  href?: string
  onAddToCart?: () => void
}

export default function MobileProductCard({
  id,
  name,
  nameFA,
  price,
  image,
  accentColor,
  href,
  onAddToCart,
}: MobileProductCardProps) {
  return (
    <Link href={href ?? `/product/${id}`}>
      <div
        className="relative rounded-2xl overflow-hidden active:scale-[0.97] transition-all duration-300 border border-white/[0.08]"
        style={{ height: '220px' }}
      >
        {/* Image — full card, 100% height */}
        <Image
          src={image}
          fill
          className="object-cover object-center"
          alt={nameFA ?? name}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none'
          }}
        />

        {/* Glass info strip — pinned to bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 px-3 py-3 flex flex-col items-center text-center"
          style={{
            background: 'rgba(7, 7, 20, 0.55)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Product name */}
          <p className="font-farsi font-bold text-xs text-[var(--text-primary)] leading-tight line-clamp-1 w-full text-center">
            {nameFA ?? name}
          </p>

          {/* Price */}
          <p
            className="font-farsi text-xs font-bold mt-1"
            style={{ color: accentColor ?? 'var(--gold-accent)' }}
          >
            {price.toLocaleString('fa-IR')} تومان
          </p>

          {/* Add to cart button */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAddToCart?.() }}
            className="w-full mt-2 py-1.5 rounded-lg font-farsi text-xs font-bold min-h-9 transition-all duration-200 active:scale-[0.97]"
            style={{
              background: `${accentColor ?? 'var(--gold-accent)'}33`,
              border: `1px solid ${accentColor ?? 'var(--gold-accent)'}66`,
              color: 'var(--text-primary)',
            }}
          >
            افزودن به سبد
          </button>
        </div>

        {/* Subtle top-to-transparent gradient */}
        <div
          className="absolute top-0 left-0 right-0 h-12 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(7,7,20,0.30), transparent)',
          }}
        />
      </div>
    </Link>
  )
}
