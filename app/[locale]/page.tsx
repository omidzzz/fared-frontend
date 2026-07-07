"use client";

import { useState } from "react";
import CTAButton from "@/components/ui/CTAButton";
import FeatureBadges from "@/components/home/FeatureBadges";
import { BestSellersSection } from "@/components/home/BestSellersSection";
import QuoteOfTheDay from "@/components/home/QuoteOfTheDay";
import { useQuery } from "@tanstack/react-query";
import { getStones, getCandles, getAccessories, getClothes } from "@/lib/api";
import type { CatalogProduct } from "@/lib/api";
import Image from "next/image";
import { QuickVariantModal } from "@/components/cart/QuickVariantModal";
import { useCart } from "@/lib/cart-context";
import { useTranslations } from "next-intl";

const SECTIONS = [
  {
    titleKey: "home.crystals",
    subtitleKey: "home.crystalsSubtitle",
    viewAllHref: "/shop/stones",
    viewAllLabelKey: "home.viewAll",
  },
  {
    titleKey: "home.candles",
    subtitleKey: "home.candlesSubtitle",
    viewAllHref: "/shop/candles",
    viewAllLabelKey: "home.viewAll",
  },
  {
    titleKey: "home.accessories",
    subtitleKey: "home.accessoriesSubtitle",
    viewAllHref: "/shop/accessories",
    viewAllLabelKey: "home.viewAll",
  },
  {
    titleKey: "home.clothes",
    subtitleKey: "home.clothesSubtitle",
    viewAllHref: "/shop/clothes",
    viewAllLabelKey: "home.viewAll",
  },
];

// ── Divider component using Tailwind classes ──
const Divider = () => (
  <div className="flex items-center gap-3 px-6 sm:px-10 lg:px-14 w-full">
    <div className="flex-1 h-px bg-gold/10" />
    <span className="text-gold/20 text-xs">✦</span>
    <div className="flex-1 h-px bg-gold/10" />
  </div>
);

