'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import DynamicHeader from '@/components/layout/DynamicHeader'
import { HeroShimmer } from '@/components/ui/HeroShimmer'
import { MOCK_EDUCATIONAL } from '@/lib/mock-data'
import type { EducationalPost } from '@/lib/mock-data'

export default function EducationalDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const item = MOCK_EDUCATIONAL.find((e: EducationalPost) => e.slug === slug)

  if (!item) {
    return (
      <main className="page-gradient-heart min-h-screen pt-[80px] flex items-center justify-center px-4">
        <div className="text-center" dir="rtl">
          <h1 className="font-farsi font-bold text-2xl text-[var(--text-primary)] mb-4">
            محتوا یافت نشد
          </h1>
          <Link href="/tahririye/educational">
            <button className="px-6 py-3 rounded-xl font-farsi text-sm min-h-11 transition-all duration-300"
                    style={{ border: '1px solid rgba(254,203,125,0.50)', color: 'var(--gold-accent)' }}>
              ← بازگشت به مطالب آموزشی
            </button>
          </Link>
        </div>
      </main>
    )
  }

  const paragraphs = item.bodyFA.split('\n').filter(Boolean)

  return (
    <main className="page-gradient-heart min-h-screen">
      {/* Section 1 — Header */}
      <DynamicHeader />

      {/* Section 2 — Hero */}
      <section className="px-4 pt-[88px] pb-4">
        <div className="relative rounded-3xl overflow-hidden aspect-[16/9]">
          <Image
            src={item.image}
            alt={item.titleFA}
            fill
            className="object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <HeroShimmer />
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-5" dir="rtl">
            <h1 className="font-display text-2xl text-[var(--text-primary)]">
              {item.titleFA}
            </h1>
            <div className="flex flex-wrap gap-2 mt-2">
              {item.tags.map((tag: string) => (
                <span key={tag} className="text-[10px] font-farsi px-2 py-0.5 rounded-full bg-white/[0.10] text-[var(--text-secondary)]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — Quick-Nav: OMITTED */}

      {/* Section 4 — Content */}
      <section className="px-4 py-4">
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5" dir="rtl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-farsi font-bold text-base text-[var(--text-primary)]">
              {item.titleFA}
            </h2>
            <span className="text-[10px] font-farsi px-2 py-0.5 rounded-full bg-white/[0.05] text-[var(--text-muted)]">
              {item.readMinutes} دقیقه
            </span>
          </div>
          {paragraphs.map((para: string, i: number) => (
            <p key={i} className="font-farsi text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
              {para}
            </p>
          ))}
        </div>

        <Link href="/tahririye/educational" className="flex items-center justify-center mt-4">
          <span className="font-farsi text-sm text-[var(--text-muted)]">
            ← بازگشت به مطالب آموزشی
          </span>
        </Link>
      </section>

      {/* Section 5 — Footer Badges */}
    </main>
  )
}
