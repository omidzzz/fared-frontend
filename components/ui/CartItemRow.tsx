'use client'

import Image from 'next/image'
import type { LocalCartItem } from '@/lib/cart-context'

interface CartItemRowProps {
  item: LocalCartItem
  onRemove: (id: string) => void
  onQuantityChange: (id: string, qty: number) => void
}

export default function CartItemRow({ item, onRemove, onQuantityChange }: CartItemRowProps) {
  const handleDecrease = () => {
    if (item.quantity <= 1) {
      onRemove(item.id)
    } else {
      onQuantityChange(item.id, item.quantity - 1)
    }
  }

  return (
    <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
      {/* Left: product image */}
      <div className="w-20 h-20 rounded-xl overflow-hidden relative flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
      </div>

      {/* Right: details */}
      <div className="flex-1 flex flex-col justify-between" dir="rtl">
        {/* Top row: name + remove */}
        <div className="flex items-start justify-between gap-2">
          <p className="font-farsi text-sm text-[var(--text-primary)] leading-tight line-clamp-2">
            {item.name}
          </p>
          <button
            onClick={() => onRemove(item.id)}
            className="text-[var(--text-muted)] text-lg min-h-11 min-w-11 flex items-start justify-center"
          >
            ×
          </button>
        </div>

        {/* Price */}
        <p className="font-farsi text-sm text-[var(--gold-accent)] mt-1">
          {(item.price * item.quantity).toLocaleString('fa-IR')} تومان
        </p>

        {/* Quantity row */}
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={handleDecrease}
            className="w-8 h-8 rounded-lg border border-white/[0.10] text-[var(--text-primary)] flex items-center justify-center min-h-11 min-w-11 transition-all duration-200 hover:bg-white/[0.06]"
          >
            −
          </button>
          <span className="font-farsi text-[var(--text-primary)] w-5 text-center text-sm">
            {item.quantity}
          </span>
          <button
            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
            className="w-8 h-8 rounded-lg border border-white/[0.10] text-[var(--text-primary)] flex items-center justify-center min-h-11 min-w-11 transition-all duration-200 hover:bg-white/[0.06]"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}