export default function Home() {
  const t = useTranslations();
  const { addItem } = useCart();
  
  // Variant modal state
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null);
  
  // Fetch featured products for each category using the correct endpoints
  const { data: stonesData, isLoading: stonesLoading } = useQuery({
    queryKey: ["stones"],
    queryFn: () => getStones(),
    staleTime: 30000,
  });
  const { data: candlesData, isLoading: candlesLoading } = useQuery({
    queryKey: ["candles"],
    queryFn: () => getCandles(),
    staleTime: 30000,
  });
  const { data: accessoriesData, isLoading: accessoriesLoading } = useQuery({
    queryKey: ["accessories"],
    queryFn: () => getAccessories(),
    staleTime: 30000,
  });
  const { data: clothesData, isLoading: clothesLoading } = useQuery({
    queryKey: ["clothes"],
    queryFn: () => getClothes(),
    staleTime: 30000,
  });

  // Filter to only featured products, matching shop page logic
  // Show 8 products to enable carousel navigation (4 per slide on desktop = 2 slides)
  const stones = (stonesData || []).filter((p: CatalogProduct) => p.isFeatured).slice(0, 8);
  const candles = (candlesData || []).filter((p: CatalogProduct) => p.isFeatured).slice(0, 8);
  const accessories = (accessoriesData || []).filter((p: CatalogProduct) => p.isFeatured).slice(0, 8);
  const clothes = (clothesData || []).filter((p: CatalogProduct) => p.isFeatured).slice(0, 8);

  const loading = stonesLoading || candlesLoading || accessoriesLoading || clothesLoading;

  return (
    // ── Top‑level wrapper to prevent horizontal overflow ──
    <div className="w-full max-w-full overflow-x-hidden">
      {/* ── HERO SECTION ── */}
      <section
        className="pt-10 relative sm:pt-0 relative"
        style={{
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          overflow: "visible",
        }}
      >
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero-backgrounds/home-page-hero.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center 42%",
            }}
          />
        </div>

        {/* Gradient overlays */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(7,7,20,0.65) 0%, rgba(7,7,20,0.40) 45%, rgba(7,7,20,0.05) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 20% 50%, rgba(88,42,107,0.20) 0%, transparent 70%)",
          }}
        />

        {/* Hero text */}
        <div className="relative z-10 flex items-center flex-1 px-4 sm:px-8 lg:px-0">
          <section className="flex items-center w-full" dir="ltr">
            <div
              className="flex flex-col justify-center items-center lg:items-start lg:pr-16 xl:pr-24 w-full lg:w-1/2 lg:pl-8 text-center lg:text-right mt-20 sm:mt-24 lg:mt-0"
              dir="rtl"
            >
              <h1
                className="font-bold leading-snug mb-4 mt-4 lg:mt-0"
                style={{
                  fontSize: "clamp(2rem, 6vw, 5.5rem)",
                  background:
                    "linear-gradient(140deg, #FECB7D 0%, #f5dfa0 40%, #f0ebe3 65%, #FECB7D 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t("home.hero_title")}
              </h1>
              <div
                className="flex items-center justify-center lg:justify-start gap-2 mb-4 opacity-70"
                style={{ direction: "ltr" }}
              >
                <div
                  style={{
                    height: 1,
                    width: 60,
                    background:
                      "linear-gradient(to right, rgba(254,203,125,0.8), transparent)",
                  }}
                />
                <svg width={80} height={14} viewBox="0 0 80 14" fill="none">
                  <path
                    d="M0 7 Q10 0 20 7 Q30 14 40 7 Q50 0 60 7 Q70 14 80 7"
                    stroke="#FECB7D"
                    strokeWidth="0.8"
                    fill="none"
                    opacity="0.7"
                  />
                  <circle cx={40} cy={7} r={2.5} fill="#FECB7D" opacity="0.9" />
                  <circle cx={10} cy={6} r={1.2} fill="#FECB7D" opacity="0.5" />
                  <circle cx={70} cy={6} r={1.2} fill="#FECB7D" opacity="0.5" />
                </svg>
                <div
                  style={{
                    height: 1,
                    width: 60,
                    background:
                      "linear-gradient(to left, rgba(254,203,125,0.8), transparent)",
                  }}
                />
              </div>
              <p
                className="text-[--text-secondary] leading-relaxed mb-8 mx-auto lg:mx-0"
                style={{
                  fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
                  maxWidth: 420,
                }}
              >
                {t("home.hero_subtitle")}
              </p>
              <CTAButton href="/shop">{t("home.exploreNow")}</CTAButton>
            </div>
          </section>
        </div>

        {/* ── Feature badges – fixed ── */}
        <div
          className="relative z-10 px-0 sm:px-6 lg:px-10"
          style={{ marginTop: 80, marginBottom: -60 }}
        >
          <div className="relative z-10 mt-12 sm:mt-0">
            <FeatureBadges />
          </div>
        </div>
      </section>

      {/* ── REST OF PAGE ── */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #490070 0%, #5d0c99 16.7%, #7822ce 33.3%, #8f30f6 50%, #9d29fb 66.7%, #9b14db 83.3%, #8b02a6 100%)",
        }}
        className="relative z-1 pt-20 pb-10"
      >
        <QuoteOfTheDay />

        {SECTIONS.map((section, i) => {
          const categoryKey = section.viewAllHref.replace('/shop/', '');
          
          // Get the filtered featured products for this category
          const sectionProducts = 
            categoryKey === 'stones' ? stones :
            categoryKey === 'candles' ? candles :
            categoryKey === 'accessories' ? accessories :
            categoryKey === 'clothes' ? clothes : [];

          return (
            <div key={section.viewAllHref}>
              {i > 0 && <Divider />}
              <section className="py-6 sm:py-8">
                <div className="text-center mb-6 sm:mb-8 px-4" dir="rtl">
                  <div className="flex items-center justify-center gap-[14px] sm:gap-[18px] mb-3">
                    <span
                      style={{
                        color: "var(--gold-accent)",
                        fontSize: 16,
                        letterSpacing: 4,
                        filter: "drop-shadow(0 0 7px rgba(231,193,111,0.7))",
                      }}
                    >
                      ❖
                    </span>
                    <h2
                      style={{
                        fontSize: "clamp(1.25rem, 4vw, 2.063rem)",
                        fontWeight: 700,
                        color: "var(--gold-accent)",
                        textShadow: "0 0 16px rgba(231,193,111,0.3)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t(section.titleKey)}
                    </h2>
                    <span
                      style={{
                        color: "var(--gold-accent)",
                        fontSize: 16,
                        letterSpacing: 4,
                        filter: "drop-shadow(0 0 7px rgba(231,193,111,0.7))",
                      }}
                    >
                      ❖
                    </span>
                  </div>
                  <p
                    style={{
                      fontWeight: 300,
                      color: "rgba(255,248,238,0.82)",
                      marginTop: 13,
                      fontSize: "clamp(0.85rem, 2vw, 1.063rem)",
                    }}
                  >
                    {t(section.subtitleKey)}
                  </p>
                </div>

                {loading ? (
                  <div className="text-center py-12">
                    <p style={{ color: "rgba(255,248,238,0.6)" }}>در حال بارگذاری...</p>
                  </div>
                ) : sectionProducts.length > 0 ? (
                  <BestSellersSection
                    title={t(section.titleKey)}
                    subtitle={t(section.subtitleKey)}
                    products={sectionProducts}
                    viewAllHref={section.viewAllHref}
                    viewAllLabel={t(section.viewAllLabelKey)}
                    onAddToCart={(product) => {
                      // Only show modal for clothes with variants
                      const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;
                      const hasColors = Array.isArray(product.colorOptions) && product.colorOptions.length > 0;
                      if (categoryKey === 'clothes' && (hasVariants || hasColors)) {
                        setSelectedProduct(product);
                        setIsVariantModalOpen(true);
                      } else {
                        // For other categories or products without variants, add directly to cart
                        const productType = categoryKey === 'stones' ? 'stone' : categoryKey === 'candles' ? 'candle' : categoryKey === 'accessories' ? 'accessory' : 'clothes';
                        const cartItem = {
                          productId: String(product.id || product.productId || ""),
                          productType: productType as 'stone' | 'candle' | 'accessory' | 'clothes',
                          name: String(product.name || product.nameFA || ""),
                          nameFA: String(product.nameFA || product.name || ""),
                          price: Number(product.price) || 0,
                          currency: (product.currency === 'USD' ? 'USD' : 'IRT') as 'IRT' | 'USD',
                          quantity: 1,
                          image: String(product.image || ""),
                        };
                        addItem(cartItem);
                      }
                    }}
                  />
                ) : (
                  <div className="text-center py-12">
                    <p style={{ color: "rgba(255,248,238,0.6)" }}>هیچ محصولی یافت نشد</p>
                  </div>
                )}
              </section>
            </div>
          );
        })}

        <div className="flex justify-center px-4" style={{ marginTop: 42 }}>
          <CTAButton href="/shop" size="large">
            {t("home.viewAllProducts")}
          </CTAButton>
        </div>
      </div>
      
      {/* Variant Selection Modal */}
      {selectedProduct && (
        <QuickVariantModal
          isOpen={isVariantModalOpen}
          onClose={() => {
            setIsVariantModalOpen(false);
            setSelectedProduct(null);
          }}
          onConfirm={(variant, selectedColor, selectedSize) => {
            // Add to cart with selected variant
            const cartItem = {
              productId: String(selectedProduct.id || selectedProduct.productId || ""),
              productType: "clothes" as const,
              name: String(selectedProduct.name || selectedProduct.nameFA || ""),
              nameFA: String(selectedProduct.nameFA || selectedProduct.name || ""),
              price: Number(selectedProduct.price) || 0,
              currency: (selectedProduct.currency === 'USD' ? 'USD' : 'IRT') as 'IRT' | 'USD',
              quantity: 1,
              image: String(selectedProduct.image || ""),
              variant: variant,
            };
            addItem(cartItem);
            setIsVariantModalOpen(false);
            setSelectedProduct(null);
          }}
          product={{
            id: selectedProduct.id,
            name: selectedProduct.name || selectedProduct.nameFA || "",
            nameFA: selectedProduct.nameFA || selectedProduct.name || "",
            variants: Array.isArray(selectedProduct.variants) ? selectedProduct.variants.map((v: Record<string, unknown>) => ({
              label: (v.label || v.size || "") as string,
              size: (v.size || "") as string,
            })) : [],
            colorOptions: Array.isArray(selectedProduct.colorOptions) ? selectedProduct.colorOptions.map((c: Record<string, unknown>) => ({
              hex: (c.hex || "") as string,
              nameFA: (c.nameFA || "") as string,
              nameEN: (c.nameEN || "") as string,
            })) : [],
          }}
        />
      )}
    </div>
  );
}