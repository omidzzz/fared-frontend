'use client'

import Image from 'next/image'
import Link from 'next/link'
import { HeroShimmer } from '@/components/ui/HeroShimmer'

const SECTIONS = [
  {
    id: 'educational',
    titleFA: 'مطالب آموزشی رایگان',
    icon: '📖',
    descriptionFA: 'مجموعه‌ای از بهترین مطالب آموزشی در موضوعات مختلف برای رشد و آگاهی بیشتر',
    ctaFA: 'مشاهده تمامی مطالب',
    href: '/tahririye/educational',
    image: '/images/tahririye/educational-card.webp',
    accent: 'var(--chakra-heart)',
    imagePosition: 'right' as const,
  },
  {
    id: 'books',
    titleFA: 'معرفی کتاب',
    icon: '📚',
    descriptionFA: 'بهترین کتاب‌ها برای توسعه فردی، معنوی و فکری',
    ctaFA: 'مشاهده کتاب‌ها',
    href: '/tahririye/books',
    image: '/images/tahririye/books-card.webp',
    accent: 'var(--gold-deep)',
    imagePosition: 'right' as const,
  },
  {
    id: 'articles',
    titleFA: 'مقاله‌ها',
    icon: '📄',
    descriptionFA: 'مقالات پژوهشی و تحلیلی در موضوعات معنوی، فلسفی و علوم انسانی',
    ctaFA: 'مطالعه مقاله‌ها',
    href: '/tahririye/articles',
    image: '/images/tahririye/articles-card.webp',
    accent: 'var(--chakra-throat)',
    imagePosition: 'left' as const,
  },
  {
    id: 'poetry',
    titleFA: 'اشعار',
    icon: '🪶',
    descriptionFA: 'گزیده‌ای از اشعار ناب فارسی برای جان و دل',
    ctaFA: 'مطالعه اشعار',
    href: '/tahririye/poetry',
    image: '/images/tahririye/poetry-card.webp',
    accent: 'var(--chakra-third)',
    imagePosition: 'right' as const,
  },
]

export default function TahririyePage() {
  return (
    <div className="relative overflow-hidden" style={{ minHeight: '100svh' }}>
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/tahririye/tahririye-hero.webp"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0" style={{ background: 'rgba(4,8,20,0.55)' }} />
      </div>

      {/* Content */}
      <div className="min-h-full flex flex-col pt-[80px] pb-4 px-4 sm:px-8">

        {/* Section 2 — Isolated Hero Title */}
        <div className="relative overflow-hidden rounded-2xl">
          <HeroShimmer />
          <div className="text-center py-4 relative z-20" dir="rtl">
            <h1
              className="font-farsi font-bold mb-2"
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                background: 'linear-gradient(135deg, var(--gold-accent) 0%, #f5dfa0 50%, var(--gold-accent) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 20px rgba(254,203,125,0.40))',
              }}
            >
              تحریریه
            </h1>
            {/* Ornamental subtitle */}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <div className="h-px w-8 sm:w-16 lg:w-24" style={{ background: 'rgba(254,203,125,0.40)' }} />
              <svg width="20" height="10" viewBox="0 0 20 10" fill="none" className="flex-shrink-0">
                <path d="M0 5 Q5 0 10 5 Q15 10 20 5" stroke="#FECB7D" strokeWidth="0.8" fill="none" opacity="0.7"/>
              </svg>
              <p className="font-farsi text-xs sm:text-sm text-[var(--text-secondary)]">اندیشه، دانش و الهام</p>
              <svg width="20" height="10" viewBox="0 0 20 10" fill="none" className="flex-shrink-0">
                <path d="M0 5 Q5 10 10 5 Q15 0 20 5" stroke="#FECB7D" strokeWidth="0.8" fill="none" opacity="0.7"/>
              </svg>
              <div className="h-px w-8 sm:w-16 lg:w-24" style={{ background: 'rgba(254,203,125,0.40)' }} />
            </div>
          </div>
        </div>

        {/* Section 4 — Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 min-h-0 pb-4 mt-2">
          {SECTIONS.map((section) => (
            <Link key={section.id} href={section.href} className="block">
              <div
                className="relative rounded-2xl overflow-hidden border border-white/[0.08] active:scale-[0.98] transition-all duration-200"
                style={{ height: '160px', width: '100%' }}
              >
                {/* Full-bleed image */}
                <Image
                  src={section.image}
                  alt={section.titleFA}
                  fill
                  className="object-cover object-center"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />

                {/* Top gradient */}
                <div
                  className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
                  style={{ background: 'linear-gradient(to bottom, rgba(7,7,20,0.5), transparent)' }}
                />

                {/* Shimmer */}
                <HeroShimmer />

                {/* Glass strip pinned to bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 z-20 px-3 py-2 sm:px-4 sm:py-3 text-center"
                  dir="rtl"
                  style={{
                    background: 'rgba(7,7,20,0.65)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <p className="font-farsi font-bold text-xs sm:text-sm text-[var(--text-primary)] truncate">
                    {section.icon} {section.titleFA}
                  </p>
                  <p className="font-farsi text-[10px] sm:text-xs mt-0.5 truncate" style={{ color: section.accent }}>
                    {section.ctaFA}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Section 5 — Bottom Quote */}
        <div className="text-center py-2 sm:py-3" dir="rtl">
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" opacity="0.5" className="flex-shrink-0">
              <path d="M8 1 L14 5 L14 11 L8 15 L2 11 L2 5 Z"
                    stroke="#FECB7D" strokeWidth="0.8" fill="none"/>
              <path d="M8 4 L11 6 L11 10 L8 12 L5 10 L5 6 Z"
                    stroke="#FECB7D" strokeWidth="0.6" fill="rgba(254,203,125,0.08)"/>
            </svg>
            <p
              className="font-farsi text-[var(--text-muted)] text-center"
              style={{ fontSize: 'clamp(0.6rem, 1.8vw, 0.8rem)' }}
            >
              &ldquo;علم چراغ راه است و دانش کلید آینده&rdquo;
            </p>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" opacity="0.5" className="flex-shrink-0">
              <path d="M8 1 L14 5 L14 11 L8 15 L2 11 L2 5 Z"
                    stroke="#FECB7D" strokeWidth="0.8" fill="none"/>
            </svg>
          </div>
        </div>

      </div>
    </div>
  )
}