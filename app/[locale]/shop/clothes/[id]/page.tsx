"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import DynamicHeader from "@/components/layout/DynamicHeader";
import ProductDetailView from "@/components/ui/ProductDetailView";
import { getClothBySlug, getClothes } from "@/lib/api";
import type { CatalogProduct } from "@/lib/api";

export default function ClothesDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<CatalogProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<CatalogProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    // Detect RTL direction from HTML or document
    const htmlDir = document.documentElement.dir;
    setIsRTL(htmlDir === "rtl");

    // Also listen for direction changes if needed
    const observer = new MutationObserver(() => {
      const dir = document.documentElement.dir;
      setIsRTL(dir === "rtl");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["dir"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    async function loadCloth() {
      try {
        setIsLoading(true);

        // Fetch the cloth by slug or id
        const cloth = await getClothBySlug(id);
        setItem(cloth);

        // Fetch related clothes (same category, excluding current)
        if (cloth) {
          const allClothes = await getClothes();
          const related = allClothes
            .filter((c: CatalogProduct) => c.id !== cloth.id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error("Failed to load cloth:", error);
        setItem(null);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      loadCloth();
    }
  }, [id]);

  // Show loading state
  if (isLoading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#0a0514",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DynamicHeader />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "80vh",
            color: "#fff",
            direction: isRTL ? "rtl" : "ltr",
          }}
        >
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#fff",
              direction: isRTL ? "rtl" : "ltr",
            }}
          >
            {isRTL ? "در حال بارگذاری..." : "Loading..."}
          </h1>
        </div>
      </main>
    );
  }

  // Show not found state
  if (!item) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#0a0514",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <DynamicHeader />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "80vh",
            gap: "20px",
            direction: isRTL ? "rtl" : "ltr",
          }}
        >
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#fff",
              marginBottom: "16px",
            }}
          >
            {isRTL ? "محصول یافت نشد" : "Product Not Found"}
          </h1>
          <Link href="/shop/clothes" style={{ color: "#d4af64" }}>
            {isRTL ? "→ بازگشت به لباس‌ها" : "← Back to Clothes"}
          </Link>
        </div>
      </main>
    );
  }

  // Use both language fields for RTL/LTR support
  const itemName = isRTL
    ? item.nameFA || item.name || "Product"
    : item.name || item.nameFA || "Product";

  const itemDescription = isRTL
    ? item.descriptionFA ||
      item.description ||
      `${itemName} — لباس با کیفیت برای سفر معنوی شما.`
    : item.description ||
      item.descriptionFA ||
      `${itemName} — Quality clothing for your spiritual journey.`;

  // Format price with RTL/LTR awareness
  const formattedPrice = new Intl.NumberFormat(isRTL ? "fa-IR" : "en-US", {
    style: "currency",
    currency: item.currency || "IRT",
    maximumFractionDigits: 0,
    currencyDisplay: "code",
  }).format(item.price);

  // Build specs with RTL/LTR support - use actual attributes from product
  const specs = [
    {
      icon: "👗",
      label: isRTL ? "نوع" : "Type",
      value: isRTL ? "لباس" : "Clothing",
    },
    {
      icon: "✨",
      label: isRTL ? "مجموعه" : "Collection",
      value: isRTL ? "معنوی" : "Spiritual",
    },
    {
      icon: "⭐",
      label: isRTL ? "کیفیت" : "Quality",
      value: isRTL ? "برتر" : "Premium",
    },
  ];
  
  // Build benefits with RTL/LTR support
  const benefits = isRTL
    ? ["تناسب راحت", "طراحی معنوی", "مواد با کیفیت", "استایل چندمنظوره"]
    : [
        "Comfortable fit",
        "Spiritual design",
        "Premium materials",
        "Versatile styling",
      ];
  
  // Use actual variants and colorOptions from the product
  const sizes = ((item.variants as any[]) || []).map((v: any) => ({
    label: v.label || v.size || "M",
    value: (v.label || v.size || "m").toLowerCase(),
  }));
  
  const colorOptions = ((item.colorOptions as any[]) || []).map((c: any) => ({
    label: c.nameFA || c.nameEN || c.hex || "Color",
    value: c.hex || c.nameFA || c.nameEN,
  }));
  
  const productData = {
    id: item.id,
    name: itemName,
    category: isRTL ? "لباس" : "Clothing",
    categoryHref: "/shop/clothes",
    description: itemDescription,
    price: item.price,
    formattedPrice: formattedPrice,
    originalPrice: item.comparePrice || Math.round(item.price * 1.3),
    discountPercent: item.discountPercent || 23,
    inStock: item.isInStock !== false,
    stock: item.stock || 10,
    images: ((item.images as any[]) || []).map((img: any) => 
      typeof img === 'string' ? img : (img?.url || img?.path || '')
    ).filter((img: string) => Boolean(img && img.trim() !== '')),
    sizes: sizes.length > 0 ? sizes : [
      { label: "S", value: "s" },
      { label: "M", value: "m" },
      { label: "L", value: "l" },
    ],
    colorOptions: colorOptions,
    specs: specs,
    overview: isRTL
      ? `${itemName}. طراحی شده برای راحتی و هم‌اهنگی معنوی. ${itemDescription}`
      : `${itemName}. Designed for comfort and spiritual alignment. ${itemDescription}`,
    benefits: benefits,
    usage: isRTL
      ? "مناسب برای مدیتیشن، یوگا، مراسم معنوی، یا استفاده روزانه."
      : "Perfect for meditation, yoga, spiritual ceremonies, or everyday wear.",
    reviews: [],
    relatedProducts: relatedProducts.map((p: CatalogProduct) => ({
      id: p.id,
      name: isRTL ? p.nameFA || p.name : p.name || p.nameFA,
      price: p.price,
      image: p.image,
      slug: p.slug,
    })),
    isRTL: isRTL,
    avgRating: 0,
    comparePrice: item.comparePrice,
    currency: item.currency,
    variants: (item.variants as any[]) || [],
    attributes: (item.attributes as Record<string, any>) || {},
    tags: isRTL
      ? ["معنوی", "با کیفیت", "راحت"]
      : ["Spiritual", "Premium", "Comfortable"],
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0a0514",
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      <DynamicHeader />
      <ProductDetailView product={productData} />
    </main>
  );
}
