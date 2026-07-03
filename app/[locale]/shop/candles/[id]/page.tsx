"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import DynamicHeader from "@/components/layout/DynamicHeader";
import ProductDetailView from "@/components/ui/ProductDetailView";
import { getCandleBySlug, getCandles } from "@/lib/api";
import type { CatalogProduct } from "@/lib/api";

export default function CandleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [candle, setCandle] = useState<CatalogProduct | null>(null);
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
    async function loadCandle() {
      try {
        setIsLoading(true);

        // Fetch the candle by slug or id
        const candleData = await getCandleBySlug(id);
        setCandle(candleData);

        // Fetch related candles (same category, excluding current)
        if (candleData) {
          const allCandles = await getCandles();
          const related = allCandles
            .filter((c: CatalogProduct) => c.id !== candleData.id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error("Failed to load candle:", error);
        setCandle(null);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      loadCandle();
    }
  }, [id]);

  // Helper function to safely filter images
  const getValidImages = (images: any[] | undefined): string[] => {
    if (!images || !Array.isArray(images)) return [];
    return images
      .filter((img): img is string => {
        if (typeof img === "string") return img.trim() !== "";
        // Handle image objects with url property
        if (typeof img === "object" && img !== null && "url" in img) {
          return typeof img.url === "string" && img.url.trim() !== "";
        }
        return false;
      })
      .map((img) => (typeof img === "string" ? img : img.url));
  };

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
  if (!candle) {
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
          <Link href="/shop/candles" style={{ color: "#d4af64" }}>
            {isRTL ? "→ بازگشت به شمع‌ها" : "← Back to Candles"}
          </Link>
        </div>
      </main>
    );
  }

  // Use both language fields for RTL/LTR support
  const candleName = isRTL
    ? candle.nameFA || candle.nameEN || candle.name || "Product"
    : candle.nameEN || candle.nameFA || candle.name || "Product";

  const candleDescription = isRTL
    ? candle.descriptionFA ||
      candle.descriptionEN ||
      candle.description ||
      `${candleName} — شمعی با رایحه ${
        candle.attributes?.scent?.valueFA ||
        candle.scentFA ||
        candle.scentEN ||
        candle.scent
      }.`
    : candle.descriptionEN ||
      candle.descriptionFA ||
      candle.description ||
      `${candleName} — A candle with ${
        candle.attributes?.scent?.valueEN ||
        candle.scentEN ||
        candle.scentFA ||
        candle.scent
      } scent.`;

  // Format price with RTL/LTR awareness
  const formattedPrice = new Intl.NumberFormat(isRTL ? "fa-IR" : "en-US", {
    style: "currency",
    currency: candle.currency || "IRT",
    maximumFractionDigits: 0,
    currencyDisplay: "code",
  }).format(candle.price);

  // Get attribute values safely
  const getAttributeValue = (key: string, lang: "FA" | "EN") => {
    if (!candle.attributes) return undefined;
    const attr = candle.attributes[key];
    if (!attr) return undefined;
    return lang === "FA" ? attr.valueFA : attr.valueEN;
  };

  // Build specs with RTL/LTR support
  const specs = [
    {
      icon: "🕯️",
      label: isRTL ? "زمان سوختن" : "Burn Time",
      value: isRTL
        ? getAttributeValue("burn_time", "FA") || candle.burnTime
        : getAttributeValue("burn_time", "EN") || candle.burnTime,
    },
    {
      icon: "🌿",
      label: isRTL ? "نوع موم" : "Wax Type",
      value: isRTL
        ? getAttributeValue("wax_type", "FA") ||
          candle.waxTypeFA ||
          candle.waxType
        : getAttributeValue("wax_type", "EN") ||
          candle.waxTypeEN ||
          candle.waxType,
    },
    {
      icon: "🌸",
      label: isRTL ? "رایحه" : "Scent",
      value: isRTL
        ? getAttributeValue("scent", "FA") || candle.scentFA || candle.scent
        : getAttributeValue("scent", "EN") || candle.scentEN || candle.scent,
    },
    {
      icon: "⚖️",
      label: isRTL ? "وزن" : "Weight",
      value: isRTL
        ? getAttributeValue("weight", "FA") || candle.weightFA || candle.weight
        : getAttributeValue("weight", "EN") || candle.weightEN || candle.weight,
    },
    {
      icon: "⭐",
      label: isRTL ? "کیفیت" : "Quality",
      value: isRTL ? "دست‌ریخته" : "Hand-Poured",
    },
  ];

  // Build benefits with RTL/LTR support
  const benefits = isRTL
    ? candle.benefitsFA || candle.tagsFA || ["آرامش", "تعادل", "تمرکز"]
    : candle.benefitsEN || candle.tagsEN || ["Calm", "Balance", "Focus"];

  // Build usage text with RTL/LTR support
  const usageText = isRTL
    ? `شمع را در فضایی امن و دور از دسترس کودکان روشن کنید. قبل از هر بار استفاده، فتیله را به ۱/۴ اینچ کوتاه کنید. برای جلوگیری از تونل زدن، اجازه دهید موم در اولین بار سوختن تا لبه‌ها ذوب شود.`
    : `Burn candle in a safe place away from children. Trim wick to 1/4 inch before each use. Allow wax to melt to the edges on first burn to prevent tunneling.`;

  // Get valid images from the API response
  const validImages = getValidImages(candle.images || [candle.image]);

  const productData = {
    id: candle.id,
    name: candleName,
    category: isRTL
      ? candle.category?.nameFA || "شمع‌ها"
      : candle.category?.nameEN || "Candles",
    categoryHref: `/shop/${candle.category?.slug || "candles"}`,
    description: candleDescription,
    price: candle.price,
    formattedPrice: formattedPrice,
    originalPrice: candle.comparePrice || Math.round(candle.price * 1.15),
    discountPercent: candle.comparePrice
      ? Math.round((1 - candle.price / candle.comparePrice) * 100)
      : 13,
    inStock: candle.stock > 0,
    stock: candle.stock || 15,
    images: validImages.length > 0 ? validImages : ["/placeholder-candle.jpg"],
    sizes: [
      { label: isRTL ? "کوچک" : "Small", value: "small" },
      { label: isRTL ? "متوسط" : "Medium", value: "medium" },
      { label: isRTL ? "بزرگ" : "Large", value: "large" },
    ],
    specs: specs.filter((spec) => spec.value && spec.value !== "undefined"),
    overview: isRTL
      ? `${candleName}. ${candleDescription}`
      : `${candleName}. ${candleDescription}`,
    benefits: Array.isArray(benefits) ? benefits : [benefits],
    usage: usageText,
    reviews: candle.reviews || [],
    relatedProducts: relatedProducts.map((c: CatalogProduct) => ({
      id: c.id,
      name: isRTL
        ? c.nameFA || c.nameEN || c.name
        : c.nameEN || c.nameFA || c.name,
      price: c.price,
      image:
        getValidImages(c.images || [c.image])[0] || "/placeholder-candle.jpg",
      slug: c.slug,
    })),
    isRTL: isRTL,
    avgRating: candle.avgRating || 0,
    comparePrice: candle.comparePrice || Math.round(candle.price * 1.15),
    currency: candle.currency,
    variants: candle.variants || [],
    colorOptions: candle.colorOptions || [],
    attributes: candle.attributes || {},
    tags: isRTL
      ? candle.tagsFA || ["معنوی", "مراقبه", "دست‌ساز"]
      : candle.tagsEN || ["Spiritual", "Meditation", "Handmade"],
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
