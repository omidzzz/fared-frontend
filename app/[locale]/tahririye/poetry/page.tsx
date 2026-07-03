'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import DynamicHeader from '@/components/layout/DynamicHeader'
import { HeroShimmer } from '@/components/ui/HeroShimmer'
import { MOCK_POEMS, POEM_CATEGORIES } from '@/lib/mock-data'
import type { Poem } from '@/lib/mock-data'

export default function PoetryPage() {
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const filteredPoems = useMemo(() => {
    if (activeCategory === 'all') return MOCK_POEMS
    return MOCK_POEMS.filter((p: Poem) => p.category === activeCategory)
  }, [activeCategory])

  return (
    <main className="page-gradient-third min-h-screen">
      {/* Section 1 — Header */}
      <DynamicHeader />

      {/* Section 2 — Isolated Hero */}
      <section className="px-4 pt-[88px] pb-4">
        <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
          <Image
            src="/images/tahririye/poetry-card.webp"
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
              اشعار
            </h1>
            <p className="font-farsi text-sm text-[var(--text-secondary)] mt-1">
              گزیده‌ای از اشعار ناب
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 — Category Filter */}
      <section className="px-4 py-3">
        <div className="flex overflow-x-auto scrollbar-none snap-x snap-mandatory scrollbar-none gap-2 pb-1">
          {POEM_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.slug)}
              className="flex-shrink-0 snap-start px-4 py-2 rounded-full font-farsi text-xs min-h-9 border transition-all duration-200 whitespace-nowrap"
              style={{
                background: activeCategory === cat.slug ? 'rgba(142,68,173,0.15)' : 'rgba(255,255,255,0.03)',
                borderColor: activeCategory === cat.slug ? 'rgba(142,68,173,0.40)' : 'rgba(255,255,255,0.06)',
                color: activeCategory === cat.slug ? 'var(--chakra-third)' : 'var(--text-secondary)',
              }}
            >
              {cat.labelFA}
            </button>
          ))}
        </div>
      </section>

      {/* Section 4 — Poems List */}
      <section className="px-4 py-4 flex flex-col gap-3 pb-8">
        {filteredPoems.map((poem: Poem) => (
          <div
            key={poem.id}
            onClick={() => setSelectedPoem(poem)}
            className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5 cursor-pointer active:scale-[0.98] transition-all duration-200"
            dir="rtl"
          >
            {/* Top row: title + category */}
            <div className="flex justify-between items-start">
              <h3 className="font-display text-base text-[var(--text-primary)]">
                {poem.titleFA}
              </h3>
              <span className="font-farsi text-[10px] px-2 py-1 rounded-full flex-shrink-0 ml-2"
                    style={{
                      background: 'rgba(142,68,173,0.15)',
                      border: '1px solid rgba(142,68,173,0.30)',
                      color: 'var(--chakra-third)',
                    }}>
                {poem.categoryFA}
              </span>
            </div>
            {/* Poet + era */}
            <p className="font-farsi text-xs text-[var(--text-secondary)] mt-1">
              {poem.poetFA}
            </p>
            <p className="font-farsi text-[10px] text-[var(--text-muted)] mt-0.5">
              {poem.eraFA ?? poem.era}
            </p>
            {/* Divider */}
            <div className="border-t border-white/[0.06] my-3" />
            {/* Preview: first 2 lines */}
            <div className="flex flex-col gap-1">
              {poem.linesFA.slice(0, 2).map((line: string, i: number) => (
                <p key={i} className="font-farsi text-sm text-[var(--text-primary)] leading-[2.2] text-center">
                  {line}
                </p>
              ))}
              {poem.linesFA.length > 2 && (
                <p className="font-farsi text-xs text-center mt-1" style={{ color: 'var(--chakra-third)' }}>
                  ...
                </p>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Section 5 — Footer */}
      {/* --- BOTTOM SHEET --- */}
      {selectedPoem && (
        <>
          <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedPoem(null)} />
          <div className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl overflow-hidden max-h-[80vh] overflow-y-auto"
               style={{ background: 'rgba(10,10,32,0.96)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.10)' }}>
            <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mt-4 mb-6" />
            <div className="text-center px-5 pt-4 pb-4 border-b border-white/[0.08]" dir="rtl">
              <h2 className="font-display text-2xl text-[var(--text-primary)]">{selectedPoem.titleFA}</h2>
              <p className="font-farsi text-sm text-[var(--text-secondary)] mt-1">
                {selectedPoem.poetFA} · {selectedPoem.eraFA ?? selectedPoem.era}
              </p>
              <span className="font-farsi text-[10px] px-2 py-0.5 rounded-full inline-block mt-2"
                    style={{ background: 'rgba(142,68,173,0.15)', border: '1px solid rgba(142,68,173,0.30)', color: 'var(--chakra-third)' }}>
                {selectedPoem.categoryFA}
              </span>
            </div>
            <div className="px-6 py-6" dir="rtl">
              {selectedPoem.linesFA.map((line: string, i: number) => (
                <div key={i}>
                  <p className="font-farsi text-base text-[var(--text-primary)] leading-[2.8] text-center mb-1">{line}</p>
                  {(i + 1) % 2 === 0 && i < selectedPoem.linesFA.length - 1 && <div className="my-3" />}
                </div>
              ))}
            </div>
            <div className="flex justify-center pb-8">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none" opacity="0.5">
                <path d="M8 1 L14 5 L14 11 L8 15 L2 11 L2 5 Z" stroke="#FECB7D" strokeWidth="0.8" fill="none"/>
                <path d="M8 4 L11 6 L11 10 L8 12 L5 10 L5 6 Z" stroke="#FECB7D" strokeWidth="0.6" fill="rgba(254,203,125,0.08)"/>
              </svg>
            </div>
          </div>
        </>
      )}
    </main>
  )
}
