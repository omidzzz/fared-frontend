"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLocale } from "@/hooks/useLocale";
import type { LocalCartItem } from "@/lib/cart-context";

// ─── Compact Cart Item Row ───
function CompactCartItemRow({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: LocalCartItem;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}) {
  const t = useTranslations("cart");
  const { isRTL } = useLocale();
  const [removing, setRemoving] = useState(false);
  const controlHeight = 32;

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => onRemove(item.id), 250);
  };

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 12px",
        margin: "6px 0",
        background: "rgba(255,255,255,0.05)",
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.08)",
        transition: "opacity 0.25s ease, transform 0.25s ease",
        opacity: removing ? 0 : 1,
        transform: removing
          ? isRTL
            ? "translateX(10px)"
            : "translateX(-10px)"
          : "none",
        flexDirection: isRTL ? "row-reverse" : "row",
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          position: "relative",
          width: 50,
          height: 50,
          flexShrink: 0,
          borderRadius: 8,
          overflow: "hidden",
          background: "rgba(255,255,255,0.05)",
        }}
      >
        <Image
          src={item.image || "/images/products/stones/amethyst.webp"}
          alt={item.name}
          fill
          sizes="50px"
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
            fontSize: "0.82rem",
            fontWeight: 600,
            color: "#fff",
            marginBottom: 1,
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
            fontSize: "0.65rem",
            color: "rgba(255,255,255,0.6)",
            marginBottom: 4,
            textAlign: isRTL ? "right" : "left",
          }}
        >
          {item.variant || item.productType}
        </p>
        <p
          style={{
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "#c084f5",
            fontFamily: "'Playfair Display',Georgia,serif",
            textAlign: isRTL ? "right" : "left",
          }}
        >
          {(item.price * item.quantity).toFixed(2)} تومان
        </p>
      </div>

      {/* Qty controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "rgba(255,255,255,0.08)",
          borderRadius: 100,
          padding: "4px 10px",
          border: "1px solid rgba(255,255,255,0.1)",
          height: controlHeight,
          flexShrink: 0,
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
            fontSize: "0.9rem",
            cursor: "pointer",
            lineHeight: 1,
            width: 16,
            textAlign: "center",
            padding: 0,
          }}
        >
          −
        </button>
        <span
          style={{
            fontSize: "0.75rem",
            color: "#fff",
            fontWeight: 500,
            minWidth: 16,
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
            fontSize: "0.9rem",
            cursor: "pointer",
            lineHeight: 1,
            width: 16,
            textAlign: "center",
            padding: 0,
          }}
        >
          +
        </button>
      </div>

      {/* Remove */}
      <button
        onClick={handleRemove}
        aria-label={t("remove")}
        style={{
          background: "none",
          border: "none",
          color: "rgba(255,255,255,0.4)",
          cursor: "pointer",
          padding: "0 4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: controlHeight,
          minWidth: 28,
          transition: "color 0.2s ease",
          flexShrink: 0,
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "rgba(255,100,100,0.9)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "rgba(255,255,255,0.4)")
        }
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          width={16}
          height={16}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h18" />
          <path d="M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2" />
          <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
        </svg>
      </button>
    </div>
  );
}

// ─── Main Compact Cart Panel ───
interface CompactCartPanelProps {
  items: LocalCartItem[];
  totalPrice: number;
  totalItems: number;
  updateQuantity: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  onCheckout: () => void;
  onViewCart: () => void;
  onClose?: () => void;
  showCloseButton?: boolean;
}

