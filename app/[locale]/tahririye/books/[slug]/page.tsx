'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import DynamicHeader from '@/components/layout/DynamicHeader'
import { HeroShimmer } from '@/components/ui/HeroShimmer'
import { MOCK_BOOKS } from '@/lib/mock-data'
import type { Book } from '@/lib/mock-data'

function StarRating({ rating }: { rating: number }) {
  const stars: string[] = []
  for (let i = 1; i <= 5; i++) {
    stars.push(i <= Math.round(rating) ? '★' : '☆')
  }
  return <span>{stars.join('')}</span>
}

export default function BookDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const book = MOCK_BOOKS.find((b: Book) => b.slug === slug)

  if (!book) {
    return (
      <main className="page-gradient-crown min-h-screen flex items-center justify-center px-4">
        <div className="text-center" dir="rtl">
          <h1 className="font-display text-2xl text-[var(--text-primary)] mb-4">
            کتاب یافت نشد
          </h1>
          <Link href="/tahririye/books">
            <button className="px-6 py-3 rounded-xl font-farsi text-sm min-h-11 transition-all duration-300"
                    style={{ border: '1px solid rgba(254,203,125,0.50)', color: 'var(--gold-accent)' }}>
              ← بازگشت به معرفی کتاب
            </button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="page-gradient-crown min-h-screen">
      {/* Section 1 — Header */}
      <DynamicHeader />

      {/* Section 2 — Book Hero */}
      <section className="px-4 pt-[88px] pb-4">
        <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: '3/4', maxHeight: '60vh' }}>
          <Image
            src={book.coverImage}
            alt={book.coverAlt ?? book.titleFA}
            fill
            className="object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <HeroShimmer />
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-6" dir="rtl">
            <span className="font-farsi text-[10px] px-3 py-1 rounded-full w-fit"
                  style={{
                    background: 'rgba(142,68,173,0.15)',
                    border: '1px solid rgba(142,68,173,0.30)',
                    color: 'var(--chakra-third)',
                  }}>
              {book.categoryFA}
            </span>
            <h1 className="font-display text-2xl text-[var(--text-primary)] mt-2">
              {book.titleFA}
            </h1>
            <p className="font-farsi text-sm text-[var(--text-secondary)] mt-1">
              {book.authorFA}
            </p>
            <div className="mt-1 text-[var(--gold-accent)]">
              <StarRating rating={book.rating} />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — Book Body */}
      <section className="px-4 py-6 flex flex-col gap-4">
        {/* Block A — Book Details */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5" dir="rtl">
          <div className="flex justify-between items-center border-b border-white/[0.05] py-2.5">
            <span className="font-farsi text-xs text-[var(--text-secondary)]">نویسنده</span>
            <span className="font-farsi text-xs text-[var(--text-primary)]">{book.authorFA}</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/[0.05] py-2.5">
            <span className="font-farsi text-xs text-[var(--text-secondary)]">ژانر</span>
            <span className="font-farsi text-xs text-[var(--text-primary)]">{book.categoryFA}</span>
          </div>
          <div className="flex justify-between items-center py-2.5">
            <span className="font-farsi text-xs text-[var(--text-secondary)]">امتیاز</span>
            <span className="font-farsi text-xs text-[var(--text-primary)]">
              <StarRating rating={book.rating} /> /۵ ⭐
            </span>
          </div>
        </div>

        {/* Block B — Summary */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5" dir="rtl">
          <h2 className="font-farsi font-bold text-sm text-[var(--text-primary)] mb-3">
            درباره کتاب
          </h2>
          <p className="font-farsi text-sm text-[var(--text-secondary)] leading-relaxed">
            {book.descriptionFA}
          </p>
        </div>

        {/* Block C — Buy Buttons */}
        <div className="flex flex-col gap-3">
          <a href={`https://ketabrah.ir/search?q=${encodeURIComponent(book.titleFA)}`} target="_blank" rel="noopener noreferrer">
            <div className="w-full min-h-11 rounded-xl flex items-center justify-center font-farsi text-sm font-bold active:scale-[0.98] transition-all duration-200"
                 style={{ background: 'var(--gold-accent)', color: 'var(--cosmic-dark)' }}>
              خرید کتاب ←
            </div>
          </a>
          <a href={`https://fidibo.com/search?query=${encodeURIComponent(book.titleFA)}`} target="_blank" rel="noopener noreferrer">
            <div className="w-full min-h-11 rounded-xl flex items-center justify-center font-farsi text-sm border active:scale-[0.98] transition-all duration-200"
                 style={{ borderColor: 'rgba(255,255,255,0.10)', background: 'rgba(255,255,255,0.03)', color: 'var(--text-primary)' }}>
              جستجو در فیدیبو
            </div>
          </a>
        </div>

        {/* Back link */}
        <Link href="/tahririye/books">
          <div className="flex items-center justify-center gap-2 font-farsi text-sm text-[var(--text-muted)] py-2 mt-2">
            ← بازگشت به معرفی کتاب
          </div>
        </Link>
      </section>

      {/* Section 5 — Footer */}
    </main>
  )
}
