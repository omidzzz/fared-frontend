"use client";

import { useTranslations } from "next-intl";
import ShopHero from "@/components/aura/ShopHero";
import {
  ClothingNotePanel,
  ClothingFeaturesPanel,
} from "@/components/aura/ShopSidePanels";
import { ResponsiveCarousel } from "@/components/ui/ResponsiveCarousel";
import ShopBenefits from "@/components/aura/ShopBenefits";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/lib/cart-context";
import { useLocale } from "@/hooks/useLocale";
import Link from "next/link";
import { Card } from "@/components/aura/ProductCards";
import ProductGrid from "@/components/shop/ProductGrid";
import { QuickVariantModal } from "@/components/cart/QuickVariantModal";
import { useEffect, useState } from "react";
import { getClothes } from "@/lib/api";

export default function ClothesPage() {
  const t = useTranslations("clothes");
  const { addItem } = useCart();
  const { isRTL } = useLocale();
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("ALL CLOTHES");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<any>(null);
  const gt = useTranslations();

  // Extract unique sizes and colors from products for sub-filters
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const [availableColors, setAvailableColors] = useState<string[]>([]);
  const [activeSizeFilter, setActiveSizeFilter] = useState<string>("ALL");
  const [activeColorFilter, setActiveColorFilter] = useState<string>("ALL");
  const [showSizeChips, setShowSizeChips] = useState(false);
  const [showColorChips, setShowColorChips] = useState(false);

  const SIZE_OPTIONS = ["ALL", "XS", "S", "M", "L", "XL", "XXL"];

  // Helper function to get color name (prefer Persian for RTL, English as fallback)
  const getColorName = (colorOption: any) => {
    if (isRTL) {
      return (
        colorOption.nameFA || colorOption.nameEN || colorOption.hex || "Color"
      );
    }
    return (
      colorOption.nameEN || colorOption.nameFA || colorOption.hex || "Color"
    );
  };

  const FILTER_KEYS = [
    "clothes.filters.all",
    "clothes.filters.size",
    "clothes.filters.color",
  ];

  const FILTER_MAP: Record<string, string> = {
    "clothes.filters.all": "ALL CLOTHES",
    "clothes.filters.size": "SIZE",
    "clothes.filters.color": "COLOR",
  };

  const FILTER_REVERSE_MAP: Record<string, string> = {
    "ALL CLOTHES": "clothes.filters.all",
    SIZE: "clothes.filters.size",
    COLOR: "clothes.filters.color",
  };

  // Extract available sizes and colors from products
  useEffect(() => {
    if (allProducts.length > 0) {
      const sizes = new Set<string>();
      const colors = new Set<string>();

      allProducts.forEach((product: any) => {
        // Extract sizes from variants
        (product.variants || []).forEach((v: any) => {
          if (v.label) sizes.add(v.label.toUpperCase());
        });
        // Extract colors from colorOptions using nameFA or nameEN
        (product.colorOptions || []).forEach((c: any) => {
          const colorName = getColorName(c);
          if (colorName) colors.add(colorName);
        });
      });

      setAvailableSizes(Array.from(sizes).sort());
      setAvailableColors(Array.from(colors).sort());
    }
  }, [allProducts, isRTL]);

  const clothesFilter = (activeFilter: string) => (product: any) => {
    // First apply size/color sub-filters
    if (activeSizeFilter !== "ALL") {
      const hasSize = (product.variants || []).some(
        (v: any) => v.label?.toUpperCase() === activeSizeFilter,
      );
      if (!hasSize) return false;
    }

    if (activeColorFilter !== "ALL") {
      const hasColor = (product.colorOptions || []).some((c: any) => {
        const colorName = getColorName(c);
        return colorName === activeColorFilter;
      });
      if (!hasColor) return false;
    }

    // Then apply main filter
    if (activeFilter === "ALL CLOTHES") return true;
    if (activeFilter === "SIZE") {
      const variants = product.variants || [];
      if (variants.length > 0) return true;
      const tags = (product.tagsEN || []).map((t: string) => t.toUpperCase());
      return tags.some((t: string) => SIZE_OPTIONS.includes(t));
    }
    if (activeFilter === "COLOR") {
      const colorOptions = product.colorOptions || [];
      if (colorOptions.length > 0) return true;
      return false;
    }
    return true;
  };

  // Fetch all clothes products using the correct /api/clothes endpoint
  const { data: clothesData, isLoading: clothesLoading } = useQuery({
    queryKey: ["clothes"],
    queryFn: () => getClothes(),
    staleTime: 30000,
  });

  useEffect(() => {
    if (clothesData) {
      const products = clothesData;
      setAllProducts(products);

      // Filter featured products
      const featured = products.filter(
        (product: any) => product.isFeatured === true,
      );
      setFeaturedProducts(featured);
      setIsLoading(false);
    }
  }, [clothesData]);

  const handleAddToCart = (productId: string) => {
    const product = allProducts.find((p: any) => p.id === productId);
    if (product) {
      // Show modal to select variants
      setModalProduct(product);
    }
  };

  const handleVariantConfirm = (variant?: string, selectedColor?: string, selectedSize?: string) => {
    if (modalProduct) {
      addItem({
        productId: modalProduct.id,
        productType: "clothes",
        name: modalProduct.nameEN || modalProduct.nameFA || modalProduct.name,
        nameFA: modalProduct.nameFA,
        price: modalProduct.price,
        currency: "IRT",
        quantity: 1,
        image: modalProduct.images?.[0]?.url || modalProduct.image || "",
        variant,
        selectedColor,
        selectedSize,
      });
      setModalProduct(null);
    }
  };

  // Render function for carousel
  const renderProduct = (product: any, index: number) => {
    return (
      <div key={product.id} className="flex justify-center">
        <Card p={product} onAddToCart={() => handleAddToCart(product.id)} />
      </div>
    );
  };

  // Render function for ProductGrid
  const renderClothesCard = (
    product: any,
    onAddToCart: (id: string) => void,
  ) => {
    return (
      <div key={product.id} className="block">
        <Card
          p={product}
          onAddToCart={() => handleAddToCart(product.id)}
        />
      </div>
    );
  };

  return (
    <>
      {/* Fixed Background - same as before */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              'url("/images/hero-backgrounds/clothes-hero-bg.webp")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(11,5,24,.65) 0%, rgba(11,5,24,.35) 35%, rgba(11,5,24,.85) 100%), linear-gradient(90deg, rgba(11,5,24,.45) 0%, transparent 20%, transparent 80%, rgba(11,5,24,.45) 100%)",
          }}
        />
      </div>

      {/* Hero - same as before */}
      <div style={{ position: "relative", zIndex: 1, paddingTop: "96px" }}>
        <ShopHero
          namespace="clothes"
          titleKey="title"
          subtitleKey="subtitle"
          ctaKey="explore"
          fullWidth={true}
        />
      </div>

      {/* Mobile + Tablet Content */}
      <div
        className="lg:hidden"
        dir="ltr"
        style={{
          position: "relative",
          zIndex: 1,
          padding: "0px 16px",
          width: "100%",
          maxWidth: "100vw",
          overflowX: "hidden",
          overflowY: "visible",
        }}
      >
        {/* Featured Products Carousel */}
        <div className="mb-12">
          <h2
            className="text-center text-[#F5D79C] font-serif text-2xl md:text-3xl mb-6"
            style={{
              fontFamily: "var(--avad-serif)",
              textShadow: "0 2px 20px rgba(212,175,100,0.15)",
              letterSpacing: "0.05em",
            }}
          >
            {t("featuredTitle")}
          </h2>

          {isLoading ? (
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
          ) : featuredProducts.length === 0 ? (
            <div className="w-full text-center text-white/60 py-8">
              {t("noFeatured")}
            </div>
          ) : (
            <ResponsiveCarousel
              items={featuredProducts}
              renderItem={renderProduct}
              tabletItemsPerSlide={2}
              desktopItemsPerSlide={4}
              autoplayMs={3500}
              className="w-full max-w-2xl mx-auto"
            />
          )}
        </div>

        {/* Filter Buttons */}
        <div
          className="flex items-center gap-2 mb-4 justify-center"
          style={{ maxWidth: "600px", margin: "0 auto" }}
        >
          <button
            onClick={() => setShowSizeChips(!showSizeChips)}
            style={{
              padding: "6px 16px",
              borderRadius: "20px",
              fontSize: "0.8rem",
              border: `1px solid ${
                activeSizeFilter !== "ALL"
                  ? "rgba(212,175,100,0.8)"
                  : "rgba(255,255,255,0.2)"
              }`,
              background:
                activeSizeFilter !== "ALL"
                  ? "rgba(212,175,100,0.2)"
                  : "rgba(255,255,255,0.06)",
              color:
                activeSizeFilter !== "ALL" ? "#fff" : "rgba(255,255,255,0.8)",
              cursor: "pointer",
            }}
          >
            {isRTL ? "سایز" : "Size"}
          </button>
          <button
            onClick={() => setShowColorChips(!showColorChips)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              borderRadius: "20px",
              fontSize: "0.8rem",
              border: `1px solid ${
                activeColorFilter !== "ALL"
                  ? "rgba(212,175,100,0.8)"
                  : "rgba(255,255,255,0.2)"
              }`,
              background:
                activeColorFilter !== "ALL"
                  ? "rgba(212,175,100,0.2)"
                  : "rgba(255,255,255,0.06)",
              color:
                activeColorFilter !== "ALL" ? "#fff" : "rgba(255,255,255,0.8)",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                background: "#d4af64",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            />
            {isRTL ? "رنگ" : "Color"}
          </button>
        </div>

        {/* Size Chips */}
        {showSizeChips && (
          <div
            className="flex flex-col gap-2 mb-4"
            style={{ maxWidth: "600px", margin: "0 auto" }}
          >
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {SIZE_OPTIONS.map((size) => {
                const isActive = activeSizeFilter === size;
                const isAvailable =
                  size === "ALL" || availableSizes.includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => {
                      setActiveSizeFilter(size);
                      setShowSizeChips(false);
                    }}
                    disabled={!isAvailable}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "20px",
                      fontSize: "0.75rem",
                      border: `1px solid ${
                        isActive
                          ? "rgba(212,175,100,0.8)"
                          : "rgba(255,255,255,0.2)"
                      }`,
                      background: isActive
                        ? "rgba(212,175,100,0.3)"
                        : "rgba(255,255,255,0.08)",
                      color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
                      cursor: isAvailable ? "pointer" : "not-allowed",
                      opacity: isAvailable ? 1 : 0.4,
                    }}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Color Chips */}
        {showColorChips && (
          <div
            className="flex flex-col gap-2 mb-4"
            style={{ maxWidth: "600px", margin: "0 auto" }}
          >
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {["ALL", ...availableColors].map((color) => {
                const isActive = activeColorFilter === color;
                return (
                  <button
                    key={color}
                    onClick={() => {
                      setActiveColorFilter(color);
                      setShowColorChips(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "0.75rem",
                      border: `1px solid ${
                        isActive
                          ? "rgba(212,175,100,0.8)"
                          : "rgba(255,255,255,0.2)"
                      }`,
                      background: isActive
                        ? "rgba(212,175,100,0.3)"
                        : "rgba(255,255,255,0.08)",
                      color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
                      cursor: "pointer",
                    }}
                  >
                    {color === "ALL" ? (isRTL ? "همه" : "All") : color}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {(activeSizeFilter !== "ALL" || activeColorFilter !== "ALL") && (
          <div
            className="flex items-center gap-2 mb-4 justify-center"
            style={{ maxWidth: "600px", margin: "0 auto" }}
          >
            {activeSizeFilter !== "ALL" && (
              <div className="flex items-center gap-1 bg-[#d4af64]/20 text-white px-3 py-1 rounded-full">
                <span className="text-xs">
                  {isRTL ? "سایز" : "Size"}: {activeSizeFilter}
                </span>
                <button
                  onClick={() => setActiveSizeFilter("ALL")}
                  className="text-xs hover:text-white/80"
                  aria-label="Clear size filter"
                >
                  ×
                </button>
              </div>
            )}
            {activeColorFilter !== "ALL" && (
              <div className="flex items-center gap-1 bg-[#d4af64]/20 text-white px-3 py-1 rounded-full">
                <span className="text-xs">{activeColorFilter}</span>
                <button
                  onClick={() => setActiveColorFilter("ALL")}
                  className="text-xs hover:text-white/80"
                  aria-label="Clear color filter"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        )}

        {/* All Products Grid - Mobile/Tablet */}
        <div id="all-products-grid" className="mb-12">
          <h2
            className="text-center text-[#F5D79C] font-serif text-2xl md:text-3xl mb-6"
            style={{
              fontFamily: "var(--avad-serif)",
              textShadow: "0 2px 20px rgba(212,175,100,0.15)",
              letterSpacing: "0.05em",
            }}
          >
            {t("allProductsTitle")}
          </h2>

          <ProductGrid
            key={activeFilter}
            category="clothes"
            itemsPerPage={12}
            renderCard={renderClothesCard}
            cols={{ mobile: 2, tablet: 2, desktop: 4 }}
            gap="gap-4"
            className="max-w-2xl mx-auto"
            loadMore={true}
            loadMoreLabel={t("loadMore")}
            loadingLabel={t("loadingMore")}
            noMoreLabel={t("noMoreProducts")}
            emptyMessage={t("noProducts")}
            filter={clothesFilter(activeFilter)}
          />
        </div>

      {/* Side panels */}
      <div className="flex flex-wrap justify-center gap-4 w-full max-w-2xl mx-auto">
        <ClothingFeaturesPanel />
        <ClothingNotePanel />
      </div>
      <div style={{ width: "100%", marginTop: 12 }}>
        <ShopBenefits />
      </div>
      </div>

      {/* Variant Selection Modal */}
      {modalProduct && (
        <QuickVariantModal
          isOpen={!!modalProduct}
          onClose={() => setModalProduct(null)}
          onConfirm={handleVariantConfirm}
          product={modalProduct}
        />
      )}

      {/* Desktop Content */}
      <div
        className="hidden lg:block"
        dir="ltr"
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          padding: "40px clamp(40px, 5vw, 100px)",
        }}
      >
        {/* Desktop Featured Products Carousel */}
        <h2
          className="text-center text-[#F5D79C] font-serif text-3xl md:text-4xl mb-8"
          style={{
            fontFamily: "var(--avad-serif)",
            textShadow: "0 2px 20px rgba(212,175,100,0.15)",
            letterSpacing: "0.05em",
          }}
        >
          {t("featuredTitle")}
        </h2>

        {isLoading ? (
          <div className="flex flex-wrap justify-center gap-4">
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
        ) : featuredProducts.length === 0 ? (
          <div className="w-full text-center text-white/60 py-8">
            {t("noFeatured")}
          </div>
        ) : (
          <div className="mb-16 max-w-6xl mx-auto">
            <ResponsiveCarousel
              items={featuredProducts}
              renderItem={renderProduct}
              tabletItemsPerSlide={2}
              desktopItemsPerSlide={4}
              autoplayMs={3500}
              className="w-full"
            />
          </div>
        )}

        {/* Desktop All Products */}
        <h2
          className="text-center text-[#F5D79C] font-serif text-3xl md:text-4xl mb-8"
          style={{
            fontFamily: "var(--avad-serif)",
            textShadow: "0 2px 20px rgba(212,175,100,0.15)",
            letterSpacing: "0.05em",
          }}
        >
          {t("allProductsTitle")}
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: "clamp(20px,2vw,40px)",
            width: "100%",
            paddingBottom: "clamp(40px, 5vh, 80px)",
          }}
        >
          <ClothingFeaturesPanel />

          <div className="flex-1 max-w-4xl">
            {/* Desktop Filter Buttons */}
            <div
              className="flex items-center gap-2 mb-4 justify-center"
              style={{ maxWidth: "600px", margin: "0 auto" }}
            >
              <button
                onClick={() => setShowSizeChips(!showSizeChips)}
                style={{
                  padding: "6px 16px",
                  borderRadius: "20px",
                  fontSize: "0.8rem",
                  border: `1px solid ${
                    activeSizeFilter !== "ALL"
                      ? "rgba(212,175,100,0.8)"
                      : "rgba(255,255,255,0.2)"
                  }`,
                  background:
                    activeSizeFilter !== "ALL"
                      ? "rgba(212,175,100,0.2)"
                      : "rgba(255,255,255,0.06)",
                  color:
                    activeSizeFilter !== "ALL"
                      ? "#fff"
                      : "rgba(255,255,255,0.8)",
                  cursor: "pointer",
                }}
              >
                {isRTL ? "سایز" : "Size"}
              </button>
              <button
                onClick={() => setShowColorChips(!showColorChips)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "0.8rem",
                  border: `1px solid ${
                    activeColorFilter !== "ALL"
                      ? "rgba(212,175,100,0.8)"
                      : "rgba(255,255,255,0.2)"
                  }`,
                  background:
                    activeColorFilter !== "ALL"
                      ? "rgba(212,175,100,0.2)"
                      : "rgba(255,255,255,0.06)",
                  color:
                    activeColorFilter !== "ALL"
                      ? "#fff"
                      : "rgba(255,255,255,0.8)",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    background: "#d4af64",
                    border: "1px solid rgba(255,255,255,0.3)",
                  }}
                />
                {isRTL ? "رنگ" : "Color"}
              </button>
            </div>

            {/* Desktop Size Chips */}
            {showSizeChips && (
              <div
                className="flex flex-col gap-2 mb-4"
                style={{ maxWidth: "600px", margin: "0 auto" }}
              >
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  {SIZE_OPTIONS.map((size) => {
                    const isActive = activeSizeFilter === size;
                    const isAvailable =
                      size === "ALL" || availableSizes.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => {
                          setActiveSizeFilter(size);
                          setShowSizeChips(false);
                        }}
                        disabled={!isAvailable}
                        style={{
                          padding: "6px 14px",
                          borderRadius: "20px",
                          fontSize: "0.75rem",
                          border: `1px solid ${
                            isActive
                              ? "rgba(212,175,100,0.8)"
                              : "rgba(255,255,255,0.2)"
                          }`,
                          background: isActive
                            ? "rgba(212,175,100,0.3)"
                            : "rgba(255,255,255,0.08)",
                          color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
                          cursor: isAvailable ? "pointer" : "not-allowed",
                          opacity: isAvailable ? 1 : 0.4,
                        }}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Desktop Color Chips */}
            {showColorChips && (
              <div
                className="flex flex-col gap-2 mb-4"
                style={{ maxWidth: "600px", margin: "0 auto" }}
              >
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  {["ALL", ...availableColors].map((color) => {
                    const isActive = activeColorFilter === color;
                    return (
                      <button
                        key={color}
                        onClick={() => {
                          setActiveColorFilter(color);
                          setShowColorChips(false);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontSize: "0.75rem",
                          border: `1px solid ${
                            isActive
                              ? "rgba(212,175,100,0.8)"
                              : "rgba(255,255,255,0.2)"
                          }`,
                          background: isActive
                            ? "rgba(212,175,100,0.3)"
                            : "rgba(255,255,255,0.08)",
                          color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
                          cursor: "pointer",
                        }}
                      >
                        {color === "ALL" ? (isRTL ? "همه" : "All") : color}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Desktop Active Filters Display */}
            {(activeSizeFilter !== "ALL" || activeColorFilter !== "ALL") && (
              <div
                className="flex items-center gap-2 mb-4 justify-center"
                style={{ maxWidth: "600px", margin: "0 auto" }}
              >
                {activeSizeFilter !== "ALL" && (
                  <div className="flex items-center gap-1 bg-[#d4af64]/20 text-white px-3 py-1 rounded-full">
                    <span className="text-xs">
                      {isRTL ? "سایز" : "Size"}: {activeSizeFilter}
                    </span>
                    <button
                      onClick={() => setActiveSizeFilter("ALL")}
                      className="text-xs hover:text-white/80"
                      aria-label="Clear size filter"
                    >
                      ×
                    </button>
                  </div>
                )}
                {activeColorFilter !== "ALL" && (
                  <div className="flex items-center gap-1 bg-[#d4af64]/20 text-white px-3 py-1 rounded-full">
                    <span className="text-xs">{activeColorFilter}</span>
                    <button
                      onClick={() => setActiveColorFilter("ALL")}
                      className="text-xs hover:text-white/80"
                      aria-label="Clear color filter"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            )}

            <ProductGrid
              key={activeFilter}
              category="clothes"
              itemsPerPage={12}
              renderCard={renderClothesCard}
              cols={{ mobile: 2, tablet: 3, desktop: 4 }}
              gap="gap-6"
              loadMore={true}
              loadMoreLabel={t("loadMore")}
              loadingLabel={t("loadingMore")}
              noMoreLabel={t("noMoreProducts")}
              emptyMessage={t("noProducts")}
              filter={clothesFilter(activeFilter)}
            />
          </div>

          <ClothingNotePanel />
        </div>
        <ShopBenefits />
      </div>
    </>
  );
}