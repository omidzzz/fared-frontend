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

  // Fetch all clothes products without limit to get all featured items
  const { data: productsData, isLoading: productsLoading } = useProducts({
    category: "clothes",
    limit: 100, // Increased limit to get all products
    offset: 0,
  });

  useEffect(() => {
    if (productsData?.products) {
      const products = productsData.products;
      setAllProducts(products);

      // Filter featured products - ensure we get ALL featured items
      const featured = products.filter(
        (product: any) => product.isFeatured === true,
      );
      setFeaturedProducts(featured);
      setIsLoading(false);

      console.log("All products count:", products.length);
      console.log("Featured products count:", featured.length);
      console.log(
        "Featured products:",
        featured.map((p: any) => p.nameFA || p.name),
      );
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
            <ProductGrid
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
            />
          </div>

          <ClothingNotePanel />
        </div>
        <ShopBenefits />
      </div>
    </>
  );
}
