"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import DynamicHeader from "@/components/layout/DynamicHeader";
import ProductDetailView from "@/components/ui/ProductDetailView";
import { getProduct } from "@/lib/api";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
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
    async function fetchProduct() {
      try {
        setLoading(true);
        const response = await getProduct(id);

        // Handle different response structures
        let productData = response;

        // If response has a data property, use that
        if (response?.data) {
          productData = response.data;
        }
        // If response has a success property and data, use data
        else if (response?.success && response?.data) {
          productData = response.data;
        }


        if (productData) {
          setProduct(productData);
        } else {
          console.error("No product data found in response");
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
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
        <div style={{ textAlign: "center" }}>
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

  if (!product) {
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
        <div
          style={{
            textAlign: "center",
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
          <Link href="/shop" style={{ color: "#d4af64" }}>
            {isRTL ? "→ بازگشت به فروشگاه" : "← Back to Shop"}
          </Link>
        </div>
      </main>
    );
  }

  const p = product;
  const category: string = p.category?.slug || p.type || "shop";
  const catMap: Record<string, string> = {
    stones: "/shop/stones",
    candles: "/shop/candles",
    accessories: "/shop/accessories",
    clothes: "/shop/clothes",
  };

  // Use both language fields for RTL/LTR support
  const pName = isRTL
    ? p.nameFA || p.nameEN || "Product"
    : p.nameEN || p.nameFA || "Product";
  const pPrice = p.price || 0;
  const pDescription = isRTL
    ? p.descriptionFA || p.descriptionEN || pName
    : p.descriptionEN || p.descriptionFA || pName;

  // Format price with RTL/LTR awareness
  const formattedPrice = new Intl.NumberFormat(isRTL ? "fa-IR" : "en-US", {
    style: "currency",
    currency: p.currency || "IRT",
    maximumFractionDigits: 0,
    currencyDisplay: "code",
  }).format(pPrice);

  // Build specs from attributes
  const specs =
    p.attributes?.map((attr: any) => ({
      icon: getIconForAttribute(attr.key),
      label: isRTL ? attr.valueFA : attr.valueEN,
      value: isRTL ? attr.valueFA : attr.valueEN,
    })) || [];

  // Add category spec
  if (p.category) {
    specs.unshift({
      icon: "📂",
      label: isRTL ? "دسته‌بندی" : "Category",
      value: isRTL ? p.category.nameFA : p.category.nameEN,
    });
  }

  // Add color options if available
  if (p.colorOptions?.length > 0) {
    specs.push({
      icon: "🎨",
      label: isRTL ? "رنگ‌ها" : "Colors",
      value: p.colorOptions
        .map((c: any) => (isRTL ? c.nameFA : c.nameEN))
        .join(", "),
    });
  }

  // Add stock info
  specs.push({
    icon: p.stock > 0 ? "✅" : "❌",
    label: isRTL ? "موجودی" : "Stock",
    value:
      p.stock > 0
        ? `${p.stock} ${isRTL ? "عدد" : "units"}`
        : isRTL
        ? "ناموجود"
        : "Out of stock",
  });

  // Build benefits from tags
  const benefits = p.tagsEN?.map((tag: string, index: number) =>
    isRTL ? p.tagsFA?.[index] || tag : tag,
  ) || ["Premium quality", "Carefully selected"];

  // Get images
  const images = p.images?.map((img: any) => img.url) || [];

  const productData = {
    id: p.id,
    name: pName,
    category: isRTL ? p.category?.nameFA : p.category?.nameEN,
    categorySlug: p.category?.slug || p.type,
    categoryHref: catMap[category] || "/shop",
    description: pDescription,
    price: pPrice,
    formattedPrice: formattedPrice,
    inStock: p.stock > 0,
    stock: p.stock,
    images: images,
    specs: specs,
    overview: pName,
    benefits: benefits,
    usage: isRTL
      ? "طبق دستورالعمل در تمرین معنوی خود استفاده کنید."
      : "Use as intended in your spiritual practice.",
    reviews: p.reviews || [],
    relatedProducts: [],
    isRTL: isRTL,
    tags: isRTL ? p.tagsFA : p.tagsEN,
    avgRating: p.avgRating || 0,
    comparePrice: p.comparePrice,
    currency: p.currency,
    variants: p.variants || [],
    colorOptions: p.colorOptions || [],
    attributes: p.attributes || [],
  };

  return (
    <main style={{ minHeight: "100vh", direction: isRTL ? "rtl" : "ltr" }}>
      <DynamicHeader />
      <ProductDetailView product={productData} />
    </main>
  );
}

// Helper function to get icon for attribute
function getIconForAttribute(key: string): string {
  const iconMap: Record<string, string> = {
    pages: "📄",
    cover: "📘",
    size: "📏",
    material: "🧵",
    weight: "⚖️",
    color: "🎨",
    length: "📐",
    width: "📐",
    height: "📐",
    capacity: "📦",
  };
  return iconMap[key.toLowerCase()] || "✨";
}
