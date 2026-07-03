"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLocale } from "@/hooks/useLocale";
import { useCart } from "@/lib/cart-context";
import type { LocalCartItem } from "@/lib/cart-context";
import CTAButton from "@/components/ui/CTAButton";

/* ── Sidebar icons ── */
const NAV_ITEMS = [
  { icon: "shop", labelKey: "nav.shop", href: "/shop" },
  { icon: "collections", labelKey: "nav.collections", href: "/shop" },
  { icon: "about", labelKey: "nav.about", href: "/about" },
  { icon: "account", labelKey: "nav.account", href: "/profile" },
  { icon: "energy", labelKey: "nav.energyGuide", href: "/energy-guide" },
];

function SidebarIcon({ name }: { name: string }) {
  const c = "rgba(212,175,100,0.8)";
  const s: Record<string, React.ReactNode> = {
    shop: (
      <svg
        viewBox="0 0 28 28"
        fill="none"
        stroke={c}
        strokeWidth="1.2"
        width={28}
        height={28}
      >
        <polygon points="14,3 20,12 14,25 8,12" />
        <path d="M8 12h12" opacity="0.5" />
      </svg>
    ),
    collections: (
      <svg
        viewBox="0 0 28 28"
        fill="none"
        stroke={c}
        strokeWidth="1.2"
        width={28}
        height={28}
      >
        <path d="M24 14A10 10 0 1114 4a10 10 0 0110 10z" opacity="0.4" />
        <circle cx="14" cy="14" r="6" />
      </svg>
    ),
    about: (
      <svg
        viewBox="0 0 28 28"
        fill="none"
        stroke={c}
        strokeWidth="1.2"
        width={28}
        height={28}
      >
        <path d="M14 3L24 8v12L14 25 4 20V8z" />
        <path d="M4 8l10 5" />
        <path d="M24 8l-10 5" />
      </svg>
    ),
    account: (
      <svg
        viewBox="0 0 28 28"
        fill="none"
        stroke={c}
        strokeWidth="1.2"
        width={28}
        height={28}
      >
        <circle cx="14" cy="10" r="5" />
        <path d="M5 24c0-5 4-9 9-9s9 4 9 9" />
      </svg>
    ),
    energy: (
      <svg
        viewBox="0 0 28 28"
        fill="none"
        stroke={c}
        strokeWidth="1.2"
        width={28}
        height={28}
      >
        <path d="M14 4c-3 4.5-3 10 0 14 3-4 3-9.5 0-14z" />
        <path d="M14 18c-4.5-2.5-9-2-13 1 4.5 2.5 9 2 13-1zM14 18c4.5-2.5 9-2 13 1-4.5 2.5-9 2-13-1z" />
      </svg>
    ),
  };
  return <>{s[name]}</>;
}

