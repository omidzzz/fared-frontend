'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import DynamicHeader from '@/components/layout/DynamicHeader'
import { HeroShimmer } from '@/components/ui/HeroShimmer'
import TourEnquiryForm from '@/components/ui/TourEnquiryForm'
import { MOCK_TOURS } from '@/lib/mock-data'
import type { Tour } from '@/lib/mock-data'

export default function TourDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const tour = MOCK_TOURS.find((t: Tour) => t.slug === slug)
  const [openDay, setOpenDay] = useState<string | null>(
    tour?.itinerary[0]?.id ?? null
  )

  if (!tour) {
    return (
      <main className="page-gradient-heart min-h-screen pt-[80px] flex items-center justify-center px-4">
        <div className="text-center" dir="rtl">
          <h1 className="font-display text-2xl text-[var(--text-primary)] mb-4">
            تور یافت نشد
          </h1>
          <Link href="/shop/tours">
            <button className="px-6 py-3 rounded-xl font-farsi text-sm min-h-11 transition-all duration-300"
                    style={{ border: '1px solid rgba(254,203,125,0.50)', color: 'var(--gold-accent)' }}>
              ← بازگشت به تورها
            </button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="page-gradient-heart min-h-screen">
      {/* Section 1 — Header */}
      <DynamicHeader />

      {/* Section 2 — Isolated Hero */}
      <section className="px-4 pt-[88px] pb-4">
        <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
          <Image
            src={tour.image}
            alt={tour.titleFA}
            fill
            className="object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <HeroShimmer />
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-6" dir="rtl">
            <h1 className="font-display text-2xl text-[var(--text-primary)] leading-snug">
              {tour.titleFA}
            </h1>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="font-farsi text-[10px] px-3 py-1 rounded-full backdrop-blur-md bg-black/40 border border-white/[0.15] text-[var(--text-secondary)]">
                📍 {tour.locationFA}
              </span>
              <span className="font-farsi text-[10px] px-3 py-1 rounded-full backdrop-blur-md bg-black/40 border border-white/[0.15] text-[var(--text-secondary)]">
                ⏱ {tour.durationFA}
              </span>
              <span className="font-farsi text-[10px] px-3 py-1 rounded-full backdrop-blur-md bg-black/40 border border-white/[0.15] text-[var(--text-secondary)]">
                👥 {tour.groupSizeFA}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — Quick-Nav: OMITTED */}

      {/* Section 4 — Tour Body */}
      <section className="px-4 py-6 flex flex-col gap-4">
        {/* Block A — Overview */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5" dir="rtl">
          <h2 className="font-farsi font-bold text-sm text-[var(--text-primary)] mb-3">
            درباره تور
          </h2>
          <p className="font-farsi text-sm text-[var(--text-secondary)] leading-relaxed">
            {tour.longDescriptionFA}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {tour.tags.map((tag: string) => (
              <span key={tag} className="font-farsi text-[10px] px-2 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-[var(--text-muted)]">
                # {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Block B — What's Included */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5" dir="rtl">
          <h2 className="font-farsi font-bold text-sm text-[var(--text-primary)] mb-3">
            تور شامل چه مواردی است؟
          </h2>
          <div className="flex flex-col gap-2">
            {tour.includesFA.map((item: string, i: number) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px]"
                      style={{
                        background: tour.accentColor + '20',
                        color: tour.accentColor,
                        border: '1px solid ' + tour.accentColor + '40',
                      }}>
                  ✓
                </span>
                <span className="font-farsi text-sm text-[var(--text-secondary)]">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Block C — Price */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5 flex items-center justify-between" dir="rtl">
          <span className="font-farsi text-sm text-[var(--text-secondary)]">قیمت هر نفر</span>
          <span className="font-display text-xl text-[var(--gold-accent)] font-bold">
            {tour.price.toLocaleString('fa-IR')} تومان
          </span>
        </div>

        {/* Block D — Itinerary */}
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-xl text-[var(--text-primary)] mb-1" dir="rtl">
            برنامه سفر
          </h2>
          {tour.itinerary.map((day) => (
            <div key={day.id} className="rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.08]">
              <button
                onClick={() => setOpenDay(openDay === day.id ? null : day.id)}
                className="w-full p-4 flex items-center justify-between min-h-11 transition-all duration-200"
                dir="rtl"
              >
                <div className="flex items-center gap-3">
                  <span className="font-farsi text-[10px] px-2 py-1 rounded-full flex-shrink-0"
                        style={{
                          background: tour.accentColor + '20',
                          color: tour.accentColor,
                          border: '1px solid ' + tour.accentColor + '40',
                        }}>
                    {day.dayFA}
                  </span>
                  <span className="font-farsi text-sm text-[var(--text-primary)] text-right">
                    {day.titleFA}
                  </span>
                </div>
                <span className="text-xs" style={{ color: tour.accentColor }}>
                  {openDay === day.id ? '↑' : '↓'}
                </span>
              </button>
              {openDay === day.id && (
                <div className="border-t border-white/[0.06] px-4 py-4" dir="rtl">
                  <p className="font-farsi text-sm text-[var(--text-secondary)] leading-relaxed">
                    {day.descriptionFA}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Block E — Enquiry Form */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5" dir="rtl">
          <h2 className="font-farsi font-bold text-base text-[var(--text-primary)] mb-1">
            ثبت درخواست
          </h2>
          <p className="font-farsi text-xs text-[var(--text-secondary)] mb-4">
            کارشناسان ما با شما تماس می‌گیرند
          </p>
          <TourEnquiryForm />
        </div>

        {/* Back link */}
        <Link href="/shop/tours">
          <div className="flex items-center justify-center gap-2 font-farsi text-sm text-[var(--text-muted)] py-2 mt-2">
            ← بازگشت به تورها
          </div>
        </Link>
      </section>

      {/* Section 5 — Footer Badges */}
    </main>
  )
}
