'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import DynamicHeader from '@/components/layout/DynamicHeader'
import { HeroShimmer } from '@/components/ui/HeroShimmer'
import { MOCK_ARTICLES } from '@/lib/mock-data'
import type { Article } from '@/lib/mock-data'

export default function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const article = MOCK_ARTICLES.find((a: Article) => a.slug === slug)

  if (!article) {
    return (
      <main className="page-gradient-throat min-h-screen pt-[80px] flex items-center justify-center px-4">
        <div className="text-center" dir="rtl">
          <h1 className="font-farsi font-bold text-2xl text-[var(--text-primary)] mb-4">
            مقاله یافت نشد
          </h1>
          <Link href="/tahririye/articles">
            <button className="px-6 py-3 rounded-xl font-farsi text-sm min-h-11 transition-all duration-300"
                    style={{ border: '1px solid rgba(254,203,125,0.50)', color: 'var(--gold-accent)' }}>
              ← بازگشت به مقالات
            </button>
          </Link>
        </div>
      </main>
    )
  }

  const paragraphs = article.bodyFA.split('\n').filter(Boolean)

  return (
    <main className="page-gradient-throat min-h-screen">
      {/* Section 1 — Header */}
      <DynamicHeader />

      {/* Section 2 — Hero */}
      <section className="px-4 pt-[88px] pb-4">
        <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
          <Image
            src={article.image}
            alt={article.titleFA}
            fill
            className="object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <HeroShimmer />
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-6" dir="rtl">
            <h1 className="font-display text-2xl text-[var(--text-primary)]">
              {article.titleFA}
            </h1>
            <p className="font-farsi text-xs text-[var(--text-secondary)] mt-2">
              {article.authorFA} · {article.publishedDate}
            </p>
            <span className="text-[10px] font-farsi px-2 py-0.5 rounded-full bg-white/[0.10] text-[var(--text-secondary)] inline-block mt-2 w-fit">
              {article.readMinutes} دقیقه
            </span>
          </div>
        </div>
      </section>

      {/* Section 3 — Quick-Nav: OMITTED */}

      {/* Section 4 — Article Body */}
      <section className="px-4 py-6">
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5" dir="rtl">
          {/* Category pill */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            <span className="text-[10px] font-farsi px-2 py-0.5 rounded-full"
                  style={{
                    background: 'rgba(41,128,185,0.15)',
                    border: '1px solid rgba(41,128,185,0.30)',
                    color: 'var(--chakra-throat)',
                  }}>
              {article.categoryFA}
            </span>
          </div>

          {/* Content */}
          {paragraphs.map((para: string, i: number) => (
            <p key={i} className="font-farsi text-sm text-[var(--text-secondary)] leading-[1.9] mb-4">
              {para}
            </p>
          ))}

          {/* Bottom divider + author */}
          <div className="border-t border-white/[0.06] pt-4 mt-2">
            <p className="font-farsi text-xs text-[var(--text-muted)]">
              نوشته: {article.authorFA}
            </p>
          </div>
        </div>

        <Link href="/tahririye/articles" className="flex items-center justify-center mt-6">
          <span className="font-farsi text-sm text-[var(--text-muted)]">
            ← بازگشت به مقالات
          </span>
        </Link>
      </section>

      {/* Section 5 — Footer Badges */}
    </main>
  )
}
