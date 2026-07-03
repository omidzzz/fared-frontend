'use client'

import Link from 'next/link'

export default function FaqPage() {
  return (
    <main className="page-gradient-crown min-h-screen pt-[80px] flex items-center justify-center px-4">
      <div className="text-center max-w-sm" dir="rtl">
        <h1 className="font-farsi font-bold text-3xl text-[--text-primary] mb-4">
          سوالات متداول
        </h1>
        <p className="font-farsi text-[--text-secondary] text-sm mb-8 leading-relaxed">
          این بخش به زودی راه‌اندازی می‌شود. محتوای ارزشمند در راه است.
        </p>
        <Link href="/">
          <button
            className="px-6 py-3 rounded-xl font-farsi text-sm transition-all duration-300"
            style={{ border: '1px solid rgba(254,203,125,0.40)', color: 'var(--gold-accent)' }}
          >
            ← بازگشت به خانه
          </button>
        </Link>
      </div>
    </main>
  )
}
