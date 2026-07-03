'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart-context'

interface OrderSummaryProps {
  totalPrice?: number
  totalItems?: number
  onCheckout?: () => void
}

export default function OrderSummary({ totalPrice: propPrice, totalItems: propItems, onCheckout }: OrderSummaryProps) {
  const { totalPrice: cartPrice, totalItems: cartItems } = useCart()
  const totalPrice = propPrice ?? cartPrice
  const totalItems = propItems ?? cartItems
  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5" dir="rtl">
      {/* Title */}
      <h2 className="font-farsi font-bold text-[var(--text-primary)] mb-4">
        خلاصه سفارش
      </h2>

      {/* Items count */}
      <div className="flex justify-between items-center font-farsi text-sm mb-2">
        <span className="text-[var(--text-secondary)]">تعداد اقلام</span>
        <span className="text-[var(--text-primary)]">{totalItems}</span>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center font-farsi text-sm">
        <span className="text-[var(--text-secondary)]">جمع کل</span>
        <span className="text-[var(--gold-accent)]">
          {totalPrice.toLocaleString('fa-IR')} تومان
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-white/[0.08] my-3" />

      {/* Checkout button */}
      {onCheckout ? (
        <button
          onClick={onCheckout}
          className="w-full min-h-11 rounded-xl font-farsi text-sm font-bold transition-all duration-300"
          style={{ background: 'var(--gold-accent)', color: 'var(--cosmic-dark)' }}
        >
          ادامه و پرداخت ←
        </button>
      ) : (
        <Link href="/checkout">
          <button className="w-full min-h-11 rounded-xl font-farsi text-sm font-bold transition-all duration-300"
                  style={{ background: 'var(--gold-accent)', color: 'var(--cosmic-dark)' }}>
            ادامه و پرداخت ←
          </button>
        </Link>
      )}
    </div>
  )
}
