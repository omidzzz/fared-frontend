"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/hooks/useCart"
import { useTranslations } from "next-intl"
import MobileNav from "./MobileNav"

const SHOP_ITEMS = [
  { labelKey: "shop.clothes", href: "/shop/clothes", color: "var(--chakra-root)" },
  { labelKey: "shop.candles", href: "/shop/candles", color: "var(--chakra-sacral)" },
  {
    labelKey: "shop.accessories",
    href: "/shop/accessories",
    color: "var(--chakra-solar)",
  },
  { labelKey: "shop.tours", href: "/shop/tours", color: "var(--chakra-heart)" },
  { labelKey: "shop.stones", href: "/shop/stones", color: "var(--chakra-throat)" },
  { labelKey: "shop.courses", href: "/shop/courses", color: "var(--chakra-third)" },
  { labelKey: "shop.mentorship", href: "/shop/mentorship", color: "var(--chakra-crown)" },
];

const DESKTOP_NAV_LINKS = [
  { labelKey: "nav.blog", href: "/blog" },
  { labelKey: "nav.editorial", href: "/tahrirye" },
  { labelKey: "nav.forum", href: "/forum" },
  { labelKey: "nav.contact", href: "/contact" },
];

const MOBILE_NAV_LINKS = [
  { labelKey: "nav.home", href: "/" },
  { labelKey: "nav.blog", href: "/blog" },
  { labelKey: "nav.editorial", href: "/tahrirye" },
  { labelKey: "nav.forum", href: "/forum" },
];

const MOBILE_MORE_LINKS = [
  { labelKey: "nav.energyGuide", href: "/energy-guide" },
  { labelKey: "nav.journal", href: "/journal" },
  { labelKey: "nav.contact", href: "/contact" },
];

