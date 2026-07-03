'use client'

import Image from 'next/image'
import Link from 'next/link'
import DynamicHeader from '@/components/layout/DynamicHeader'
import { HeroShimmer } from '@/components/ui/HeroShimmer'
import { MOCK_BOOKS } from '@/lib/mock-data'
import type { Book } from '@/lib/mock-data'

function StarRating({ rating }: { rating: number }) {
  const stars: string[] = []
  for (let i = 1; i <= 5; i++) {
    stars.push(i <= Math.round(rating) ? '★' : '☆')
  }
  return <span className="text-xs" style={{ color: 'var(--gold-accent)' }}>{stars.join('')} {rating}</span>
}

export default function BooksPage() {
  return (
    <main className="page-gradient-crown min-h-screen">
      {/* Section 1 — Header */}
      <DynamicHeader />

      {/* Section 2 — Isolated Hero */}
      <section className="px-4 pt-[88px] pb-4">
        <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
          <Image
            src="/images/tahririye/books-card.webp"
            alt=""
            fill
            className="object-cover"
            priority
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <HeroShimmer />
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-6" dir="rtl">
            <h1 className="font-display text-3xl text-[var(--text-primary)]">
              معرفی کتاب
            </h1>
            <p className="font-farsi text-sm text-[var(--text-secondary)] mt-1">
              کتاب‌هایی برای روح
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 — Books Grid */}
      <section className="px-4 py-6">
        <h2 className="font-display text-xl text-[var(--text-primary)] mb-4" dir="rtl">
          کتاب‌های پیشنهادی
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {MOCK_BOOKS.map((book: Book) => (
            <Link key={book.id} href={`/tahririye/books/${book.slug}`}>
              <div className="rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.08] active:scale-[0.97] transition-all duration-200 cursor-pointer">
                {/* Cover */}
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={book.coverImage}
                    alt={book.coverAlt ?? book.titleFA}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/tahririye/books-card.webp'
                    }}
                  />
                  <div className="absolute inset-0"
                       style={{ background: 'linear-gradient(to top, rgba(10,10,32,0.8) 0%, transparent 40%)' }} />
                </div>
                {/* Body */}
                <div className="p-3" dir="rtl">
                  <p className="font-farsi font-bold text-xs text-[var(--text-primary)] line-clamp-1">
                    {book.titleFA}
                  </p>
                  <p className="font-farsi text-[10px] text-[var(--text-muted)] mt-0.5">
                    {book.authorFA}
                  </p>
                  <div className="mt-1">
                    <StarRating rating={book.rating} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 5 — Footer */}
    </main>
  )
}
