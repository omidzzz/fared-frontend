'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/lib/cart-context'

export type GlowCardItem = {
  id: string
  name: string
  nameFA: string
  price: number
  currency: string
  image: string
  chakraColor: string  // CSS var name, e.g. '--chakra-throat'
  subtitle?: string
  subtitleFA?: string
  href?: string
}

type GlowCardProps = {
  item: GlowCardItem
  size?: 'sm' | 'md' | 'lg'
  showFarsi?: boolean
}

const SIZE_CONFIG = {
  sm: { width: 140, imageHeight: 110, fontSize: '0.65rem', priceSize: '0.72rem' },
  md: { width: 160, imageHeight: 140, fontSize: '0.72rem', priceSize: '0.82rem' },
  lg: { width: 200, imageHeight: 180, fontSize: '0.80rem', priceSize: '0.92rem' },
}

export default function GlowCard({ item, size = 'md', showFarsi = true }: GlowCardProps) {
  const { addItem } = useCart()
  const [added,   setAdded]   = useState(false)
  const [hovered, setHovered] = useState(false)
  const cfg = SIZE_CONFIG[size]

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      productId:   item.id,
      productType: 'stone',
      name:        item.name,
      nameFA:      item.nameFA,
      price:       item.price,
      currency:    'USD',
      quantity:    1,
      image:       item.image,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const inner = (
    <div
      className="relative flex flex-col cursor-pointer flex-shrink-0 select-none"
      style={{ width: cfg.width }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Outer chakra glow — sits behind card border */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 30%, var(${item.chakraColor}) 0%, transparent 70%)`,
          opacity: hovered ? 0.22 : 0.08,
          filter: 'blur(12px)',
          transform: 'scale(1.1)',
          transition: 'opacity 0.5s ease',
          zIndex: 0,
        }}
      />

      {/* Card body */}
      <div
        className="relative flex flex-col rounded-2xl overflow-hidden"
        style={{
          background: hovered
            ? 'linear-gradient(160deg, rgba(20,15,45,0.92) 0%, rgba(10,8,30,0.97) 100%)'
            : 'linear-gradient(160deg, rgba(15,12,38,0.88) 0%, rgba(8,6,24,0.95) 100%)',
          border: hovered
            ? `1px solid var(${item.chakraColor})`
            : '1px solid rgba(255,255,255,0.08)',
          boxShadow: hovered
            ? '0 8px 32px rgba(0,0,0,0.50), 0 0 0 1px rgba(255,255,255,0.04) inset'
            : '0 4px 16px rgba(0,0,0,0.35)',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'all 0.3s ease',
          zIndex: 1,
        }}
      >
        {/* Image */}
        <div className="relative overflow-hidden flex-shrink-0" style={{ height: cfg.imageHeight, width: '100%' }}>
          <Image
            src={item.image}
            alt={showFarsi ? item.nameFA : item.name}
            fill
            className="object-cover"
            style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)', transition: 'transform 0.7s ease' }}
            sizes={`${cfg.width}px`}
            onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0' }}
          />
          {/* Chakra color tint at image bottom */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(to top, var(${item.chakraColor}) 0%, transparent 55%)`,
              opacity: 0.18,
            }}
          />
          {/* Dark fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(10,8,30,0.90) 0%, transparent 100%)' }}
          />
          {/* Chakra dot top-left */}
          <div
            className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full"
            style={{
              background: `var(${item.chakraColor})`,
              boxShadow: `0 0 6px var(${item.chakraColor})`,
              opacity: 0.7,
            }}
          />
        </div>

        {/* Text area */}
        <div className="flex flex-col px-3 pt-2 pb-3 gap-1" dir="rtl">
          <p
            className="font-farsi font-semibold text-[--text-primary] truncate leading-snug"
            style={{ fontSize: cfg.fontSize }}
          >
            {showFarsi ? item.nameFA : item.name}
          </p>

          {(showFarsi ? item.subtitleFA : item.subtitle) && (
            <p
              className="font-farsi text-[--text-muted] truncate"
              style={{ fontSize: `calc(${cfg.fontSize} - 0.08rem)` }}
            >
              {showFarsi ? item.subtitleFA : item.subtitle}
            </p>
          )}

          {/* Price + Add button */}
          <div className="flex items-center justify-between mt-1.5">
            <p className="font-farsi font-semibold" style={{ color: 'var(--gold-accent)', fontSize: cfg.priceSize }}>
              {item.currency === 'USD'
                ? `$${item.price.toFixed(2)}`
                : `${item.price.toLocaleString('fa-IR')} تومان`}
            </p>

            <button
              onClick={handleAdd}
              className="flex items-center justify-center rounded-full flex-shrink-0 active:scale-90"
              style={{
                width: 30,
                height: 30,
                background: added ? 'rgba(39,174,96,0.30)' : `var(${item.chakraColor})`,
                border: 'none',
                boxShadow: hovered && !added ? `0 0 12px var(${item.chakraColor})` : 'none',
                transition: 'all 0.2s ease',
              }}
              aria-label={`افزودن ${item.nameFA} به سبد`}
            >
              {added ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5"  y1="12" x2="19" y2="12"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  if (item.href) {
    return (
      <Link href={item.href} className="block flex-shrink-0" style={{ width: cfg.width }}>
        {inner}
      </Link>
    )
  }

  return inner
}