export default function DynamicHeaderV2() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const pathname = usePathname();
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  const t = useTranslations();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          height: 72,
          filter: scrolled
            ? "drop-shadow(0 4px 20px rgba(0,0,0,0.50))"
            : "none",
          transition: "filter 0.3s ease",
        }}
      >
        {/* V2 SVG header shape — solid filled wave */}
        <div
          className="absolute left-0 right-0 top-0 pointer-events-none"
          style={{ lineHeight: 0, zIndex: 0 }}
        >
          <img
            src="/images/ui/header-shape-v2.svg"
            alt=""
            aria-hidden="true"
            style={{
              width: "100%",
              height: "60px",
              objectFit: "fill",
              display: "block",
            }}
          />
        </div>

        {/* Blur overlay */}
        <div
          className="absolute left-0 right-0 top-0 pointer-events-none"
          style={{
            height: 72,
            zIndex: 1,
            background: "rgba(8, 3, 25, 0.55)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        />

        {/* Nav content — 72px, vertically centered */}
        <div className="relative z-10 h-[72px] flex items-center px-5 lg:px-10">
          {/* LEFT: Logo + Desktop nav */}
          <div className="flex items-center gap-6 lg:gap-8 flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(254,203,125,0.15)",
                  border: "1px solid rgba(254,203,125,0.40)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 2 C8 2 4 5 4 9 C4 11.5 5.5 13 8 14.5 C10.5 13 12 11.5 12 9 C12 5 8 2 8 2Z"
                    stroke="#FECB7D"
                    strokeWidth="1"
                    fill="rgba(254,203,125,0.15)"
                  />
                  <circle
                    cx="8"
                    cy="9"
                    r="2"
                    stroke="#FECB7D"
                    strokeWidth="0.8"
                    fill="none"
                  />
                </svg>
              </div>
              <div className="hidden sm:block">
                <p
                  className="font-farsi text-sm leading-none"
                  style={{ color: "var(--gold-accent)" }}
                >
                  اورا میستیک
                </p>
                <p className="font-farsi text-[9px] text-[--text-muted]">
                  تجارت معنوی
                </p>
              </div>
            </Link>

            {/* Desktop nav — immediately after logo */}
            <nav className="hidden lg:flex items-center gap-6">
              <Link href="/">
                <span
                  className={`text-sm transition-colors ${
                    pathname === "/"
                      ? "text-[--gold-accent]"
                      : "text-[--text-secondary] hover:text-[--text-primary]"
                  }`}
                >
                  {t("nav.home")}
                </span>
              </Link>

              {/* Shop dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShopOpen(true)}
                onMouseLeave={() => setShopOpen(false)}
              >
                <button className="flex items-center gap-1 text-sm text-[--text-secondary] hover:text-[--text-primary] transition-colors py-2">
                  {t("nav.shop")}
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    style={{
                      transform: shopOpen ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s",
                    }}
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

                {shopOpen && (
                  <>
                    <div className="absolute top-full left-0 right-0 h-3" />
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 z-50"
                      style={{
                        marginTop: 0,
                        paddingTop: 12,
                        minWidth: 190,
                        background: "rgba(10,10,32,0.96)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: "1px solid rgba(254,203,125,0.20)",
                        borderRadius: 12,
                        boxShadow: "0 8px 32px rgba(0,0,0,0.50)",
                      }}
                    >
                      {SHOP_ITEMS.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setShopOpen(false)}
                        >
                          <div className="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors hover:bg-white/[0.07]">
                            <div
                              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                              style={{
                                background: item.color,
                                boxShadow: `0 0 6px ${item.color}`,
                              }}
                            />
                            <span className="text-sm text-[--text-secondary] hover:text-[--text-primary] transition-colors">
                              {t(item.labelKey)}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {DESKTOP_NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className={`text-sm transition-colors ${
                      pathname === link.href
                        ? "text-[--gold-accent]"
                        : "text-[--text-secondary] hover:text-[--text-primary]"
                    }`}
                  >
                    {t(link.labelKey)}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* CENTER spacer */}
          <div className="flex-1" />

          {/* RIGHT: Search + Icons — desktop only */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            {/* Search bar */}
            <div className="relative w-48 xl:w-64">
              <input
                type="text"
                placeholder="جستجو..."
                className="w-full font-farsi text-sm transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 10,
                  padding: "7px 16px 7px 36px",
                  outline: "none",
                  direction: "rtl",
                  color: "var(--text-primary)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(254,203,125,0.40)";
                  e.target.style.background = "rgba(255,255,255,0.09)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.12)";
                  e.target.style.background = "rgba(255,255,255,0.06)";
                }}
              />
              <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="1.8"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>
            </div>

            {/* Account / Profile */}
            <Link
              href={isLoggedIn ? "/profile" : "/auth"}
              className="p-2 rounded-lg transition-colors hover:bg-white/[0.06]"
            >
              {isLoggedIn && user?.avatar ? (
                <div className="w-7 h-7 rounded-full overflow-hidden relative">
                  <Image
                    src={user.avatar}
                    alt={user.nameFA}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--text-secondary)"
                  strokeWidth="1.5"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 rounded-lg transition-colors hover:bg-white/[0.06]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-secondary)"
                strokeWidth="1.5"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {totalItems > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 flex items-center justify-center rounded-full font-body"
                  style={{
                    width: 17,
                    height: 17,
                    background: "var(--gold-accent)",
                    color: "var(--cosmic-dark)",
                    fontSize: 10,
                    fontWeight: 700,
                  }}
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile: Cart + Hamburger */}
          <div className="flex lg:hidden items-center gap-1">
            <Link href="/cart" className="relative p-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-secondary)"
                strokeWidth="1.5"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {totalItems > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 flex items-center justify-center rounded-full font-body"
                  style={{
                    width: 17,
                    height: 17,
                    background: "var(--gold-accent)",
                    color: "var(--cosmic-dark)",
                    fontSize: 10,
                    fontWeight: 700,
                  }}
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>
            <button
              className="p-2 rounded-lg transition-colors hover:bg-white/[0.06]"
              onClick={() => setMobileNavOpen(true)}
              aria-label="منو"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-secondary)"
                strokeWidth="1.5"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        shopItems={SHOP_ITEMS}
        navLinks={MOBILE_NAV_LINKS}
        moreLinks={MOBILE_MORE_LINKS}
      />
    </>
  );
}