export function CompactCartPanel({
  items,
  totalPrice,
  totalItems,
  updateQuantity,
  removeItem,
  onCheckout,
  onViewCart,
  onClose,
  showCloseButton = true,
}: CompactCartPanelProps) {
  const t = useTranslations("cart");
  const { isRTL } = useLocale();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px 20px 12px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: isRTL ? "row-reverse" : "row",
        }}
      >
        <h3
          style={{
            fontFamily: "'Playfair Display',Georgia,serif",
            fontSize: "1rem",
            fontWeight: 400,
            color: "#fff",
            margin: 0,
            letterSpacing: "0.02em",
            textAlign: isRTL ? "right" : "left",
          }}
        >
          {t("title")} ({totalItems} {t("items")})
        </h3>
        {showCloseButton && onClose && (
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.5)",
              cursor: "pointer",
              fontSize: "1.2rem",
              padding: "0 4px",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Items */}
      <div
        style={{
          overflowY: "auto",
          flex: 1,
          padding: "8px 16px 16px",
          minHeight: 100,
          maxHeight: 400,
        }}
      >
        {items.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{ opacity: 0.3, fontSize: "2.5rem" }}>🔮</div>
            <p
              style={{
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.6)",
                margin: 0,
                textAlign: isRTL ? "right" : "left",
              }}
            >
              {t("empty")}
            </p>
          </div>
        ) : (
          items.map((item, i) => (
            <div
              key={item.id}
              style={{
                animation: `fadeSlideUp 0.3s ease forwards`,
                animationDelay: `${i * 60}ms`,
                opacity: 0,
              }}
            >
              <CompactCartItemRow
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
            borderTop: "1px solid rgba(255,255,255,0.08)",
            padding: "14px 20px 18px",
            background: "rgba(255,255,255,0.03)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
              flexDirection: isRTL ? "row-reverse" : "row",
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.04em",
                textAlign: isRTL ? "right" : "left",
              }}
            >
              {t("total")}
            </span>
            <span
              style={{
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "#fff",
                fontFamily: "'Playfair Display',Georgia,serif",
                textAlign: isRTL ? "right" : "left",
              }}
            >
              {totalPrice.toFixed(2)} تومان
            </span>
          </div>

          <div
            style={{
              display: "flex",
              gap: 10,
              flexDirection: isRTL ? "row-reverse" : "row",
            }}
          >
            <button
              onClick={onViewCart}
              style={{
                flex: 1,
                textAlign: "center",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 100,
                padding: "10px 16px",
                color: "#fff",
                fontSize: "0.8rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "background 0.2s ease",
                fontFamily: "'Playfair Display',Georgia,serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              }}
            >
              {t("viewCart")}
            </button>
            <button
              onClick={onCheckout}
              style={{
                flex: 1.5,
                background:
                  "linear-gradient(135deg, rgba(200,100,255,0.6), rgba(255,120,200,0.5))",
                border: "1.5px solid rgba(220,140,255,0.7)",
                borderRadius: 100,
                padding: "10px 16px",
                color: "#fff",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Playfair Display',Georgia,serif",
                letterSpacing: "0.02em",
                boxShadow: "0 0 20px rgba(200,100,255,0.25)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                flexDirection: isRTL ? "row-reverse" : "row",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 0 30px rgba(200,100,255,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(200,100,255,0.25)";
              }}
            >
              {t("checkout")}
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}

// ─── Cart Hover Panel Wrapper ───
// ─── Cart Hover Panel Wrapper ───
export function CartHoverPanel({
  isOpen,
  items,
  totalPrice,
  totalItems,
  updateQuantity,
  removeItem,
  onClose,
  width = 420,
}: {
  isOpen: boolean;
  items: LocalCartItem[];
  totalPrice: number;
  totalItems: number;
  updateQuantity: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  onClose: () => void;
  width?: number;
}) {
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);
  const { isRTL } = useLocale();

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div
      ref={panelRef}
      style={{
        position: "absolute",
        top: "calc(100% + 8px)",
        // Use inset-inline-end for RTL-aware positioning
        // In LTR: right: 0, In RTL: left: 0
        insetInlineEnd: 0,
        width: width,
        maxHeight: "80vh",
        background: "rgba(10, 2, 30, 0.95)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: 16,
        boxShadow:
          "0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(192,132,245,0.1)",
        overflow: "hidden",
        display: isOpen ? "flex" : "none",
        flexDirection: "column",
        animation: isOpen ? "cartSlideDown 0.25s ease forwards" : "none",
        transformOrigin: "top right",
        zIndex: 1000,
        pointerEvents: isOpen ? "auto" : "none",
      }}
    >
      <CompactCartPanel
        items={items}
        totalPrice={totalPrice}
        totalItems={totalItems}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        onCheckout={() => {
          onClose();
          router.push("/checkout");
        }}
        onViewCart={() => {
          onClose();
          router.push("/cart");
        }}
        onClose={onClose}
        showCloseButton={true}
      />

      <style jsx global>{`
        @keyframes cartSlideDown {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-8px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}