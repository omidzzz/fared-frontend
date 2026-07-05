"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CTAButton from "@/components/ui/CTAButton";
import { useCart } from "@/lib/cart-context";
import { useTranslations } from "next-intl";
import { useLocale } from "@/hooks/useLocale";
import { useProducts } from "@/hooks/useProducts";

const CARD_PATH =
  "M418,355c7-26,14-85,12-125s-19-87-24-98,0-10-19-39-66-37-66-37c0,0-1-2-4.4-4-3.4-2-23.6-18-50.6-23S221,1,217,0s-20,20-58,30-44,22-44,22c0,0-1,2-4,3s-25,6.4-50,24c-25,17.6-34,43-33,107s-6,78-14,119S0,366,0,416s10,61,22,106,0,66,11,110,51,61,113,81,64,40,68,40,27-25,70-37,89-36,110-65,8-116,9-150,8-120,15-146Z";

type Product = {
  id: string;
  name: string;
  nameFA: string;
  price: number;
  image: string;
  category?: string;
};

export function Card({ p, onAddToCart }: { p: any; onAddToCart: () => void }) {
  const t = useTranslations("clothes");
  const { isRTL } = useLocale();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  
  // Show product colors from database colorOptions (now included in list response)
  // When colorOptions are present, show the actual colors from the database
  // Otherwise, show a single gold dot as a generic indicator for clothes products
  console.log("🎨 Card product data:", { 
    id: p.id, 
    name: p.name, 
    colorOptions: p.colorOptions, 
    variants: p.variants,
    type: p.type,
    category: p.category
  });
  // Check if colorOptions exists and has items - use actual database colors
  // The data structure from the API: { id, hex, nameFA } for each colorOption
  const hasColorOptions = p.colorOptions && Array.isArray(p.colorOptions) && p.colorOptions.length > 0;
  const hasVariants = p.variants && Array.isArray(p.variants) && p.variants.length > 0;
  const isClothes = p.type === "clothes" || p.category === "clothes";
  
  // Extract colors from colorOptions, or use fallback
  const productColors = hasColorOptions
    ? p.colorOptions.map((c: any) => {
        // Handle different possible data structures
        if (typeof c === 'string') return c;
        if (c.hex) return c.hex;
        if (c.value) return c.value;
        return "#d4af64";
      })
    : hasVariants
    ? ["#d4af64"]
    : isClothes
    ? ["#d4af64"]
    : [];
  const showColors = productColors.length > 0;
  
  // Handle color selection
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };
  const maskSvg = `%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 430.3 753' preserveAspectRatio='none'%3E%3Cpath d='${encodeURIComponent(
    CARD_PATH,
  )}' fill='black'/%3E%3C/svg%3E`;

  const borderSvg = `%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 430.3 753' preserveAspectRatio='none'%3E%3Cdefs%3E%3ClinearGradient id='grd' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23f3dca0' stop-opacity='0.95'/%3E%3Cstop offset='0.3' stop-color='%23d4af64' stop-opacity='0.8'/%3E%3Cstop offset='0.7' stop-color='%23d4af64' stop-opacity='0.7'/%3E%3Cstop offset='1' stop-color='%23b88f44' stop-opacity='0.95'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='${encodeURIComponent(
    CARD_PATH,
  )}' fill='none' stroke='url(%23grd)' stroke-width='2.5'/%3E%3C/svg%3E`;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  return (
    <div
      className="relative cursor-default group"
      style={{
        width: "clamp(130px, 42vw, 260px)",
        height: "clamp(240px, 75vw, 460px)",
        flex: "0 0 auto",
        transition:
          "transform 0.3s ease, filter 0.4s ease, box-shadow 0.4s ease",
        filter:
          "drop-shadow(0 12px 40px rgba(0,0,0,0.5)) drop-shadow(0 4px 12px rgba(0,0,0,0.3))",
        overflow: "visible",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform =
          "translateY(-6px) scale(1.02)";
        (e.currentTarget as HTMLElement).style.filter =
          "drop-shadow(0 24px 60px rgba(0,0,0,0.6)) drop-shadow(0 8px 24px rgba(216,179,106,0.15)) drop-shadow(0 0 40px rgba(216,179,106,0.05))";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform =
          "translateY(0) scale(1)";
        (e.currentTarget as HTMLElement).style.filter =
          "drop-shadow(0 12px 40px rgba(0,0,0,0.5)) drop-shadow(0 4px 12px rgba(0,0,0,0.3))";
      }}
    >
      <div
        className="absolute -inset-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl"
        style={{
          background: "radial-gradient(60% 55% at 50% 45%, rgba(168,110,224,0.4), rgba(124,72,176,0.08) 55%, transparent 68%)",
          pointerEvents: "none",
          transform: "scale(1.1)",
        }}
      />

      <div className="relative w-full h-full overflow-visible">
        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage: `url("data:image/svg+xml,${maskSvg}")`,
            maskImage: `url("data:image/svg+xml,${maskSvg}")`,
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a0d30] via-[#2a1545] to-[#0d0620]" />

          <div
            className="absolute left-0 right-0 top-0 overflow-hidden"
            style={{ height: "52%" }}
          >
            <Image
              src={p.image || "/images/placeholder.webp"}
              alt={p.name}
              fill
              sizes="(max-width: 1400px) 13vw, 240px"
              unoptimized
              className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).style.opacity = "0.3";
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(60% 55% at 50% 45%, rgba(168,110,224,0.4), rgba(124,72,176,0.08) 55%, transparent 68%)",
                mixBlendMode: "screen",
                opacity: 0.75,
              }}
            />
            <div
              className="absolute inset-x-0 bottom-0 pointer-events-none"
              style={{
                height: "30%",
                background:
                  "linear-gradient(to top, rgba(26,13,48,0.95) 0%, transparent 100%)",
              }}
            />
          </div>

          <div
            className="absolute"
            style={{
              left: "8%",
              right: "8%",
              top: "calc(52% - 1px)",
              height: "2px",
              zIndex: 3,
              background:
                "linear-gradient(90deg, transparent, #d4af64, #f3dca0, #d4af64, transparent)",
              opacity: 0.8,
              boxShadow: "0 0 8px rgba(212,175,100,0.2)",
            }}
          />

          <div
            className="absolute"
            style={{
              left: "50%",
              top: "52%",
              transform: "translate(-50%, -50%)",
              zIndex: 4,
            }}
          >
            <div className="w-10 h-10 rounded-full bg-[#d4af64]/20 border-2 border-[#d4af64]/50 flex items-center justify-center backdrop-blur-sm shadow-lg shadow-[#d4af64]/20">
              <div className="w-5 h-5 rounded-full bg-[#d4af64]/70 shadow-inner shadow-[#f3dca0]/30" />
            </div>
          </div>

          <div
            className="absolute left-0 right-0 bottom-0 flex flex-col items-center"
            style={{
              height: "48%",
              background:
                "linear-gradient(180deg, rgba(26,13,48,0.95) 0%, #1a0d30 100%)",
              padding: "18px 12px clamp(30px, 5%, 50px) 12px",
              justifyContent: "flex-start",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--avad-serif)",
                fontWeight: 500,
                fontSize: "clamp(8px, 1.8vw, 12px)",
                lineHeight: 1.2,
                letterSpacing: "0.12em",
                color: "#ffffff",
                textTransform: "uppercase",
                minHeight: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                maxWidth: "95%",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              {isRTL ? p.nameFA : p.name}
            </h3>
            <div
              style={{
                fontFamily: "var(--avad-serif)",
                fontWeight: 600,
                fontSize: "clamp(12px, 2vw, 17px)",
                color: "#d4af64",
                marginTop: 1,
                letterSpacing: "0.03em",
                textShadow: "0 2px 8px rgba(212,175,100,0.2)",
                direction: isRTL ? "rtl" : "ltr",
              }}
            >
              {formatPrice(p.price)}
            </div>
            {showColors && (
              <div className="flex" style={{ gap: 4, marginTop: 6 }}>
                {productColors.slice(0, 4).map((color: string, i: number) => {
                  const isSelected = selectedColor === color;
                  return (
                    <span
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleColorSelect(color);
                      }}
                      style={{
                        width: "clamp(10px, 2.5vw, 13px)",
                        height: "clamp(10px, 2.5vw, 13px)",
                        borderRadius: "50%",
                        display: "block",
                        background: color,
                        boxShadow: isSelected
                          ? "0 0 0 2px #fff, 0 0 0 4px rgba(212,175,100,0.8), 0 2px 8px rgba(0,0,0,0.3)"
                          : "0 0 0 1.5px rgba(212,175,100,0.4), 0 2px 8px rgba(0,0,0,0.3), inset 0 0 4px rgba(0,0,0,0.1)",
                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                        cursor: "pointer",
                        transform: isSelected ? "scale(1.15)" : "scale(1)",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          (e.currentTarget as HTMLElement).style.transform =
                            "scale(1.2)";
                          (e.currentTarget as HTMLElement).style.boxShadow =
                            "0 0 0 2px rgba(212,175,100,0.6), 0 4px 12px rgba(0,0,0,0.4)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          (e.currentTarget as HTMLElement).style.transform =
                            "scale(1)";
                          (e.currentTarget as HTMLElement).style.boxShadow =
                            "0 0 0 1.5px rgba(212,175,100,0.4), 0 2px 8px rgba(0,0,0,0.3)";
                        }
                      }}
                    />
                  );
                })}
              </div>
            )}
            <div
              style={{ marginTop: 6, width: "90%", maxWidth: "140px" }}
              onClick={(e) => e.stopPropagation()}
            >
              <CTAButton
                size="small"
                className="w-full text-[8px] tracking-[0.12em] lg:text-[10px]"
                onClick={() => {
                  onAddToCart();
                }}
              >
                {t("addToCart")}
              </CTAButton>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 5,
            backgroundImage: `url("data:image/svg+xml,${borderSvg}")`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            filter:
              "drop-shadow(0 0 8px rgba(212,175,100,0.4)) drop-shadow(0 0 24px rgba(212,175,100,0.15))",
            overflow: "visible",
          }}
        />
      </div>
    </div>
  );
}