/* ── Trash icon SVG ── */
function TrashIcon({ size = 20, color = "rgba(255,255,255,0.5)" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      width={size}
      height={size}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2" />
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}

function CartItemRow({
  item,
  onUpdateQuantity,
  onRemove,
  isMobile = false,
}: {
  item: LocalCartItem;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  isMobile?: boolean;
}) {
  const t = useTranslations("cart");
  const { isRTL } = useLocale();
  const [removing, setRemoving] = useState(false);
  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => onRemove(item.id), 250);
  };

  const controlHeight = isMobile ? 38 : 42;

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        display: "flex",
        alignItems: "center",
        gap: isMobile ? 12 : 20,
        padding: isMobile ? "12px 16px" : "16px 20px",
        margin: isMobile ? "8px 0" : "10px 0",
        background: isMobile ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.07)",
        backdropFilter: isMobile ? "blur(6px)" : "none",
        WebkitBackdropFilter: isMobile ? "blur(6px)" : "none",
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.12)",
        transition: "opacity 0.25s ease, transform 0.25s ease",
        opacity: removing ? 0 : 1,
        transform: removing
          ? isRTL
            ? "translateX(20px)"
            : "translateX(-20px)"
          : "none",
        flexDirection: isRTL ? "row-reverse" : "row",
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          position: "relative",
          width: isMobile ? 70 : 90,
          height: isMobile ? 70 : 90,
          flexShrink: 0,
          borderRadius: 12,
          overflow: "hidden",
          background: "rgba(255,255,255,0.05)",
        }}
      >
        <Image
          src={item.image || "/images/products/stones/amethyst.webp"}
          alt={item.name}
          fill
          sizes={isMobile ? "70px" : "90px"}
          style={{ objectFit: "cover" }}
          unoptimized
          onError={(e) => {
            (e.target as HTMLImageElement).style.opacity = "0.3";
          }}
        />
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3
          style={{
            fontSize: isMobile ? "0.9rem" : "1rem",
            fontWeight: 600,
            color: "#fff",
            marginBottom: 2,
            fontFamily: "'Playfair Display',Georgia,serif",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            textAlign: isRTL ? "right" : "left",
          }}
        >
          {item.nameFA || item.name}
        </h3>
        <p
          style={{
            fontSize: "0.72rem",
            color: "rgba(255,255,255,0.75)",
            marginBottom: 6,
            textAlign: isRTL ? "right" : "left",
          }}
        >
          {item.variant || item.productType}
        </p>
        <p
          style={{
            fontSize: isMobile ? "1rem" : "1.1rem",
            fontWeight: 600,
            color: "#c084f5",
            fontFamily: "'Playfair Display',Georgia,serif",
            textAlign: isRTL ? "right" : "left",
          }}
        >
          {(item.price * item.quantity).toFixed(2)} تومان
        </p>

        {isMobile && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginTop: 8,
              background: "rgba(255,255,255,0.15)",
              borderRadius: 100,
              padding: "6px 12px",
              border: "1px solid rgba(255,255,255,0.2)",
              height: controlHeight,
              flexDirection: isRTL ? "row-reverse" : "row",
            }}
          >
            <button
              onClick={() =>
                onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
              }
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: "1rem",
                cursor: "pointer",
                lineHeight: 1,
                width: 18,
                textAlign: "center",
              }}
            >
              −
            </button>
            <span
              style={{
                fontSize: "0.85rem",
                color: "#fff",
                fontWeight: 500,
                minWidth: 18,
                textAlign: "center",
              }}
            >
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: "1rem",
                cursor: "pointer",
                lineHeight: 1,
                width: 18,
                textAlign: "center",
              }}
            >
              +
            </button>
          </div>
        )}
      </div>

      {/* Desktop qty controls */}
      {!isMobile && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "rgba(255,255,255,0.1)",
            borderRadius: 100,
            padding: "8px 16px",
            border: "1px solid rgba(255,255,255,0.15)",
            height: controlHeight,
            flexDirection: isRTL ? "row-reverse" : "row",
          }}
        >
          <button
            onClick={() =>
              onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
            }
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "1.1rem",
              cursor: "pointer",
              lineHeight: 1,
              width: 20,
              textAlign: "center",
            }}
          >
            −
          </button>
          <span
            style={{
              fontSize: "0.95rem",
              color: "#fff",
              fontWeight: 500,
              minWidth: 20,
              textAlign: "center",
            }}
          >
            {item.quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "1.1rem",
              cursor: "pointer",
              lineHeight: 1,
              width: 20,
              textAlign: "center",
            }}
          >
            +
          </button>
        </div>
      )}

      {/* Remove button */}
      <button
        onClick={handleRemove}
        aria-label={t("remove")}
        style={{
          background: "none",
          border: "none",
          color: "rgba(255,255,255,0.5)",
          cursor: "pointer",
          padding: "0 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: controlHeight,
          minWidth: 40,
          transition: "color 0.2s ease",
          flexShrink: 0,
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "rgba(255,100,100,0.9)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
        }
      >
        <TrashIcon size={isMobile ? 22 : 20} color="currentColor" />
      </button>
    </div>
  );
}

