"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import type { Candle } from "@/lib/mock-data";

interface CandleCardProps {
  candle: Candle;
}

export default function CandleCard({ candle }: CandleCardProps) {
  const { addItem } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: candle.id,
      productType: "candle",
      name: candle.name,
      nameFA: candle.nameFA,
      price: candle.price,
      currency: "USD" as const,
      quantity: 1,
      image: candle.image,
    });
  };

  return (
    <Link
      href={`/shop/candles/${candle.slug}`}
      style={{ textDecoration: "none", display: "block", width: "100%" }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: "16px",
          overflow: "hidden",
          cursor: "pointer",
          transition:
            "transform 0.3s ease, filter 0.4s ease, box-shadow 0.4s ease",
          background: "#2a0a4a",
          width: "100%",
          height: "clamp(280px, 50vw, 420px)",
          display: "flex",
          flexDirection: "column",
          // Enhanced border styling
          border: "2px solid transparent",
          backgroundImage:
            "linear-gradient(#2a0a4a, #2a0a4a), linear-gradient(180deg, rgba(212,175,100,0.8) 0%, rgba(212,175,100,0.4) 50%, rgba(212,175,100,0.8) 100%)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
          boxShadow:
            "0 0 8px rgba(212,175,100,0.3), 0 0 24px rgba(212,175,100,0.1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-6px) scale(1.02)";
          e.currentTarget.style.boxShadow =
            "0 8px 32px rgba(212,175,100,0.25), 0 0 12px rgba(212,175,100,0.15), 0 0 40px rgba(212,175,100,0.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0) scale(1)";
          e.currentTarget.style.boxShadow =
            "0 0 8px rgba(212,175,100,0.3), 0 0 24px rgba(212,175,100,0.1)";
        }}
      >
        {/* Image wrapper — clips image only */}
        <div
          style={{
            borderRadius: "16px",
            overflow: "hidden",
            position: "relative",
            flex: "1 1 60%",
          }}
        >
          <Image
            src={candle.image}
            alt={candle.name}
            fill
            sizes="(min-width: 1024px) 20vw, 50vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50%",
              background:
                "linear-gradient(to top, #2a0a4a 0%, transparent 100%)",
            }}
          />
        </div>

        {/* Info section — centered */}
        <div
          style={{
            padding: "4px 16px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
            background: "#2a0a4a",
            textAlign: "center",
            borderRadius: "0 0 16px 16px",
            overflow: "hidden",
          }}
        >
          <h3
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "#ffffff",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            {candle.name}
          </h3>

          <p
            style={{
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.6)",
              margin: 0,
              letterSpacing: "0.02em",
            }}
          >
            · {candle.scent?.split(",").join(" · ")} ·
          </p>

          <p
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "#d4af64",
              margin: "4px 0 0",
            }}
          >
            {candle.price.toFixed(2)} تومان
          </p>

          {/* Divider line */}
          <div
            style={{
              width: "calc(100% - 32px)",
              margin: "10px 0 0",
              borderTop: "1px solid rgba(212,175,100,0.25)",
            }}
          />
        </div>

        {/* [+] button — half outside bottom border */}
        <div style={{ position: "relative", height: "0" }}>
          <button
            onClick={handleAdd}
            style={{
              position: "absolute",
              bottom: "-16px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: "1px solid rgba(212, 175, 100, 0.6)",
              background: "rgba(10, 5, 30, 0.8)",
              backdropFilter: "blur(4px)",
              color: "rgba(212, 175, 100, 0.9)",
              fontSize: "18px",
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 10,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(212,175,100,0.2)";
              e.currentTarget.style.borderColor = "rgba(212,175,100,1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(10,5,30,0.8)";
              e.currentTarget.style.borderColor = "rgba(212,175,100,0.6)";
            }}
            aria-label={`Add ${candle.name} to cart`}
          >
            +
          </button>
        </div>
      </div>
    </Link>
  );
}
