'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MOCK_CRYSTALS } from '@/lib/mock-data'
import { useCart } from '@/lib/cart-context'

function CrystalCard({ crystal }: { crystal: typeof MOCK_CRYSTALS[0] }) {
  const { addItem } = useCart()

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      productId: crystal.id,
      productType: 'stone',
      name: crystal.name,
      nameFA: crystal.nameFA,
      price: crystal.price,
      currency: 'USD',
      quantity: 1,
      image: crystal.image,
    })
  }

  return (
    <Link href={`/product/${crystal.id}`} className="block group">
      <div
        className="relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1"
        style={{
          background: 'rgba(10,8,28,0.70)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(142,68,173,0.20)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
        }}
      >
        {/* Image — 55% of card */}
        <div className="relative overflow-hidden" style={{ height: '140px' }}>
          <Image
            src={crystal.image}
            alt={crystal.nameFA}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, 25vw"
            onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0' }}
          />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(142,68,173,0.18) 0%, transparent 55%)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(10,8,28,0.80), transparent)' }} />
        </div>

        {/* Text body */}
        <div className="flex flex-col items-center text-center px-3 py-3 gap-1 flex-1 justify-center">
          <h3 className="font-farsi font-bold text-[--text-primary] leading-tight" style={{ fontSize: '0.85rem' }}>
            {crystal.nameFA}
          </h3>
          <p className="font-farsi text-[--text-secondary] text-xs line-clamp-1">{crystal.subtitle}</p>
          <p className="font-farsi font-semibold mt-1" style={{ color: 'var(--gold-accent)', fontSize: '0.85rem' }}>
            {crystal.price.toLocaleString('fa-IR')} تومان
          </p>
          <button
            onClick={handleAdd}
            className="w-6 h-6 rounded-full flex items-center justify-center mt-0.5 transition-all duration-200 hover:scale-110"
            style={{
              background: 'rgba(142,68,173,0.15)',
              border: '1px solid rgba(142,68,173,0.50)',
              color: '#8e44ad',
              fontSize: '0.9rem',
              lineHeight: 1,
            }}
          >
            +
          </button>
        </div>
      </div>
    </Link>
  )
}

export default function FeaturedCrystals() {
  return (
    <section className="pb-6">
      {/* Section header */}
      <div className="px-4 sm:px-8 lg:px-16 pt-6 pb-4 text-center" dir="rtl">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="flex items-center gap-1 opacity-60">
            <span style={{ color: 'var(--gold-accent)', fontSize: '0.65rem' }}>&#10741;</span>
            <span style={{ color: 'var(--gold-accent)', fontSize: '0.5rem' }}>&#10741;</span>
          </div>
          <h2
            className="font-farsi font-bold text-[--text-primary]"
            style={{ fontSize: 'clamp(1.15rem, 4vw, 1.65rem)' }}
          >
            منتخب کریستال‌های انرژی
          </h2>
          <div className="flex items-center gap-1 opacity-60">
            <span style={{ color: 'var(--gold-accent)', fontSize: '0.5rem' }}>&#10741;</span>
            <span style={{ color: 'var(--gold-accent)', fontSize: '0.65rem' }}>&#10741;</span>
          </div>
        </div>
        <p className="font-farsi text-[--text-secondary] text-sm">
          هر کریستال، داستانی از زمین و انرژی کیهان است
        </p>
      </div>

      {/* Desktop: 4-col grid */}
      <div className="hidden lg:grid grid-cols-4 gap-4 px-8 xl:px-16">
        {MOCK_CRYSTALS.map((crystal) => (
          <CrystalCard key={crystal.id} crystal={crystal} />
        ))}
      </div>

      {/* Mobile: 2-col grid */}
      <div className="lg:hidden grid grid-cols-2 gap-3 px-4">
        {MOCK_CRYSTALS.map((crystal) => (
          <CrystalCard key={crystal.id} crystal={crystal} />
        ))}
      </div>

      {/* See all CTA */}
      <div className="px-4 sm:px-8 lg:px-16 pt-6 pb-6 lg:flex lg:justify-center">
        <Link
          href="/shop"
          className="w-full lg:max-w-sm flex items-center justify-center gap-2 font-farsi text-[--text-primary] transition-all duration-300"
          style={{
            padding: '14px 24px',
            borderRadius: 16,
            background: 'rgba(103,58,183,0.50)',
            border: '1px solid rgba(155,89,182,0.55)',
            backdropFilter: 'blur(8px)',
            fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)',
          }}
          dir="rtl"
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(103,58,183,0.70)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(103,58,183,0.50)' }}
        >
          <span style={{ fontSize: '0.75em', color: 'var(--gold-accent)' }}>✦</span>
          <span>مشاهده همه محصولات</span>
        </Link>
      </div>
    </section>
  )
}
