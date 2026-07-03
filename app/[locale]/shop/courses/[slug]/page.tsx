'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import DynamicHeader from '@/components/layout/DynamicHeader'
import { HeroShimmer } from '@/components/ui/HeroShimmer'
import { MOCK_COURSES } from '@/lib/mock-data'
import type { Course } from '@/lib/mock-data'
import { useCart } from '@/lib/cart-context'
import { useAuth } from '@/lib/auth-context'

export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const course = MOCK_COURSES.find((c: Course) => c.slug === slug)
  const { addItem } = useCart()
  const { isLoggedIn } = useAuth()
  const router = useRouter()

  const [openChapter, setOpenChapter] = useState<string | null>(
    course?.curriculum[0]?.id ?? null
  )
  const [isEnrolling, setIsEnrolling] = useState<boolean>(false)
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false)

  if (!course) {
    return (
      <main className="page-gradient-third min-h-screen pt-[80px] flex items-center justify-center px-4">
        <div className="text-center" dir="rtl">
          <h1 className="font-farsi font-bold text-2xl text-[var(--text-primary)] mb-4">
            دوره یافت نشد
          </h1>
          <Link href="/shop/courses">
            <button className="px-6 py-3 rounded-xl font-farsi text-sm min-h-11 transition-all duration-300"
                    style={{ border: '1px solid rgba(254,203,125,0.50)', color: 'var(--gold-accent)' }}>
              ← بازگشت به دوره‌ها
            </button>
          </Link>
        </div>
      </main>
    )
  }

  const handleEnroll = () => {
    if (!isLoggedIn) {
      router.push('/auth')
      return
    }
    setIsEnrolling(true)
    setTimeout(() => {
      setIsEnrolling(false)
      setIsEnrolled(true)
      if (!course.isFree) {
        addItem({
          productId: course.id,
          productType: 'course',
          name: course.titleFA,
          nameFA: course.titleFA,
          price: course.price,
          currency: 'USD',
          quantity: 1,
          image: course.image,
        })
        router.push('/cart')
      }
    }, 800)
  }

  return (
    <main className="page-gradient-third min-h-screen">
      {/* Section 1 — Header */}
      <DynamicHeader />

      {/* Section 2 — Isolated Hero */}
      <section className="px-4 pt-[88px] pb-4">
        <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
          <Image
            src={course.image}
            alt={course.titleFA}
            fill
            className="object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <HeroShimmer />
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-6" dir="rtl">
            <span className="font-farsi text-[10px] px-3 py-1 rounded-full backdrop-blur-md mb-2 inline-block w-fit"
                  style={{
                    background: 'rgba(0,0,0,0.40)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: course.accentColor,
                  }}>
              {course.levelFA}
            </span>
            <h1 className="font-display text-2xl text-[var(--text-primary)] leading-snug">
              {course.titleFA}
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="font-farsi text-xs text-[var(--text-secondary)]">
                ⏱ {course.durationFA}
              </span>
              <span className="font-farsi text-xs text-[var(--text-secondary)]">
                {course.instructorFA}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — Quick-Nav: OMITTED */}

      {/* Section 4 — Course Body */}
      <section className="px-4 py-6 flex flex-col gap-4">
        {/* Block A — Overview */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5" dir="rtl">
          <h2 className="font-farsi font-bold text-sm text-[var(--text-primary)] mb-3">
            درباره دوره
          </h2>
          <p className="font-farsi text-sm text-[var(--text-secondary)] leading-relaxed">
            {course.longDescriptionFA}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {course.tags.map((tag: string) => (
              <span key={tag} className="font-farsi text-[10px] px-2 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-[var(--text-muted)]">
                # {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Block B — Instructor */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5">
          <div className="flex items-start gap-4" dir="rtl">
            <div className="w-16 h-16 rounded-full overflow-hidden relative flex-shrink-0 border-2"
                 style={{ borderColor: course.accentColor + '40' }}>
              <Image
                src={course.instructorAvatar}
                alt={course.instructorFA}
                fill
                className="object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            </div>
            <div>
              <h3 className="font-farsi font-bold text-sm text-[var(--text-primary)]">
                {course.instructorFA}
              </h3>
              <p className="font-farsi text-xs text-[var(--text-muted)] mt-0.5">
                {course.levelFA} · {course.durationFA}
              </p>
              <p className="font-farsi text-xs text-[var(--text-secondary)] leading-relaxed mt-2">
                {course.instructorBioFA}
              </p>
            </div>
          </div>
        </div>

        {/* Block C — Curriculum */}
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-xl text-[var(--text-primary)] mb-1" dir="rtl">
            سرفصل دوره
          </h2>
          {course.curriculum.map((ch) => (
            <div key={ch.id} className="rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.08]">
              <button
                onClick={() => setOpenChapter(openChapter === ch.id ? null : ch.id)}
                className="w-full p-4 flex items-center justify-between min-h-11 transition-all duration-200"
                dir="rtl"
              >
                <span className="font-farsi font-bold text-sm text-[var(--text-primary)] flex-1 text-right">
                  {ch.titleFA}
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-farsi text-[10px] bg-white/[0.06] px-2 py-0.5 rounded-full text-[var(--text-muted)]">
                    {ch.lessons.length} درس
                  </span>
                  <span className="text-xs" style={{ color: course.accentColor }}>
                    {openChapter === ch.id ? '↑' : '↓'}
                  </span>
                </div>
              </button>
              {openChapter === ch.id && (
                <div className="border-t border-white/[0.06]">
                  {ch.lessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-center justify-between px-4 py-3 border-b border-white/[0.04] last:border-0" dir="rtl">
                      <div className="flex items-center gap-2">
                        <span className="text-xs" style={{ color: isEnrolled || lesson.isFree ? 'var(--chakra-heart)' : 'var(--text-muted)' }}>
                          {isEnrolled || lesson.isFree ? '▷' : '🔒'}
                        </span>
                        <span className="font-farsi text-xs text-[var(--text-primary)]">
                          {lesson.titleFA}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {lesson.isFree && (
                          <span className="font-farsi text-[9px] px-2 py-0.5 rounded-full"
                                style={{
                                  background: 'rgba(39,174,96,0.15)',
                                  border: '1px solid rgba(39,174,96,0.30)',
                                  color: 'var(--chakra-heart)',
                                }}>
                            رایگان
                          </span>
                        )}
                        <span className="font-farsi text-[10px] text-[var(--text-muted)]">
                          {lesson.duration}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Block D — Enroll CTA */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5 flex flex-col items-center gap-4" dir="rtl">
          {isEnrolled ? (
            <>
              <p className="font-farsi text-sm text-center" style={{ color: 'var(--chakra-heart)' }}>
                ✓ شما در این دوره ثبت‌نام کرده‌اید
              </p>
              <button className="w-full min-h-11 rounded-xl font-farsi text-sm font-bold transition-all duration-200 active:scale-[0.98]"
                      style={{ background: course.accentColor, color: 'var(--cosmic-dark)' }}>
                شروع دوره
              </button>
            </>
          ) : (
            <>
              {course.isFree ? (
                <p className="font-farsi text-2xl font-bold" style={{ color: 'var(--chakra-heart)' }}>
                  رایگان ✓
                </p>
              ) : (
                <p className="font-display text-2xl font-bold" style={{ color: 'var(--gold-accent)' }}>
                  {course.price.toLocaleString('fa-IR')} تومان
                </p>
              )}
              <button
                className="w-full min-h-11 rounded-xl font-farsi text-sm font-bold transition-all duration-200 active:scale-[0.98] disabled:opacity-60"
                style={{ background: course.accentColor, color: 'var(--cosmic-dark)' }}
                disabled={isEnrolling}
                onClick={handleEnroll}
              >
                {isEnrolling ? 'در حال پردازش...' : course.isFree ? 'ثبت‌نام رایگان' : 'خرید و ثبت‌نام'}
              </button>
              {!isLoggedIn && (
                <p className="font-farsi text-xs text-[var(--text-muted)] text-center">
                  برای ثبت‌نام باید وارد حساب خود شوید
                </p>
              )}
            </>
          )}
        </div>

        {/* Back link */}
        <Link href="/shop/courses">
          <div className="flex items-center justify-center gap-2 font-farsi text-sm text-[var(--text-muted)] py-2 mt-2">
            ← بازگشت به دوره‌ها
          </div>
        </Link>
      </section>

      {/* Section 5 — Footer Badges */}
    </main>
  )
}
