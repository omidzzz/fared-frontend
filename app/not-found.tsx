'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

// Bilingual 404 page that detects locale from the URL
const CONTENT = {
  fa: {
    title: "صفحه مورد نظر یافت نشد",
    button: "بازگشت به صفحه اصلی",
  },
  en: {
    title: "The page you are looking for was not found",
    button: "Back to Home",
  },
} as const

export default function NotFound() {
  const pathname = usePathname()
  const locale = pathname?.startsWith("/en") ? "en" : "fa"
  const content = CONTENT[locale]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A0A1A] text-[#F0EBE3]">
      <h1 className="text-6xl font-bold mb-4" style={{ color: "var(--gold-accent)" }}>404</h1>
      <p className="text-xl mb-8 text-[--text-secondary]">{content.title}</p>
      <Link 
        href={`/${locale}`} 
        className="px-6 py-3 rounded-lg transition-colors"
        style={{
          background: "var(--gold-accent)",
          color: "var(--cosmic-dark)",
          fontWeight: 500,
        }}
      >
        {content.button}
      </Link>
    </div>
  )
}