"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/hooks/useCart";
import { useLocale } from "@/hooks/useLocale";
import { useTranslations } from "next-intl";
import MobileNav from "./MobileNav";
import LanguageToggle from "./LanguageToggle";
import { CartHoverPanel } from "@/components/cart/CompactCartPanel";

const SHOP_ITEMS = [
  {
    labelKey: "shop.clothes",
    href: "/shop/clothes",
    color: "var(--chakra-root)",
  },
  {
    labelKey: "shop.candles",
    href: "/shop/candles",
    color: "var(--chakra-sacral)",
  },
  {
    labelKey: "shop.accessories",
    href: "/shop/accessories",
    color: "var(--chakra-solar)",
  },
  { labelKey: "shop.tours", href: "/shop/tours", color: "var(--chakra-heart)" },
  {
    labelKey: "shop.stones",
    href: "/shop/stones",
    color: "var(--chakra-throat)",
  },
  {
    labelKey: "shop.courses",
    href: "/shop/courses",
    color: "var(--chakra-third)",
  },
  {
    labelKey: "shop.mentorship",
    href: "/shop/mentorship",
    color: "var(--chakra-crown)",
  },
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

export default function DynamicHeader() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems, items, totalPrice, updateQuantity, removeItem } =
    useCart();
  const pathname = usePathname();
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  const { locale } = useLocale();
  const t = useTranslations();
  
  const cartTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        cartContainerRef.current &&
        !cartContainerRef.current.contains(e.target as Node)
      ) {
        setCartOpen(false);
      }
    };
    if (cartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [cartOpen]);

  const handleCartMouseEnter = () => {
    if (cartTimeoutRef.current) {
      clearTimeout(cartTimeoutRef.current);
      cartTimeoutRef.current = null;
    }
    setCartOpen(true);
  };

  const handleCartMouseLeave = (e: React.MouseEvent) => {
    if (
      cartContainerRef.current &&
      e.relatedTarget instanceof Node &&
      cartContainerRef.current.contains(e.relatedTarget)
    ) {
      return;
    }
    cartTimeoutRef.current = setTimeout(() => {
      setCartOpen(false);
    }, 800);
  };

  const handleCartClick = () => {
    router.push(`/${locale}/cart`);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          height: 72,
          background: "rgba(8, 3, 25, 0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          filter: scrolled
            ? "drop-shadow(0 4px 20px rgba(0,0,0,0.50))"
            : "drop-shadow(0 2px 10px rgba(0,0,0,0.30))",
          transition: "filter 0.3s ease",
        }}
      >
        {/* Decorative wavy gold edge */}
        <svg
          className="absolute left-0 right-0 pointer-events-none"
          viewBox="0 0 2543.72 150"
          preserveAspectRatio="none"
          aria-hidden
          style={{
            top: 62,
            height: 20,
            width: "100%",
            zIndex: 3,
            opacity: 0.6,
            fill: "var(--gold-accent)",
          }}
        >
          <path d="M2166.27.02c-39.5,5.89-77.92,18.75-112.31,39.19-30.85,18.33-54.29,43.21-77.81,69.83-24.21,27.39-51.21,46.84-87.32,55.53-40.17,9.67-82.16,6.83-122.7,1.2-37.86-5.26-75.35-14.01-113.45-5.13-18.13,4.23-39.42,11.71-54.21,23.52-3.49,2.79-.73,2.07-3.74,1.3-2.09-.54-4.41-2.26-6.38-3.16-22.95-10.55-48.11-16.52-72.86-20.96-35.55-6.39-75.05-12.67-110.33-1.65-21.43,6.69-34.88,20.88-51.4,34.9-13.12,11.13-29.27,12.43-44.59,18.52s-29.09,18.7-38.16,33.14h2.59c-7.84-12.68-18.73-23.7-32.1-30.51-14.77-7.53-31.58-7.92-45.63-17.46s-24.82-24.12-40.85-32.33c-30.26-15.51-65.97-12.89-98.58-8.7-30.69,3.94-61.77,9.85-90.68,21.2-4.88,1.92-10.55,6-15.61,7.06-3.33.7.55.73-2.86-.71-9.03-3.79-17.22-10.48-26.34-14.49-38.99-17.15-78.46-14.58-119.39-7.92-73.62,11.97-160.43,19.48-218.05-37.47-12.05-11.91-22.62-25.22-34.09-37.67-13.36-14.5-27.98-27.69-44.23-38.88C467.63,22.49,423.57,6.76,378.63.06c-1.89-.28-2.7,2.61-.8,2.89,44.26,6.6,87.47,21.94,124.63,47.16,31.28,21.23,52.46,50.74,78.94,76.92,57.08,56.41,142.47,50.69,215.79,39.08,25.04-3.97,50.09-8.39,75.53-5.67,27.31,2.91,53.07,13.2,75.64,28.69.42.29,1.09.27,1.51,0,8.61-5.36,18.72-8.79,28.27-11.97,30.62-10.21,62.93-15.67,94.97-18.82,28.09-2.76,58.6-2.3,83.8,12.03,13.65,7.76,23.09,19.88,35.5,29.1,11.3,8.4,24.18,10.65,37.24,14.72,17.52,5.46,31.81,18.12,41.36,33.57.6.98,1.99.96,2.59,0,8.16-12.99,19.69-24.23,33.75-30.64,13.68-6.24,28.55-7.14,41.59-15.27,12.17-7.59,20.96-19.58,32.85-27.66,21.85-14.84,48.71-18.07,74.54-17.01,34.5,1.41,69.93,7.54,103,17.58,12.01,3.65,24.94,7.64,35.7,14.34.43.27,1.09.29,1.51,0,19.58-13.43,41.56-23.07,65.01-27.2,23.94-4.22,47.95-1.95,71.77,1.84,38.7,6.17,77.71,12.14,117.03,9.5,38.34-2.57,76.35-13.41,105.62-39.2,25.8-22.73,44.88-51.74,71.95-73.3,39.79-31.69,89.12-50.37,139.14-57.82,1.9-.28,1.09-3.17-.8-2.89h0Z" />
          <path d="M601.11,140.33c-10.75.31-21.5.76-32.25,1.12-2.38.08-5.07-.18-7.41.28-1.73.34-2.4,1.36-3.31,2.75-2.75,4.16-6.73,5.99-11.66,5.78-2.73-.12-3.27,1.1-4.08,3.37-.92,2.55-2.81,4.99-4.48,7.08-4.93,6.15-11.29,11.06-19.26,12.08-7.5.96-15.25.65-22.8.68-13.21.06-26.43.09-39.64.12-18.85.04-37.71.07-56.56.09-22.32.03-44.64.05-66.95.06s-46.73.02-70.09.02c-22.06,0-44.12-.01-66.18-.03-18.41-.02-36.82-.04-55.22-.09-12.37-.03-24.74-.06-37.11-.15-3.24-.02-6.48-.04-9.72-.1-.55,0-2.04-.03-2.05-.03-4.18-.6-10.48-3.52-14.17-6.49-5-4.03-8.03-11.32-9.59-17.43-.16-.64-.8-1.1-1.45-1.1h-3.26c-1.39,0-4.02.45-5.27-.22-1.66-.9-2.53-3.98-3.03-5.68-.19-.63-.78-1.1-1.45-1.1H1.45c-1.93,0-1.93,3,0,3h52.66l-1.45-1.1c.73,2.5,1.88,5.54,4.02,7.17,2.58,1.96,7.35.93,10.43.93l-1.45-1.1c1.53,5.99,4.43,12.81,8.75,17.29s10.22,6.78,15.87,8.38c2.2.63,4.46.5,6.74.53,10.17.12,20.34.14,30.52.17,16.99.06,33.97.08,50.96.1,21.51.03,43.03.04,64.54.05,23.44,0,46.87,0,70.31,0s46.07-.02,69.1-.05c20.3-.02,40.6-.05,60.89-.09,14.97-.03,29.94-.06,44.9-.12,7.32-.03,14.65.04,21.97-.14,3.33-.08,6.68-.27,9.97-.79,7.2-1.13,13.24-5.34,18.08-10.66,2.15-2.37,4.13-4.97,5.72-7.75.48-.85.88-1.71,1.27-2.6.56-1.31.44-1.3,2.1-1.23,3.68.15,7.32-1.16,10.14-3.5,1.51-1.25,2.21-2.76,3.45-4.18,1.64-1.89,6.13-1.15,8.51-1.23,10.56-.35,21.12-.8,31.68-1.1,1.93-.05,1.93-3.06,0-3h0Z" />
          <path d="M2542.27,141.33c-10.75.31-21.5.76-32.25,1.12-2.38.08-5.07-.18-7.41.28-1.73.34-2.4,1.36-3.31,2.75-2.75,4.16-6.73,5.99-11.66,5.78-2.73-.12-3.27,1.1-4.08,3.37-.92,2.55-2.81,4.99-4.48,7.08-4.93,6.15-11.29,11.06-19.26,12.08-7.5.96-15.25.65-22.8.68-13.21.06-26.43.09-39.64.12-18.85.04-37.71.07-56.56.09-22.32.03-44.64.05-66.95.06-23.36.01-46.73.02-70.09.02-22.06,0-44.12-.01-66.18-.03-18.41-.02-36.82-.04-55.22-.09-12.37-.03-24.74-.06-37.11-.15-3.24-.02-6.48-.04-9.72-.1-.55,0-2.04-.03-2.05-.03-4.18-.6-10.48-3.52-14.17-6.49-5-4.03-8.03-11.32-9.59-17.43-.16-.64-.8-1.1-1.45-1.1h-3.26c-1.39,0-4.02.45-5.27-.22-1.66-.9-2.53-3.98-3.03-5.68-.19-.63-.78-1.1-1.45-1.1h-52.66c-1.93,0-1.93,3,0,3h52.66l-1.45-1.1c.73,2.5,1.88,5.54,4.02,7.17,2.58,1.96,7.35.93,10.43.93l-1.45-1.1c1.53,5.99,4.43,12.81,8.75,17.29,4.14,4.3,10.22,6.78,15.87,8.38,2.2.63,4.46.5,6.74.53,10.17.12,20.34.14,30.52.17,16.99.06,33.97.08,50.96.1,21.51.03,43.03.04,64.54.05,23.44,0,46.87,0,70.31,0s46.07-.02,69.1-.05c20.3-.02,40.6-.05,60.89-.09,14.97-.03,29.94-.06,44.9-.12,7.32-.03,14.65.04,21.97-.14,3.33-.08,6.68-.27,9.97-.79,7.2-1.13,13.24-5.34,18.08-10.66,2.15-2.37,4.13-4.97,5.72-7.75.48-.85.88-1.71,1.27-2.6.56-1.31.44-1.3,2.1-1.23,3.68.15,7.32-1.16,10.14-3.5,1.51-1.25,2.21-2.76,3.45-4.18,1.64-1.89,6.13-1.15,8.51-1.23,10.56-.35,21.12-.8,31.68-1.1,1.93-.05,1.93-3.06,0-3h0Z" />
        </svg>

        {/* Nav content */}
        <div className="relative z-10 h-[72px] flex items-center justify-between px-5 lg:px-10">
          {/* RIGHT: Logo + brand */}
          <div className="flex items-center flex-shrink-0">
            <Link href={`/${locale}`} className="flex items-center gap-2">
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
                  فارد
                </p>
                <p className="font-farsi text-[9px] text-[--text-muted]">
                  تجارت معنوی
                </p>
              </div>
            </Link>
          </div>

          {/* CENTER: Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link href={`/${locale}`}>
              <span
                className={`text-sm transition-colors ${
                  pathname === `/${locale}` || pathname === "/"
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
                        href={`/${locale}${item.href}`}
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
              <Link key={link.href} href={`/${locale}${link.href}`}>
                <span
                  className={`text-sm transition-colors ${
                    pathname === `/${locale}${link.href}`
                      ? "text-[--gold-accent]"
                      : "text-[--text-secondary] hover:text-[--text-primary]"
                  }`}
                >
                  {t(link.labelKey)}
                </span>
              </Link>
            ))}
          </nav>

          {/* LEFT: Search + Icons */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            {/* Language Toggle */}
            <LanguageToggle />

            {/* Search bar */}
            <div className="relative w-48 xl:w-64">
              <input
                type="text"
                placeholder={locale === 'en' ? "Search..." : "جستجو..."}
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
              href={isLoggedIn ? `/${locale}/profile` : `/${locale}/auth`}
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

            {/* Cart with hover panel */}
            <div
              ref={cartContainerRef}
              className="relative"
              onMouseEnter={handleCartMouseEnter}
              onMouseLeave={handleCartMouseLeave}
            >
              <div
                className="relative p-2 rounded-lg transition-colors hover:bg-white/[0.06] cursor-pointer"
                onClick={handleCartClick}
                role="button"
                tabIndex={0}
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
              </div>

              <CartHoverPanel
                isOpen={cartOpen}
                items={items}
                totalPrice={totalPrice}
                totalItems={totalItems}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
                onClose={() => setCartOpen(false)}
                width={420}
              />
            </div>
          </div>

          {/* Mobile: Cart + Hamburger */}
          <div className="flex lg:hidden items-center gap-1">
            <Link href={`/${locale}/cart`} className="relative p-2">
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
              aria-label={locale === 'en' ? "Menu" : "منو"}
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