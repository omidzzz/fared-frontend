"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ShopHero from "@/components/aura/ShopHero";
import { ResponsiveCarousel } from "@/components/ui/ResponsiveCarousel";
import { useCart } from "@/hooks/useCart";
import { useTranslations } from "next-intl";
import { useLocale } from "@/hooks/useLocale";
import { useQuery } from "@tanstack/react-query";
import { getCandles } from "@/lib/api";
import ProductGrid from "@/components/shop/ProductGrid";
import CandleCard from "@/components/ui/CandleCard";

export default function CandlesPage() {
  const { totalItems, addItem } = useCart();
  const t = useTranslations();
  const { isRTL } = useLocale();
  const [activeFilter, setActiveFilter] = useState("ALL CANDLES");
  const [sheetOpen, setSheetOpen] = useState(false);
  
  const FILTER_KEYS = [
    "candles.filters.all",
    "candles.filters.scent",
    "candles.filters.intention",
  ];
  
  const FILTER_MAP: Record<string, string> = {
    "candles.filters.all": "ALL CANDLES",
    "candles.filters.scent": "SCENT",
    "candles.filters.intention": "INTENTION",
  };
  
  const FILTER_REVERSE_MAP: Record<string, string> = {
    "ALL CANDLES": "candles.filters.all",
    "SCENT": "candles.filters.scent",
    "INTENTION": "candles.filters.intention",
  };
  
  const candleFilter = (activeFilter: string) => (product: any) => {
    if (activeFilter === "ALL CANDLES") return true;
    const tags = (product.tagsEN || []).map((t: string) => t.toUpperCase());
    if (activeFilter === "SCENT") return tags.some((t: string) => t.includes("SCENT") || t.includes("VANILLA") || t.includes("LAVENDER") || t.includes("ROSE") || t.includes("FRAGRANCE"));
    if (activeFilter === "INTENTION") return tags.some((t: string) => t.includes("INTENTION") || t.includes("LOVE") || t.includes("PROTECTION") || t.includes("HEALING") || t.includes("ABUNDANCE"));
    return true;
  };

  // Fetch all candles products using the correct /api/candles endpoint
  const { data: candlesData, isLoading: featuredLoading } = useQuery({
    queryKey: ["candles"],
    queryFn: () => getCandles(),
    staleTime: 30000,
  });

  const allProducts = candlesData || [];
  const featuredProducts = allProducts.filter(
    (product: any) => product.isFeatured === true,
  );

  // Map API product to CandleCard-compatible format
  const mapToCandle = (product: any) => ({
    id: product.id,
    slug: product.slug || product.id,
    name: product.nameEN || product.name || "Candle",
    nameFA: product.nameFA || product.name || "شمع",
    scent: (product.tagsFA?.[0] || product.tagsEN?.[0] || ""),
    scentFA: (product.tagsFA?.[0] || ""),
    burnTime: "",
    burnTimeFA: "",
    waxType: "",
    waxTypeFA: "",
    ingredientsFA: [],
    chakraAlignmentFA: "",
    price: product.price || 0,
    image: product.images?.[0]?.url || product.image || "",
    accentColor: "var(--chakra-solar)",
    crystalKeywords: [],
  });

  // Render function for carousel using CandleCard
  const renderProduct = (product: any, index: number) => {
    const candle = mapToCandle(product);
    return (
      <Link
        key={product.id}
        href={`/shop/candles/${product.slug || product.id}`}
        className="flex justify-center transition-opacity hover:opacity-90"
      >
        <CandleCard candle={candle} />
      </Link>
    );
  };

  // Render function for ProductGrid using CandleCard
  const renderCandleCard = (
    product: any,
    onAddToCart: (id: string) => void,
  ) => {
    const candle = mapToCandle(product);
    return (
      <Link
        key={product.id}
        href={`/shop/candles/${product.slug || product.id}`}
        className="block transition-opacity hover:opacity-90"
      >
        <CandleCard candle={candle} />
      </Link>
    );
  };

  return (
    <main className="min-h-screen" dir={isRTL ? "rtl" : "ltr"} style={{ background: "#1a0d3d" }}>
      {/* Fixed Background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <Image
          src="/images/hero-backgrounds/candles-hero.webp"
          alt=""
          fill
          sizes="100vw"
          unoptimized
          priority
          className="object-cover object-center"
          style={{ filter: "blur(3px)" }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(26,13,61,0.5) 0%, transparent 30%, transparent 65%, rgba(26,13,61,0.8) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, paddingTop: "96px" }}>
        <ShopHero
          namespace="candles"
          titleKey="title"
          subtitleKey="subtitle"
          ctaKey="explore"
          fullWidth={true}
        />

        <div
          style={{
            padding: "40px clamp(20px, 5vw, 80px)",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          {/* Featured Products Carousel */}
          {featuredProducts.length > 0 && (
            <div className="mb-12">
              <h2
                className="text-center text-[#F5D79C] font-serif text-2xl md:text-3xl mb-6"
                style={{
                  fontFamily: "var(--avad-serif)",
                  textShadow: "0 2px 20px rgba(212,175,100,0.15)",
                  letterSpacing: "0.05em",
                }}
              >
                {t("candles.featuredTitle") || "✨ Featured Collection"}
              </h2>

              {featuredLoading ? (
                <div className="flex flex-wrap justify-center gap-4 w-full max-w-2xl mx-auto">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="animate-pulse"
                      style={{
                        width: "clamp(130px, 42vw, 260px)",
                        height: "clamp(240px, 75vw, 460px)",
                        background: "rgba(255,255,255,0.05)",
                        borderRadius: "8px",
                      }}
                    />
                  ))}
                </div>
              ) : (
                <ResponsiveCarousel
                  items={featuredProducts}
                  renderItem={renderProduct}
                  tabletItemsPerSlide={2}
                  desktopItemsPerSlide={4}
                  autoplayMs={3500}
                  className="w-full max-w-6xl mx-auto"
                />
              )}
            </div>
          )}

          {/* Mobile Filter */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setSheetOpen(true)}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "12px 20px", borderRadius: "100px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(212,175,100,0.3)",
                color: "#fff", fontSize: "0.85rem",
                margin: "0 16px 16px", width: "calc(100% - 32px)",
                minHeight: 44, justifyContent: "center", cursor: "pointer",
              }}
            >
              ⚙ {t("candles.filterBy")} {activeFilter !== "ALL CANDLES" && ` · ${t(FILTER_REVERSE_MAP[activeFilter] || "candles.filters.all")}`}
            </button>
            {sheetOpen && (
              <>
                <div onClick={() => setSheetOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} />
                <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 201, background: "rgba(15, 8, 40, 0.97)", backdropFilter: "blur(20px)", borderRadius: "24px 24px 0 0", border: "1px solid rgba(212,175,100,0.2)", padding: "12px 20px 32px", maxHeight: "70vh", overflowY: "auto" }}>
                  <div style={{ width: "40px", height: "4px", borderRadius: "100px", background: "rgba(255,255,255,0.25)", margin: "0 auto 20px" }} />
                  <h3 style={{ color: "#fff", fontSize: "1.1rem", marginBottom: "16px", fontFamily: "'Playfair Display', serif" }}>{t("candles.filterBy")}</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {FILTER_KEYS.map((key) => {
                      const filterValue = FILTER_MAP[key];
                      const isActive = activeFilter === filterValue;
                      return (
                        <button key={key} onClick={() => { setActiveFilter(filterValue); setSheetOpen(false); }}
                          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderRadius: "14px", minHeight: "52px",
                            background: isActive ? "rgba(212,175,100,0.15)" : "rgba(255,255,255,0.04)",
                            border: isActive ? "1px solid rgba(212,175,100,0.5)" : "1px solid rgba(255,255,255,0.08)",
                            color: isActive ? "#fff" : "rgba(255,255,255,0.7)", fontSize: "0.95rem", cursor: "pointer" }}>
                          {t(key)}
                          {isActive && <span style={{ color: "#d4af64" }}>✓</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Desktop Filter Bar */}
          <div className="hidden lg:flex" style={{ background: "rgba(15,5,40,0.6)", borderRadius: 12, padding: "14px 24px", margin: "0 auto 32px", maxWidth: "600px", backdropFilter: "blur(8px)", alignItems: "center", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            {FILTER_KEYS.map((key) => {
              const filterValue = FILTER_MAP[key];
              const isActive = activeFilter === filterValue;
              return (
                <button key={key} role="tab" aria-selected={isActive} onClick={() => setActiveFilter(filterValue)}
                  style={{ border: `1px solid ${isActive ? "rgba(255,215,100,0.8)" : "rgba(255,215,100,0.35)"}`, borderRadius: 100, padding: "6px 20px", fontSize: "0.72rem", letterSpacing: "0.12em",
                    color: isActive ? "#fff" : "rgba(255,255,255,0.7)", background: isActive ? "rgba(255,215,100,0.15)" : "transparent", cursor: "pointer", transition: "all 0.2s ease", whiteSpace: "nowrap" }}>
                  {t(key)}
                </button>
              );
            })}
          </div>

          {/* All Products Grid */}
          <h2
            className="text-center text-[#F5D79C] font-serif text-2xl md:text-3xl mb-6"
            style={{
              fontFamily: "var(--avad-serif)",
              textShadow: "0 2px 20px rgba(212,175,100,0.15)",
              letterSpacing: "0.05em",
            }}
          >
            {t("candles.products") || "All Candles"}
          </h2>

          <ProductGrid
            key={activeFilter}
            category="candles"
            itemsPerPage={12}
            renderCard={renderCandleCard}
            cols={{ mobile: 2, tablet: 3, desktop: 4 }}
            gap="gap-4"
            loadMore={true}
            loadMoreLabel={t("clothes.loadMore") || "Load More"}
            loadingLabel={t("clothes.loadingMore") || "Loading..."}
            noMoreLabel={t("clothes.noMoreProducts") || "No more products to load"}
            emptyMessage={t("candles.noProducts") || "No candles found"}
            filter={candleFilter(activeFilter)}
          />
        </div>
      </div>

      {/* Floating cart button — mobile only */}
      <Link
        href="/cart"
        className="lg:hidden"
        style={{
          position: "fixed",
          bottom: "20px",
          right: isRTL ? "auto" : "20px",
          left: isRTL ? "20px" : "auto",
          zIndex: 150,
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #c8a24a, #e8c96a 50%, #c8a24a)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(200,162,74,0.5)",
          textDecoration: "none",
        }}
      >
        <span style={{ fontSize: "1.3rem" }}>🛍</span>
        {totalItems > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-4px",
              right: "-4px",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              background: "#f5a623",
              color: "#fff",
              fontSize: "0.7rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {totalItems > 9 ? "9+" : totalItems}
          </span>
        )}
      </Link>
    </main>
  );
}