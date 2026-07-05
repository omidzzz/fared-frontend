"use client";

import { useTranslations } from "next-intl";
import ShopHero from "@/components/aura/ShopHero";
import {
  ClothingNotePanel,
  ClothingFeaturesPanel,
} from "@/components/aura/ShopSidePanels";
import { ResponsiveCarousel } from "@/components/ui/ResponsiveCarousel";
import ShopBenefits from "@/components/aura/ShopBenefits";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import { Card } from "@/components/aura/ProductCards";
import ProductGrid from "@/components/shop/ProductGrid";
import { useEffect, useState } from "react";

export default function ClothesPage() {
  const t = useTranslations("clothes");
  const { addItem } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("ALL CLOTHES");
  const [sheetOpen, setSheetOpen] = useState(false);
  const gt = useTranslations();
  
  // Extract unique sizes and colors from products for sub-filters
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const [availableColors, setAvailableColors] = useState<string[]>([]);
  const [activeSizeFilter, setActiveSizeFilter] = useState<string>("ALL");
  const [activeColorFilter, setActiveColorFilter] = useState<string>("ALL");
  
  const SIZE_OPTIONS = ["ALL", "XS", "S", "M", "L", "XL", "XXL"];
  const COLOR_HEX_MAP: Record<string, string> = {
    "GOLD": "#FFD700",
    "DARK_GOLD": "#DAA520",
    "RED": "#DC143C",
    "BLUE": "#1E90FF",
    "GREEN": "#32CD32",
    "BLACK": "#2C2C2C",
    "WHITE": "#F8F8F8",
    "PURPLE": "#9370DB",
    "PINK": "#FF69B4",
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
    "SIZE": "clothes.filters.size",
    "COLOR": "clothes.filters.color",
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
        // Extract colors from colorOptions
        (product.colorOptions || []).forEach((c: any) => {
          if (c.hex) {
            // Find color name by hex or use the hex as key
            const colorName = Object.keys(COLOR_HEX_MAP).find(k => COLOR_HEX_MAP[k] === c.hex) || c.hex;
            colors.add(colorName);
          }
        });
      });
      
      setAvailableSizes(Array.from(sizes).sort());
      setAvailableColors(Array.from(colors).sort());
    }
  }, [allProducts]);
  
  const clothesFilter = (activeFilter: string) => (product: any) => {
    // First apply size/color sub-filters
    if (activeSizeFilter !== "ALL") {
      const hasSize = (product.variants || []).some((v: any) => 
        v.label?.toUpperCase() === activeSizeFilter
      );
      if (!hasSize) return false;
    }
    
    if (activeColorFilter !== "ALL") {
      const hasColor = (product.colorOptions || []).some((c: any) => 
        c.hex === COLOR_HEX_MAP[activeColorFilter] || 
        c.nameFA?.toUpperCase() === activeColorFilter
      );
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
      const tags = (product.tagsEN || []).map((t: string) => t.toUpperCase());
      return tags.some((t: string) => Object.keys(COLOR_HEX_MAP).some(k => t.includes(k)));
    }
    return true;
  };

  // Fetch all clothes products without limit to get all featured items
  const { data: productsData, isLoading: productsLoading } = useProducts({
    category: "clothes",
    limit: 100,
    offset: 0,
  });

  useEffect(() => {
    if (productsData?.products) {
      const products = productsData.products;
      setAllProducts(products);

      // Filter featured products
      const featured = products.filter(
        (product: any) => product.isFeatured === true,
      );
      setFeaturedProducts(featured);
      setIsLoading(false);
    }
  }, [productsData]);

  const handleAddToCart = (productId: string) => {
    const product = allProducts.find((p: any) => p.id === productId);
    if (product) {
      addItem({
        productId: product.id,
        productType: "clothes",
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
      href={`/shop/clothes/${product.slug || product.id}`}
      className="flex justify-center transition-opacity hover:opacity-90"
    >
      <Card p={product} onAddToCart={() => handleAddToCart(product.id)} />
    </Link>
  );

  // Render function for ProductGrid
  const renderClothesCard = (
    product: any,
    onAddToCart: (id: string) => void,
  ) => (
    <Link
      key={product.id}
      href={`/shop/clothes/${product.slug || product.id}`}
      className="block transition-opacity hover:opacity-90"
    >
      <Card
        p={product}
        onAddToCart={() => {
          addItem({
            productId: product.id,
            productType: "clothes",
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

  return (
    <>
      {/* Fixed Background */}
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

      {/* Hero */}
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

        {/* Sub-filters for sizes and colors */}
        <div className="flex flex-col gap-2 mb-4" style={{ maxWidth: "600px", margin: "0 auto" }}>
          {/* Size sub-filters */}
          {availableSizes.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span className="text-white/60 text-xs mr-2">Size:</span>
              {SIZE_OPTIONS.map((size) => {
                const isActive = activeSizeFilter === size;
                const isAvailable = size === "ALL" || availableSizes.includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => setActiveSizeFilter(size)}
                    disabled={!isAvailable}
                    style={{
                      padding: "4px 12px",
                      borderRadius: "6px",
                      fontSize: "0.7rem",
                      border: `1px solid ${isActive ? "rgba(212,175,100,0.8)" : "rgba(255,255,255,0.1)"}`,
                      background: isActive ? "rgba(212,175,100,0.2)" : "rgba(255,255,255,0.04)",
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
          )}
          
          {/* Color sub-filters */}
          {availableColors.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span className="text-white/60 text-xs mr-2">Color:</span>
              {["ALL", ...availableColors].map((color) => {
                const isActive = activeColorFilter === color;
                const colorHex = color === "ALL" ? "#d4af64" : COLOR_HEX_MAP[color] || color;
                return (
                  <button
                    key={color}
                    onClick={() => setActiveColorFilter(color)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      fontSize: "0.7rem",
                      border: `1px solid ${isActive ? "rgba(212,175,100,0.8)" : "rgba(255,255,255,0.1)"}`,
                      background: isActive ? "rgba(212,175,100,0.2)" : "rgba(255,255,255,0.04)",
                      color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: colorHex,
                        border: "1px solid rgba(255,255,255,0.3)",
                      }}
                    />
                    {color === "ALL" ? "All" : color.replace("_", " ")}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Mobile Filter Button */}
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
            ⚙ {t("filterBy")} {activeFilter !== "ALL CLOTHES" && ` · ${gt(FILTER_REVERSE_MAP[activeFilter] || "clothes.filters.all")}`}
          </button>
          {sheetOpen && (
            <>
              <div onClick={() => setSheetOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} />
              <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 201, background: "rgba(15, 8, 40, 0.97)", backdropFilter: "blur(20px)", borderRadius: "24px 24px 0 0", border: "1px solid rgba(212,175,100,0.2)", padding: "12px 20px 32px", maxHeight: "70vh", overflowY: "auto" }}>
                <div style={{ width: "40px", height: "4px", borderRadius: "100px", background: "rgba(255,255,255,0.25)", margin: "0 auto 20px" }} />
                <h3 style={{ color: "#fff", fontSize: "1.1rem", marginBottom: "16px", fontFamily: "'Playfair Display', serif" }}>{t("filterBy")}</h3>
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
                        {gt(key)}
                        {isActive && <span style={{ color: "#d4af64" }}>✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

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
            {/* Desktop Filter Bar */}
            <div style={{ background: "rgba(15,5,40,0.6)", borderRadius: 12, padding: "14px 24px", marginBottom: 24, backdropFilter: "blur(8px)", alignItems: "center", gap: 12, flexWrap: "wrap", justifyContent: "center", display: "flex" }}>
              {FILTER_KEYS.map((key) => {
                const filterValue = FILTER_MAP[key];
                const isActive = activeFilter === filterValue;
                return (
                  <button key={key} role="tab" aria-selected={isActive} onClick={() => setActiveFilter(filterValue)}
                    style={{ border: `1px solid ${isActive ? "rgba(255,215,100,0.8)" : "rgba(255,215,100,0.35)"}`, borderRadius: 100, padding: "6px 20px", fontSize: "0.72rem", letterSpacing: "0.12em",
                      color: isActive ? "#fff" : "rgba(255,255,255,0.7)", background: isActive ? "rgba(255,215,100,0.15)" : "transparent", cursor: "pointer", transition: "all 0.2s ease", whiteSpace: "nowrap" }}>
                    {gt(key)}
                  </button>
                );
              })}
            </div>
            
            {/* Desktop Sub-filters */}
            <div className="flex flex-col gap-2 mb-4" style={{ maxWidth: "600px", margin: "0 auto" }}>
              {/* Size sub-filters */}
              {availableSizes.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  <span className="text-white/60 text-xs mr-2">Size:</span>
                  {SIZE_OPTIONS.map((size) => {
                    const isActive = activeSizeFilter === size;
                    const isAvailable = size === "ALL" || availableSizes.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => setActiveSizeFilter(size)}
                        disabled={!isAvailable}
                        style={{
                          padding: "4px 12px",
                          borderRadius: "6px",
                          fontSize: "0.7rem",
                          border: `1px solid ${isActive ? "rgba(212,175,100,0.8)" : "rgba(255,255,255,0.1)"}`,
                          background: isActive ? "rgba(212,175,100,0.2)" : "rgba(255,255,255,0.04)",
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
              )}
              
              {/* Color sub-filters */}
              {availableColors.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  <span className="text-white/60 text-xs mr-2">Color:</span>
                  {["ALL", ...availableColors].map((color) => {
                    const isActive = activeColorFilter === color;
                    const colorHex = color === "ALL" ? "#d4af64" : COLOR_HEX_MAP[color] || color;
                    return (
                      <button
                        key={color}
                        onClick={() => setActiveColorFilter(color)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: "4px 10px",
                          borderRadius: "6px",
                          fontSize: "0.7rem",
                          border: `1px solid ${isActive ? "rgba(212,175,100,0.8)" : "rgba(255,255,255,0.1)"}`,
                          background: isActive ? "rgba(212,175,100,0.2)" : "rgba(255,255,255,0.04)",
                          color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
                          cursor: "pointer",
                        }}
                      >
                        <span
                          style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            background: colorHex,
                            border: "1px solid rgba(255,255,255,0.3)",
                          }}
                        />
                        {color === "ALL" ? "All" : color.replace("_", " ")}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            
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