export default function ProductCards() {
  const { addItem } = useCart();
  const { data, isLoading } = useProducts({ category: 'clothes', limit: 4 });

  const handleAddToCart = (p: Product) => {
    const numericPrice = p.price;
    addItem({
      productId: p.id,
      productType: "clothes",
      name: p.name,
      nameFA: p.nameFA,
      price: numericPrice,
      currency: "IRT",
      quantity: 1,
      image: p.image,
    });
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto pl-4 mb-4 sm:px-4 overflow-hidden lg:overflow-visible">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 w-full">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="animate-pulse"
              style={{
                width: "calc(50% - 4px)",
                maxWidth: "calc(50% - 4px)",
                height: "clamp(240px, 75vw, 460px)",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "8px",
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (!data?.products?.length) {
    return (
      <div className="w-full max-w-7xl mx-auto pl-4 mb-4 sm:px-4">
        <p style={{ color: "#fff", textAlign: "center" }}>No products found</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto pl-4 mb-4 sm:px-4 overflow-hidden lg:overflow-visible">
      {/* FLEXBOX: 2 columns on mobile, 4 columns on desktop */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 w-full">
        {data.products.map((p) => (
          <Link
            key={p.id}
            href={`/shop/clothes/${p.slug || p.id}`}
            className="flex-shrink-0 overflow-visible transition-opacity hover:opacity-90"
            style={{
              width: "calc(50% - 4px)",
              maxWidth: "calc(50% - 4px)",
            }}
          >
            <div className="lg:w-auto lg:max-w-none">
              <Card p={p} onAddToCart={() => handleAddToCart(p)} />
            </div>
          </Link>
        ))}
      </div>

      {/* Responsive styles for desktop */}
      <style>{`
        @media (min-width: 1024px) {
          .flex-wrap > a {
            width: calc(25% - 12px) !important;
            max-width: calc(25% - 12px) !important;
          }
        }
      `}</style>
    </div>
  );
}