"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useTranslations } from "next-intl";
import { useLocale } from "@/hooks/useLocale";
import type { Accessory } from "@/lib/mock-data";

interface AccessoryCardProps {
  accessory: Accessory;
}

export default function AccessoryCard({ accessory }: AccessoryCardProps) {
  const { addItem } = useCart();
  const t = useTranslations("accessories");
  const { isRTL } = useLocale();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: accessory.id,
      productType: "accessory",
      name: accessory.name,
      nameFA: accessory.nameFA,
      price: accessory.price,
      currency: "USD" as const,
      quantity: 1,
      image: accessory.image,
    });
  };

  return (
    <Link
      href={`/shop/accessories/${accessory.slug}`}
      style={{
        textDecoration: "none",
        display: "block",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: "16px",
          overflow: "hidden",
          cursor: "pointer",
          transition: "transform 0.4s ease, box-shadow 0.4s ease",
          background: "#0f1a18",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          border: "1px solid rgba(127,220,203,0.12)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          direction: isRTL ? "rtl" : "ltr",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-6px) scale(1.01)";
          e.currentTarget.style.boxShadow =
            "0 12px 40px rgba(127,220,203,0.08), 0 0 30px rgba(127,220,203,0.03)";
          e.currentTarget.style.borderColor = "rgba(127,220,203,0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0) scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
          e.currentTarget.style.borderColor = "rgba(127,220,203,0.12)";
        }}
      >
        {/* Image wrapper - Fixed aspect ratio */}
        <div
          style={{
            borderRadius: "16px 16px 0 0",
            overflow: "hidden",
            position: "relative",
            flex: "0 0 65%",
            minHeight: "200px",
            background: "#0a1412",
          }}
        >
          <Image
            src={accessory.image}
            alt={accessory.name}
            fill
            sizes="(min-width: 1024px) 20vw, 50vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          {/* Subtle gradient overlay */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50%",
              background:
                "linear-gradient(to top, #0f1a18 0%, transparent 100%)",
            }}
          />
        </div>

        {/* Info section - Compact */}
        <div
          style={{
            padding: "10px 14px 12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#0f1a18",
            textAlign: isRTL ? "right" : "center",
            borderRadius: "0 0 16px 16px",
            overflow: "hidden",
            flex: "1",
            position: "relative",
            justifyContent: "center",
          }}
        >
          <h3
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "0.8rem",
              fontWeight: 500,
              color: "#f3eee2",
              letterSpacing: "0.03em",
              margin: 0,
              lineHeight: 1.2,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              maxHeight: "2.4em",
              textAlign: isRTL ? "right" : "center",
            }}
          >
            {isRTL ? accessory.nameFA : accessory.name}
          </h3>

          <p
            style={{
              fontSize: "0.6rem",
              color: "rgba(255,255,255,0.35)",
              margin: "2px 0 6px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontFamily: "Jost, sans-serif",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textAlign: isRTL ? "right" : "center",
            }}
          >
            {accessory.material}
          </p>

          {/* Price and Add to Cart - Same Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              paddingTop: "4px",
              borderTop: "1px solid rgba(127,220,203,0.06)",
              flexDirection: isRTL ? "row-reverse" : "row",
            }}
          >
            <p
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "#7fdccb",
                margin: 0,
                textAlign: isRTL ? "right" : "left",
              }}
            >
              {accessory.price.toFixed(2)} تومان
            </p>

            <button
              onClick={handleAdd}
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                border: "1px solid rgba(127,220,203,0.2)",
                background: "rgba(127,220,203,0.05)",
                backdropFilter: "blur(4px)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(127,220,203,0.15)";
                e.currentTarget.style.borderColor = "rgba(127,220,203,0.5)";
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(127,220,203,0.05)";
                e.currentTarget.style.borderColor = "rgba(127,220,203,0.2)";
                e.currentTarget.style.transform = "scale(1)";
              }}
              aria-label={t("addToCart", { name: accessory.name })}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7fdccb"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
