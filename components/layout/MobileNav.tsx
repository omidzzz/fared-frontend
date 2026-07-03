'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import LogoIcon from './LogoIcon'
import LanguageToggle from './LanguageToggle'
import { useCart } from '@/hooks/useCart'
import { useLocale } from '@/hooks/useLocale'

// Bilingual fallback translations for when used outside NextIntlClientProvider
const FALLBACK_TRANSLATIONS: Record<string, Record<string, string>> = {
  fa: {
    "nav.home": "خانه",
    "nav.shop": "فروشگاه",
    "nav.blog": "وبلاگ",
    "nav.editorial": "تحریریه",
    "nav.forum": "انجمن",
    "nav.contact": "تماس",
    "nav.energyGuide": "راهنمای انرژی",
    "nav.journal": "دفترچه",
    "shop.clothes": "پوشاک",
    "shop.candles": "شمع",
    "shop.accessories": "اکسسوری",
    "shop.tours": "تورها",
    "shop.stones": "سنگ‌ها",
    "shop.courses": "دوره‌ها",
    "shop.mentorship": "منتورشیپ",
    "more": "بیشتر",
    "account": "حساب کاربری",
    "cart": "سبد خرید",
  },
  en: {
    "nav.home": "Home",
    "nav.shop": "Shop",
    "nav.blog": "Blog",
    "nav.editorial": "Editorial",
    "nav.forum": "Forum",
    "nav.contact": "Contact",
    "nav.energyGuide": "Energy Guide",
    "nav.journal": "Journal",
    "shop.clothes": "Clothes",
    "shop.candles": "Candles",
    "shop.accessories": "Accessories",
    "shop.tours": "Tours",
    "shop.stones": "Stones",
    "shop.courses": "Courses",
    "shop.mentorship": "Mentorship",
    "more": "More",
    "account": "Account",
    "cart": "Cart",
  },
};

type ShopItem = { labelKey: string; href: string; color: string }
type NavLinkItem = { labelKey: string; href: string }

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  shopItems?: ShopItem[]
  navLinks?: NavLinkItem[]
  moreLinks?: NavLinkItem[]
}

export default function MobileNav({
  isOpen,
  onClose,
  shopItems = [],
  navLinks = [],
  moreLinks = [],
}: MobileNavProps) {
  const [shopOpen, setShopOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const { totalItems } = useCart()
  const { locale } = useLocale()

  const t = (key: string) => FALLBACK_TRANSLATIONS[locale]?.[key] || FALLBACK_TRANSLATIONS.fa[key] || key;

  const handleClose = () => { setShopOpen(false); setMoreOpen(false); onClose() }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[55] bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={handleClose}
            aria-hidden="true"
          />

          <motion.div
            className="fixed inset-0 z-[60] flex flex-col"
            style={{ background: 'rgba(10,10,26,0.97)', backdropFilter: 'blur(24px)' }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <Link href={`/${locale}`} onClick={handleClose} className="flex items-center gap-3">
                <LogoIcon size={40} />
                <span className="font-display text-lg tracking-widest text-[#FECB7D]">FARED</span>
              </Link>
              <button
                type="button"
                onClick={handleClose}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[var(--text-muted)] hover:text-[#fecb7d] hover:border-[#c9a84c]/40 transition-colors"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-6 py-4">
              {navLinks.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.22 }}
                >
                  <Link
                    href={`/${locale}${item.href}`}
                    onClick={handleClose}
                    className="flex items-center justify-between py-4 border-b border-white/5 text-lg text-[var(--text-primary)] hover:text-[#fecb7d] transition-colors"
                  >
                    {t(item.labelKey)}
                  </Link>
                </motion.div>
              ))}

              {/* Shop accordion */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.06, duration: 0.22 }}
              >
                <button
                  type="button"
                  onClick={() => setShopOpen((o) => !o)}
                  className="flex items-center justify-between w-full py-4 border-b border-white/5 text-lg font-display text-[var(--text-primary)] hover:text-[#fecb7d] transition-colors"
                >
                  {t("nav.shop")}
                  <motion.span animate={{ rotate: shopOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-sm text-[--text-muted]">
                    ▾
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {shopOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <div className="py-2 space-y-0.5">
                        {shopItems.map((item) => (
                          <Link
                            key={item.href}
                            href={`/${locale}${item.href}`}
                            onClick={handleClose}
                            className="flex items-center gap-3 py-3 pl-4 ml-2 hover:bg-white/[0.03] transition-colors rounded-r-lg"
                          >
                            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
                            <span className="text-sm text-[var(--text-secondary)] hover:text-[#fecb7d] transition-colors">
                              {t(item.labelKey)}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* More accordion — secondary links */}
              {moreLinks.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navLinks.length + 1) * 0.06, duration: 0.22 }}
                >
                  <button
                    type="button"
                    onClick={() => setMoreOpen((o) => !o)}
                    className="flex items-center justify-between w-full py-4 border-b border-white/5 text-lg font-farsi text-[var(--text-primary)] hover:text-[#fecb7d] transition-colors"
                  >
                    {t("more")}
                    <motion.span animate={{ rotate: moreOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-sm text-[--text-muted]">
                      ▾
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {moreOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden"
                      >
                        <div className="py-2 space-y-0.5">
                          {moreLinks.map((item) => (
                            <Link
                              key={item.href}
                              href={`/${locale}${item.href}`}
                              onClick={handleClose}
                              className="flex items-center py-3 pl-4 ml-2 hover:bg-white/[0.03] transition-colors rounded-r-lg text-sm text-[var(--text-secondary)] hover:text-[#fecb7d]"
                            >
                              {t(item.labelKey)}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </nav>

            {/* Bottom bar */}
            <div className="px-6 py-5 border-t border-white/10 flex items-center justify-between">
              <LanguageToggle />

              <Link
                href={`/${locale}/account`}
                onClick={handleClose}
                className="text-sm text-[var(--text-secondary)] hover:text-[#fecb7d] transition-colors"
              >
                {t("account")}
              </Link>

              <Link
                href={`/${locale}/cart`}
                onClick={handleClose}
                className="relative flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[#fecb7d] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#FECB7D] text-[#0A0A1A] text-[9px] font-bold flex items-center justify-center">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
                {t("cart")}
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}