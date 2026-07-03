'use client'

import Image from 'next/image'
import Link from 'next/link'
import DynamicHeader from '@/components/layout/DynamicHeader'
import { HeroShimmer } from '@/components/ui/HeroShimmer'
import { MOCK_EDUCATIONAL } from '@/lib/mock-data'
import type { EducationalPost } from '@/lib/mock-data'

export default function EducationalPage() {
  return (
    <main className="page-gradient-heart min-h-screen">
      {/* Section 1 — Header */}
      <DynamicHeader />

      {/* Section 2 — Isolated Hero */}
      <section className="px-4 pt-[88px] pb-4">
        <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
          <Image
            src="/images/tahririye/educational-card.webp"
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
              مطالب آموزشی رایگان
            </h1>
            <p className="font-farsi text-sm text-[var(--text-secondary)] mt-1">
              دانش رایگان برای همه
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 — Quick-Nav: OMITTED */}

      {/* Section 4 — Content Stream */}
      <section className="px-4 py-6 flex flex-col gap-4">
        <h2 className="font-display text-xl text-[var(--text-primary)]" dir="rtl">
          دوره‌های آموزشی
        </h2>
        {MOCK_EDUCATIONAL.map((item: EducationalPost) => (
          <Link key={item.id} href={`/tahririye/educational/${item.slug}`}>
            <div className="rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.08] flex flex-row h-[100px] active:scale-[0.98] transition-all duration-200">
              {/* Left: thumbnail */}
              <div className="w-[100px] h-full relative flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.titleFA}
                  fill
                  className="object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
                <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-r from-transparent to-[rgba(7,7,20,0.85)]" />
              </div>

              {/* Right: content */}
              <div className="flex flex-col justify-between flex-1 px-3 py-3" dir="rtl">
                <p className="font-farsi font-bold text-sm text-[var(--text-primary)] line-clamp-2">
                  {item.titleFA}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-farsi px-2 py-0.5 rounded-full"
                        style={{
                          background: 'rgba(39,174,96,0.15)',
                          border: '1px solid rgba(39,174,96,0.30)',
                          color: 'var(--chakra-heart)',
                        }}>
                    {item.readMinutes} دقیقه
                  </span>
                  {item.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-[10px] font-farsi text-[var(--text-muted)] bg-white/[0.05] rounded-full px-2 py-0.5">
                      {tag}
                    </span>
                  ))}
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
