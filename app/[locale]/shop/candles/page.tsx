"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import CTAButton from "@/components/ui/CTAButton";
import CandleCard from "@/components/ui/CandleCard";
import ShopHero from "@/components/aura/ShopHero";
import { ResponsiveCarousel } from "@/components/ui/ResponsiveCarousel";
import { useCart } from "@/hooks/useCart";
import { useTranslations } from "next-intl";
import { useLocale } from "@/hooks/useLocale";
import { useProducts } from "@/hooks/useProducts";
import { getCandles } from "@/lib/api";
import ProductGrid from "@/components/shop/ProductGrid";
import { Card } from "@/components/aura/ProductCards";

export default function CandlesPage() {
  const [candles, setCandles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { totalItems, addItem } = useCart();
  const t = useTranslations();
  const { isRTL } = useLocale();

  // Fetch all candles for the grid
  useEffect(() => {
    async function loadCandles() {
      try {
        const data = await getCandles();
        setCandles(data);
      } catch (error) {
        console.error('Failed to load candles:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadCandles();
  }, []);

  // Fetch featured products for carousel
  const { data: featuredData, isLoading: featuredLoading } = useProducts({
    category: "candles",
    limit: 10,
    offset: 0,
  });

  const allProducts = featuredData?.products || [];
  const featuredProducts = allProducts.filter(
    (product: any) => product.isFeatured === true,
  );

  const handleAddToCart = (productId: string) => {
    const product = allProducts.find((p: any) => p.id === productId);
    if (product) {
      addItem({
        productId: product.id,
        productType: "candle",
        name: product.nameEN || product.nameFA || product.name,
        nameFA: product.nameFA,
        price: product.price,
        currency: "IRT",
        quantity: 1,
        image: product.images?.[0]?.url || product.image || "",
      });
    }
  };

  // Render function for carousel
  const renderProduct = (product: any, index: number) => (
    <Link
      key={product.id}
      href={`/shop/candles/${product.slug || product.id}`}
      className="flex justify-center transition-opacity hover:opacity-90"
    >
      <Card p={product} onAddToCart={() => handleAddToCart(product.id)} />
    </Link>
  );

  // Render function for ProductGrid
  const renderCandleCard = (
    product: any,
    onAddToCart: (id: string) => void,
  ) => (
    <Link
      key={product.id}
      href={`/shop/candles/${product.slug || product.id}`}
      className="block transition-opacity hover:opacity-90"
    >
      <Card
        p={product}
        onAddToCart={() => {
          addItem({
            productId: product.id,
            productType: "candle",
            name: product.nameEN || product.nameFA || product.name,
            nameFA: product.nameFA,
            price: product.price,
            currency: "IRT",
            quantity: 1,
            image: product.images?.[0]?.url || product.image || "",
          });
        }}
      />
    </Link>
  );

  if (isLoading) {
    return (
      <main className="min-h-screen" style={{ background: "#1a0d3d" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
          <p style={{ color: "#fff" }}>Loading...</p>
        </div>
      </main>
    );
  }

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
          />

          {candles.length === 0 && (
            <p style={{ color: "#fff", textAlign: "center", padding: "40px" }}>
              No candles found
            </p>
          )}
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