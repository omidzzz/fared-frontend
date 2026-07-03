'use client'

import { useLocale as useNextIntlLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { useCallback } from 'react'

export function useLocale() {
  const locale = useNextIntlLocale()
  const router = useRouter()
  const pathname = usePathname()
  const isRTL = locale === 'fa'

  const toggleLocale = useCallback(() => {
    const next = locale === 'en' ? 'fa' : 'en'

    // With localePrefix: 'as-needed', the locale prefix only appears
    // when the current locale differs from the default locale (fa).
    // - /en/about → toggling to fa → /about (remove prefix)
    // - /about (fa) → toggling to en → /en/about (add prefix)
    // - /en/about → toggling to en → no change needed
    
    const segments = pathname.split('/').filter(Boolean)
    const currentFirst = segments[0]

    if (currentFirst === locale) {
      // Current path has the locale prefix, we need to replace it
      segments[0] = next
      const newPath = '/' + segments.join('/')
      router.replace(newPath === '//' ? '/' : newPath)
    } else {
      // Current path has no locale prefix (means we're on default locale - fa)
      // We need to prepend the new locale
      const newPath = `/${next}${pathname === '/' ? '' : pathname}`
      router.replace(newPath)
    }
  }, [locale, router, pathname])

  return { locale, isRTL, toggleLocale }
}