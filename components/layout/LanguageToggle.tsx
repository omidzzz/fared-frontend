'use client'

import { useLocale } from '@/hooks/useLocale'

export default function LanguageToggle() {
  const { locale, toggleLocale } = useLocale()

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-1.5 text-xs tracking-widest border border-white/10 rounded-full px-3 py-1.5 hover:border-[#c9a84c]/40 transition-colors"
      aria-label={locale === 'fa' ? 'Switch to English' : 'تغییر به فارسی'}
    >
      <span className={locale === 'en' ? 'text-[#fecb7d]' : 'text-[var(--text-muted)]'}>
        EN
      </span>
      <span className="text-[var(--text-muted)]">|</span>
      <span className={locale === 'fa' ? 'text-[#fecb7d]' : 'text-[var(--text-muted)]'}>
        FA
      </span>
    </button>
  )
}