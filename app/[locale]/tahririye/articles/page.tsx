'use client'

import Image from 'next/image'
import Link from 'next/link'
import DynamicHeader from '@/components/layout/DynamicHeader'
import { HeroShimmer } from '@/components/ui/HeroShimmer'
import { MOCK_ARTICLES } from '@/lib/mock-data'
import type { Article } from '@/lib/mock-data'

export default function ArticlesPage() {
  return (
    <main className="page-gradient-throat min-h-screen">
      {/* Section 1 — Header */}
      <DynamicHeader />

      {/* Section 2 — Isolated Hero */}
      <section className="px-4 pt-[88px] pb-4">
        <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
          <Image
            src="/images/tahririye/articles-card.webp"
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
              مقاله‌ها
            </h1>
            <p className="font-farsi text-sm text-[var(--text-secondary)] mt-1">
              اندیشه و پژوهش
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 — Quick-Nav: OMITTED */}

      {/* Section 4 — Articles List */}
      <section className="px-4 py-6 flex flex-col gap-4">
        <h2 className="font-display text-xl text-[var(--text-primary)]" dir="rtl">
          آخرین مقالات
        </h2>
        {MOCK_ARTICLES.map((article: Article) => (
          <Link key={article.id} href={`/tahririye/articles/${article.slug}`}>
            <div className="rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.08] active:scale-[0.98] transition-all duration-200">
              {/* Thumbnail */}
              <div className="relative h-[140px] w-full">
                <Image
                  src={article.image}
                  alt={article.titleFA}
                  fill
                  className="object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              {/* Body */}
              <div className="p-4" dir="rtl">
                <h3 className="font-farsi font-bold text-sm text-[var(--text-primary)] mb-2">
                  {article.titleFA}
                </h3>
                <p className="font-farsi text-xs text-[var(--text-muted)] mb-2">
                  {article.authorFA} · {article.publishedDate} · {article.readMinutes} دقیقه
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-farsi px-2 py-0.5 rounded-full"
                        style={{
                          background: 'rgba(41,128,185,0.15)',
                          border: '1px solid rgba(41,128,185,0.30)',
                          color: 'var(--chakra-throat)',
                        }}>
                    {article.categoryFA}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Section 5 — Footer Badges */}
    </main>
  )
}
