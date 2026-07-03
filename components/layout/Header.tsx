'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import LogoIcon from './LogoIcon'
import MobileNav from './MobileNav'
import ChakraIcon from '@/components/ui/ChakraIcon'
import HeaderOrnament from '@/components/ui/HeaderOrnament'
import { CATEGORY_CONFIG } from '@/types/category'
import { useCart } from '@/hooks/useCart'

// ─── SVG Icons ──────────────────────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="22" y2="22" />
    </svg>
  )
}

function AccountIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  )
}

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative w-5 h-[14px]">
      <motion.span
        className="absolute left-0 right-0 h-[1.5px] bg-current rounded origin-center"
        animate={{ top: isOpen ? 6 : 0, rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.22 }}
      />
      <motion.span
        className="absolute left-0 right-0 h-[1.5px] bg-current rounded"
        style={{ top: 6 }}
        animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0.3 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.span
        className="absolute left-0 right-0 h-[1.5px] bg-current rounded origin-center"
        animate={{ top: isOpen ? 6 : 13, rotate: isOpen ? -45 : 0 }}
        transition={{ duration: 0.22 }}
      />
    </div>
  )
}

// ─── Internal components ─────────────────────────────────────────────────────

function NavLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={`relative group text-sm tracking-wider text-[#F0EBE3]/80 hover:text-[#FECB7D] transition-colors duration-200${className ? ` ${className}` : ''}`}>
      {children}
      <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#FECB7D] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-250" />
    </Link>
  )
}

interface IconButtonProps {
  children: React.ReactNode
  'aria-label': string
  onClick?: () => void
  href?: string
  className?: string
}

function IconButton({ children, 'aria-label': ariaLabel, onClick, href, className }: IconButtonProps) {
  const cls = `p-2 rounded-full text-[var(--text-secondary)] hover:text-[#fecb7d] hover:bg-white/5 transition-colors duration-150 ${className ?? ''}`
  if (href) {
    return <Link href={href} className={cls} aria-label={ariaLabel}>{children}</Link>
  }
  return (
    <button type="button" onClick={onClick} className={cls} aria-label={ariaLabel}>
      {children}
    </button>
  )
}

function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 4l4 4 4-4" />
    </svg>
  )
}

function ShopDropdown() {
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const categories = Object.values(CATEGORY_CONFIG)

  const enter = () => { clearTimeout(timeoutRef.current); setOpen(true) }
  const leave = () => { timeoutRef.current = setTimeout(() => setOpen(false), 120) }

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        type="button"
        className="flex items-center gap-1 text-sm tracking-wider text-[#F0EBE3]/80 hover:text-[#FECB7D] transition-colors duration-200 cursor-pointer"
      >
        Shop
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[540px] z-50"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
          >
            <div
              className="rounded-2xl p-6 grid grid-cols-2 gap-1"
              style={{
                background: 'rgba(10,10,26,0.92)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(254,203,125,0.2)',
              }}
            >
              {categories.map((cat) => (
                <Link
                  key={cat.handle}
                  href={`/shop/${cat.handle}`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 group transition-colors duration-150"
                >
                  <ChakraIcon chakra={cat.chakra} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-display text-[var(--text-primary)] group-hover:text-[#fecb7d] transition-colors">
                      {cat.label}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">{cat.labelFa}</p>
                  </div>
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: cat.color }}
                  />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Gold ornament exported for use in PageWrapper ────────────────────────────

export function GoldOrnament() {
  return (
    <div className="flex items-center justify-center py-2 opacity-30 pointer-events-none">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
      <div className="mx-4 w-1.5 h-1.5 rotate-45 border border-[#FECB7D]" />
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
    </div>
  )
}

// ─── Header ───────────────────────────────────────────────────────────────────

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const { totalItems } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'backdrop-blur-xl bg-[rgba(7,7,20,0.55)]'
            : 'backdrop-blur-md bg-[rgba(7,7,20,0.15)]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">

          {/* Zone 1 — Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <LogoIcon size={48} />
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg md:text-xl tracking-widest text-[#FECB7D]">
                FARED
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#B8AEAD] uppercase">
                Spiritual Commerce
              </span>
            </div>
          </Link>

          {/* Zone 2 — Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="/">Home</NavLink>
            <ShopDropdown />
            <NavLink href="/shop">Collections</NavLink>
            <NavLink href="/editorial">Energy Guide</NavLink>
            <NavLink href="/editorial">Journal</NavLink>
            <NavLink href="/tahririye" className="font-farsi">تحریریه</NavLink>
            <NavLink href="/forum">Forum</NavLink>
          </nav>

          {/* Zone 3 — Right Icons */}
          <div className="flex items-center gap-1 md:gap-2">
            <IconButton aria-label="Search" onClick={() => {}}>
              <SearchIcon />
            </IconButton>

            {/* Language toggle — desktop only */}
            <button
              type="button"
              className="hidden md:flex items-center gap-1 text-xs tracking-widest text-[var(--text-secondary)] hover:text-[#fecb7d] transition-colors px-2 py-1 border border-white/10 rounded-full hover:border-[#c9a84c]/40"
            >
              <span className="text-[#fecb7d]">EN</span>
              <span className="text-[var(--text-muted)] mx-0.5">|</span>
              <span className="text-[var(--text-muted)]">FA</span>
            </button>

            <IconButton aria-label="Account" href="/account" className="hidden sm:flex">
              <AccountIcon />
            </IconButton>

            <IconButton aria-label="Cart" href="/cart" className="relative">
              <CartIcon />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#FECB7D] text-[#0A0A1A] text-[10px] font-bold flex items-center justify-center leading-none pointer-events-none">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </IconButton>

            {/* Hamburger — mobile only */}
            <IconButton
              aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileNavOpen((o) => !o)}
              className="md:hidden"
            >
              <HamburgerIcon isOpen={mobileNavOpen} />
            </IconButton>
          </div>
        </div>
        <HeaderOrnament />
      </header>

      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  )
}
