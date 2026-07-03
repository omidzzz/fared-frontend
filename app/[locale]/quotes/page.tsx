'use client'

import Link from 'next/link'

export default function QuotesPage() {
  return (
    <main className="page-gradient-crown min-h-screen pt-[80px] flex items-center justify-center px-4">
      <div className="text-center max-w-md" dir="rtl">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto mb-6 opacity-40">
          <path d="M0 48V30C0 13.432 10.074 3.43 30.222 0L33 7.2C23.148 9.6 18.222 15.2 18.222 24H27V48H0ZM21 48V30C21 13.432 31.074 3.43 51.222 0L54 7.2C44.148 9.6 39.222 15.2 39.222 24H48V48H21Z" fill="#FECB7D"/>
        </svg>
        <h1 className="font-farsi font-bold text-2xl text-[--text-primary] mb-3">نقل قول‌های روزانه</h1>
        <p className="font-farsi text-[--text-secondary] text-sm mb-8 leading-relaxed">
          این بخش به زودی راه‌اندازی می‌شود.<br/>هر روز یک نقل قول الهام‌بخش برای شما.
        </p>
        <Link href="/">
          <button className="px-6 py-3 rounded-xl font-farsi text-sm transition-all duration-300"
                  style={{ border: '1px solid rgba(254,203,125,0.35)', color: 'var(--gold-accent)' }}>
            ← بازگشت به خانه
          </button>
        </Link>
      </div>
    </main>
  )
}