export default function CartPage() {
  const t = useTranslations("cart");
  const { isRTL } = useLocale();
  const { items, totalPrice, totalItems, updateQuantity, removeItem } =
    useCart();
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <main
      style={{ fontFamily: "'Inter', sans-serif", color: "#fff" }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* ─────────────────── DESKTOP LAYOUT ─────────────────── */}
      <div className="cart-desktop" style={{ position: "relative", zIndex: 0 }}>
        {/* Fixed background */}
        <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
          <Image
            src="/images/hero-backgrounds/cart-hero.webp"
            alt=""
            fill
            sizes="100vw"
            unoptimized
            priority
            className="object-cover object-center"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            minHeight: "100vh",
            display: "flex",
            flexDirection: isRTL ? "row-reverse" : "row",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px 40px",
            gap: 24,
          }}
        >
          {/* ── FLOATING SIDEBAR ── */}
          <div
            style={{
              flexShrink: 0,
              width: 90,
              background: "rgba(10, 2, 30, 0.75)",
              backdropFilter: "blur(24px)",
              borderRadius: 24,
              border: "1px solid rgba(212,175,100,0.15)",
              padding: "24px 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 28,
              alignSelf: "center",
            }}
          >
            <Link href="/" style={{ marginBottom: 16 }}>
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  border: "1.5px solid rgba(212,175,100,0.6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(212,175,100,0.08)",
                }}
              >
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="rgba(212,175,100,0.9)"
                  strokeWidth="1.2"
                  width={32}
                  height={32}
                >
                  <path d="M16 6c-3 4-3 9 0 13 3-4 3-9 0-13z" />
                  <path d="M16 19c-4.5-2.5-9-2-13 1 4.5 2.5 9 2 13-1zM16 19c4.5-2.5 9-2 13 1-4.5 2.5-9 2-13-1z" />
                </svg>
              </div>
            </Link>
            <div
              style={{
                width: 40,
                height: 1,
                background: "rgba(212,175,100,0.2)",
              }}
            />
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.labelKey}
                href={item.href}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  textDecoration: "none",
                  opacity: 0.7,
                  transition: "opacity 0.2s ease",
                }}
              >
                <SidebarIcon name={item.icon} />
                <span
                  style={{
                    fontSize: "0.65rem",
                    color: "rgba(255,255,255,0.7)",
                    letterSpacing: "0.05em",
                    textAlign: "center",
                  }}
                >
                  {t(item.labelKey)}
                </span>
              </Link>
            ))}
          </div>

          {/* ── MAIN PANEL ── */}
          <div
            dir={isRTL ? "rtl" : "ltr"}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: 780,
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: 780,
                background: "rgba(10, 2, 30, 0.75)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 28,
                overflow: "hidden",
                maxHeight: "90vh",
                display: "flex",
                flexDirection: "column",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "none" : "translateY(30px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
            >
              <CartPanelInner
                items={items}
                totalPrice={totalPrice}
                totalItems={totalItems}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
                router={router}
                isMobile={false}
                t={t}
                isRTL={isRTL}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────── MOBILE LAYOUT ─────────────────── */}
      <div
        className="cart-mobile"
        style={{
          paddingTop: "70px",
          minHeight: "100dvh",
          position: "relative",
          zIndex: 0,
          direction: isRTL ? "rtl" : "ltr",
        }}
      >
        {/* ─── Background image ─── */}
        <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
          <Image
            src="/images/hero-backgrounds/cart-hero.webp"
            alt=""
            fill
            sizes="100vw"
            unoptimized
            priority
            className="object-cover object-center"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        {/* ─── Dark overlay ─── */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1,
            background: "rgba(0, 0, 0, 0.55)",
          }}
        />

        {/* ─── Ambient glow ─── */}
        <div
          style={{
            position: "fixed",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 320,
            height: 320,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(192,100,255,0.18) 0%, transparent 70%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* ─── Mobile top navigation ─── */}
        <div
          style={{
            position: "relative",
            zIndex: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            padding: "12px 0 12px 0",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            flexDirection: isRTL ? "row-reverse" : "row",
          }}
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.labelKey}
              href={item.href}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                textDecoration: "none",
                opacity: 0.75,
              }}
            >
              <SidebarIcon name={item.icon} />
              <span
                style={{
                  fontSize: "0.58rem",
                  color: "rgba(255,255,255,0.8)",
                  letterSpacing: "0.04em",
                }}
              >
                {t(item.labelKey)}
              </span>
            </Link>
          ))}
        </div>

        {/* Top bar */}
        <div
          style={{
            position: "relative",
            zIndex: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            flexDirection: isRTL ? "row-reverse" : "row",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
              flexDirection: isRTL ? "row-reverse" : "row",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "1.5px solid rgba(212,175,100,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(212,175,100,0.08)",
              }}
            >
              <svg
                viewBox="0 0 32 32"
                fill="none"
                stroke="rgba(212,175,100,0.9)"
                strokeWidth="1.2"
                width={18}
                height={18}
              >
                <path d="M16 6c-3 4-3 9 0 13 3-4 3-9 0-13z" />
                <path d="M16 19c-4.5-2.5-9-2-13 1 4.5 2.5 9 2 13-1zM16 19c4.5-2.5 9-2 13 1-4.5 2.5-9 2-13-1z" />
              </svg>
            </div>
          </Link>

          <h1
            style={{
              fontFamily: "'Playfair Display',Georgia,serif",
              fontSize: "1.15rem",
              fontWeight: 400,
              color: "#fff",
              letterSpacing: "0.04em",
              margin: 0,
              textShadow: "0 2px 8px rgba(0,0,0,0.5)",
              textAlign: isRTL ? "right" : "left",
            }}
          >
            {t("title")}
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 16 }}>
              ♡
            </span>
            <div style={{ position: "relative" }}>
              <span style={{ fontSize: 16 }}>🛒</span>
              <span
                style={{
                  position: "absolute",
                  top: -6,
                  right: isRTL ? "auto" : -8,
                  left: isRTL ? -8 : "auto",
                  background: "#f5a623",
                  color: "#fff",
                  borderRadius: "50%",
                  width: 16,
                  height: 16,
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {totalItems}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            position: "relative",
            zIndex: 3,
            textAlign: "center",
            padding: "10px 0 4px",
          }}
        >
          <div style={{ position: "relative", width: 100, margin: "0 auto" }}>
            <div
              style={{
                borderTop: "1px solid rgba(212,175,100,0.4)",
                width: "100%",
              }}
            />
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                color: "#d4af64",
                fontSize: 8,
                lineHeight: 0,
              }}
            >
              ◆
            </span>
          </div>
        </div>

        {/* Items */}
        <div
          style={{
            position: "relative",
            zIndex: 3,
            flex: 1,
            overflowY: "auto",
            padding: "8px 16px 24px",
            minHeight: "calc(100vh - 200px)",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(20px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          {items.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
                background: "rgba(0,0,0,0.3)",
                backdropFilter: "blur(4px)",
                borderRadius: 20,
                marginTop: 20,
              }}
            >
              <div style={{ opacity: 0.3, fontSize: "3.5rem" }}>🔮</div>
              <h3
                style={{
                  fontFamily: "'Playfair Display',Georgia,serif",
                  fontSize: "1.2rem",
                  color: "rgba(255,255,255,0.85)",
                  fontWeight: 400,
                  margin: 0,
                  textAlign: isRTL ? "right" : "left",
                }}
              >
                {t("empty")}
              </h3>
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "rgba(255,255,255,0.6)",
                  margin: 0,
                  textAlign: isRTL ? "right" : "left",
                }}
              >
                {t("emptySubtitle")}
              </p>
              <CTAButton href="/shop">{t("explore")}</CTAButton>
            </div>
          ) : (
            items.map((item, i) => (
              <div
                key={item.id}
                style={{
                  animation: `fadeSlideUp 0.4s ease forwards`,
                  animationDelay: `${i * 80}ms`,
                  opacity: 0,
                }}
              >
                <CartItemRow
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                  isMobile
                />
              </div>
            ))
          )}
        </div>

        {/* Mobile footer */}
        {items.length > 0 && (
          <div
            style={{
              position: "sticky",
              bottom: 0,
              zIndex: 10,
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              borderTop: "1px solid rgba(255,255,255,0.12)",
              padding: "16px 20px 24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 14,
                flexDirection: isRTL ? "row-reverse" : "row",
              }}
            >
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.6)",
                  letterSpacing: "0.04em",
                }}
              >
                {t("subtotal")}
              </span>
              <span
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#fff",
                  fontFamily: "'Playfair Display',Georgia,serif",
                  textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                }}
              >
                {totalPrice.toFixed(2)} تومان
              </span>
            </div>

            <button
              onClick={() => router.push("/checkout")}
              style={{
                width: "100%",
                background:
                  "linear-gradient(135deg, rgba(200,100,255,0.7), rgba(255,120,200,0.6))",
                border: "1.5px solid rgba(220,140,255,0.8)",
                borderRadius: 100,
                padding: "15px 24px",
                color: "#fff",
                fontSize: "1rem",
                fontWeight: 600,
                fontFamily: "'Playfair Display',Georgia,serif",
                cursor: "pointer",
                letterSpacing: "0.02em",
                boxShadow: "0 0 30px rgba(200,100,255,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                flexDirection: isRTL ? "row-reverse" : "row",
              }}
            >
              <span style={{ fontSize: "1.1rem" }}>✦</span> {t("checkout")}
            </button>

            <p
              style={{
                fontSize: "0.65rem",
                color: "rgba(255,255,255,0.5)",
                textAlign: "center",
                marginTop: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                flexDirection: isRTL ? "row-reverse" : "row",
              }}
            >
              🔒 {t("secureCheckout")}
            </p>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }

        .cart-desktop {
          display: block;
        }

        .cart-mobile {
          display: none;
          flex-direction: column;
          background: transparent;
          min-height: 100dvh;
        }

        @media (max-width: 768px) {
          .cart-desktop {
            display: none !important;
          }
          .cart-mobile {
            display: flex !important;
            flex-direction: column;
            min-height: 100dvh;
            background: transparent;
          }
        }
      `}</style>
    </main>
  );
}

/* ── Shared panel inner ── */
function CartPanelInner({
  items,
  totalPrice,
  totalItems,
  updateQuantity,
  removeItem,
  router,
  isMobile,
  t,
  isRTL,
}: {
  items: LocalCartItem[];
  totalPrice: number;
  totalItems: number;
  updateQuantity: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  router: ReturnType<typeof useRouter>;
  isMobile: boolean;
  t: (key: string) => string;
  isRTL: boolean;
}) {
  return (
    <>
      {/* Header */}
      <div
        style={{
          textAlign: isRTL ? "right" : "left",
          padding: "32px 32px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          position: "relative",
          direction: isRTL ? "rtl" : "ltr",
        }}
      >
        <div style={{ marginBottom: 12, textAlign: "center" }}>
          <svg
            viewBox="0 0 40 40"
            fill="none"
            stroke="rgba(160,100,240,0.9)"
            strokeWidth="1.2"
            width={40}
            height={40}
          >
            <path d="M20 4c-3.5 5-3.5 11 0 16 3.5-5 3.5-11 0-16z" />
            <path d="M20 20c-5.5-3-11-2-16 1 5.5 3 11 2 16-1zM20 20c5.5-3 11-2 16 1-5.5 3-11 2-16-1z" />
          </svg>
        </div>
        <h1
          style={{
            fontFamily: "'Playfair Display',Georgia,serif",
            fontSize: "2rem",
            fontWeight: 400,
            color: "#fff",
            letterSpacing: "0.02em",
            textAlign: isRTL ? "right" : "left",
          }}
        >
          {t("title")}
        </h1>
        <div
          style={{ position: "relative", width: 120, margin: "16px auto 0" }}
        >
          <div
            style={{
              borderTop: "1px solid rgba(212,175,100,0.5)",
              width: "100%",
            }}
          />
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              color: "#d4af64",
              fontSize: 8,
              lineHeight: 0,
            }}
          >
            ◆
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            top: 20,
            right: isRTL ? "auto" : 20,
            left: isRTL ? 20 : "auto",
            display: "flex",
            gap: 12,
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 18 }}>
            ♡
          </span>
          <div style={{ position: "relative" }}>
            <span style={{ fontSize: 18 }}>🛒</span>
            <span
              style={{
                position: "absolute",
                top: -8,
                right: isRTL ? "auto" : -8,
                left: isRTL ? -8 : "auto",
                background: "#f5a623",
                color: "#fff",
                borderRadius: "50%",
                width: 18,
                height: 18,
                fontSize: "0.65rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {totalItems}
            </span>
          </div>
        </div>
      </div>

      {/* Items */}
      <div
        style={{
          overflowY: "auto",
          flex: 1,
          padding: "8px 32px 24px",
          minHeight: 200,
          direction: isRTL ? "rtl" : "ltr",
        }}
      >
        {items.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
            }}
          >
            <div style={{ opacity: 0.3, fontSize: "4rem" }}>🔮</div>
            <h3
              style={{
                fontFamily: "'Playfair Display',Georgia,serif",
                fontSize: "1.3rem",
                color: "rgba(255,255,255,0.7)",
                fontWeight: 400,
                textAlign: isRTL ? "right" : "left",
              }}
            >
              {t("empty")}
            </h3>
            <p
              style={{
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.45)",
                textAlign: isRTL ? "right" : "left",
              }}
            >
              {t("emptySubtitle")}
            </p>
            <CTAButton href="/shop">{t("explore")}</CTAButton>
          </div>
        ) : (
          items.map((item, i) => (
            <div
              key={item.id}
              style={{
                animation: `fadeSlideUp 0.4s ease forwards`,
                animationDelay: `${i * 100}ms`,
                opacity: 0,
              }}
            >
              <CartItemRow
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {items.length > 0 && (
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            padding: "20px 32px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            background: "rgba(255,255,255,0.04)",
            flexDirection: isRTL ? "row-reverse" : "row",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              flexDirection: isRTL ? "row-reverse" : "row",
            }}
          >
            <svg
              viewBox="0 0 36 36"
              fill="none"
              stroke="#c084f5"
              strokeWidth="1.2"
              width={36}
              height={36}
            >
              <path d="M18 3l-8 16h16z" fill="rgba(192,132,245,0.2)" />
              <path d="M18 3l-12 16h24z" opacity="0.5" />
            </svg>
            <div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.55)",
                  letterSpacing: "0.05em",
                  textAlign: isRTL ? "right" : "left",
                }}
              >
                {t("subtotal")}
              </div>
              <div
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  color: "#fff",
                  fontFamily: "'Playfair Display',Georgia,serif",
                  textAlign: isRTL ? "right" : "left",
                }}
              >
                {totalPrice.toFixed(2)} تومان
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: isRTL ? "flex-start" : "flex-end",
              gap: 8,
            }}
          >
            <button
              onClick={() => router.push("/checkout")}
              disabled={items.length === 0}
              style={{
                opacity: items.length === 0 ? 0.5 : 1,
                pointerEvents: items.length === 0 ? "none" : "auto",
                background:
                  "linear-gradient(135deg, rgba(200,100,255,0.6), rgba(255,120,200,0.5))",
                border: "1.5px solid rgba(220,140,255,0.7)",
                borderRadius: 100,
                padding: "14px 36px",
                color: "#fff",
                fontSize: "1rem",
                fontWeight: 600,
                fontFamily: "'Playfair Display',Georgia,serif",
                cursor: "pointer",
                letterSpacing: "0.02em",
                boxShadow:
                  "0 0 30px rgba(200,100,255,0.4), 0 0 60px rgba(200,100,255,0.15)",
                display: "flex",
                alignItems: "center",
                gap: 12,
                transition: "all 0.3s ease",
                whiteSpace: "nowrap",
                flexDirection: isRTL ? "row-reverse" : "row",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 0 40px rgba(200,100,255,0.6), 0 0 80px rgba(200,100,255,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow =
                  "0 0 30px rgba(200,100,255,0.4), 0 0 60px rgba(200,100,255,0.15)";
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>✦</span> {t("checkout")}
            </button>
            <p
              style={{
                fontSize: "0.68rem",
                color: "rgba(255,255,255,0.4)",
                display: "flex",
                alignItems: "center",
                gap: 4,
                flexDirection: isRTL ? "row-reverse" : "row",
              }}
            >
              🔒 {t("secureCheckout")}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
