"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import DynamicHeader from "@/components/layout/DynamicHeader";
import ProductDetailView from "@/components/ui/ProductDetailView";
import { getAccessoryBySlug, getAccessories } from "@/lib/api";
import type { CatalogProduct } from "@/lib/api";

export default function AccessoryDetailPage() {
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
    async function loadAccessory() {
      try {
        setIsLoading(true);

        // Fetch the accessory by slug or id
        const accessory = await getAccessoryBySlug(id);
        setItem(accessory);

        // Fetch related accessories (same category, excluding current)
        if (accessory) {
          const allAccessories = await getAccessories();
          const related = allAccessories
            .filter((a: CatalogProduct) => a.id !== accessory.id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error("Failed to load accessory:", error);
        setItem(null);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      loadAccessory();
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
          <Link href="/shop/accessories" style={{ color: "#d4af64" }}>
            {isRTL ? "→ بازگشت به اکسسوری‌ها" : "← Back to Accessories"}
          </Link>
        </div>
      </main>
    );
  }

  // Use both language fields for RTL/LTR support
  const itemName = isRTL
    ? item.nameFA || item.nameEN || item.name || "Product"
    : item.nameEN || item.nameFA || item.name || "Product";

  const itemDescription = isRTL
    ? item.descriptionFA ||
      item.descriptionEN ||
      item.description ||
      `${itemName} - اکسسوری با کیفیت`
    : item.descriptionEN ||
      item.descriptionFA ||
      item.description ||
      `${itemName} - Quality accessory`;

  // Format price with RTL/LTR awareness
  const formattedPrice = new Intl.NumberFormat(isRTL ? "fa-IR" : "en-US", {
    style: "currency",
    currency: item.currency || "IRT",
    maximumFractionDigits: 0,
    currencyDisplay: "code",
  }).format(item.price);

  // Get attribute values safely
  const getAttributeValue = (key: string, lang: "FA" | "EN") => {
    if (!item.attributes) return undefined;
    const attr = item.attributes[key];
    if (!attr) return undefined;
    return lang === "FA" ? attr.valueFA : attr.valueEN;
  };

  // Build specs with RTL/LTR support
  const specs = [
    {
      icon: "💎",
      label: isRTL ? "جنس" : "Material",
      value: isRTL
        ? getAttributeValue("material", "FA") ||
          item.materialFA ||
          item.tags?.[0] ||
          "کیفیت بالا"
        : getAttributeValue("material", "EN") ||
          item.materialEN ||
          item.tags?.[0] ||
          "High Quality",
    },
    {
      icon: "✨",
      label: isRTL ? "نوع" : "Type",
      value: itemName,
    },
    {
      icon: "⚖️",
      label: isRTL ? "وزن" : "Weight",
      value: isRTL
        ? getAttributeValue("weight", "FA") || item.weightFA || item.weight
        : getAttributeValue("weight", "EN") || item.weightEN || item.weight,
    },
    {
      icon: "📏",
      label: isRTL ? "ابعاد" : "Dimensions",
      value: isRTL
        ? getAttributeValue("dimensions", "FA") ||
          item.dimensionsFA ||
          item.dimensions
        : getAttributeValue("dimensions", "EN") ||
          item.dimensionsEN ||
          item.dimensions,
    },
    {
      icon: "⭐",
      label: isRTL ? "کیفیت" : "Quality",
      value: isRTL ? "دست‌ساز" : "Handcrafted",
    },
    {
      icon: "🌍",
      label: isRTL ? "منشأ" : "Origin",
      value: isRTL ? "منبع اخلاقی" : "Ethically Sourced",
    },
    {
      icon: "📦",
      label: isRTL ? "بسته‌بندی" : "Package",
      value: isRTL ? "جعبه هدیه همراه" : "Gift Box Included",
    },
    {
      icon: "🛡️",
      label: isRTL ? "گارانتی" : "Warranty",
      value: isRTL ? "۳۰ روز" : "30 Days",
    },
  ];

  // Build benefits with RTL/LTR support
  const benefits = isRTL
    ? item.benefitsFA || [
        "افزایش تمرین معنوی",
        "مواد با کیفیت بالا",
        "مناسب برای هدیه",
        "منبع اخلاقی",
      ]
    : item.benefitsEN || [
        "Enhances spiritual practice",
        "High-quality materials",
        "Perfect for gifting",
        "Ethically sourced",
      ];

  // Get valid images from the API response
  const validImages = getValidImages(
    item.images || [item.image, item.heroImage],
  );

  const productData = {
    id: item.id,
    name: itemName,
    category: isRTL
      ? item.category?.nameFA || "اکسسوری‌ها"
      : item.category?.nameEN || "Accessories",
    categoryHref: `/shop/${item.category?.slug || "accessories"}`,
    description: itemDescription,
    price: item.price,
    formattedPrice: formattedPrice,
    originalPrice: item.comparePrice || Math.round(item.price * 1.25),
    discountPercent: item.comparePrice
      ? Math.round((1 - item.price / item.comparePrice) * 100)
      : 20,
    inStock: item.stock > 0,
    stock: item.stock || 12,
    images:
      validImages.length > 0 ? validImages : ["/placeholder-accessory.jpg"],
    specs: specs.filter((spec) => spec.value && spec.value !== "undefined"),
    overview: isRTL
      ? `${itemName}. ${itemDescription}`
      : `${itemName}. ${itemDescription}`,
    benefits: Array.isArray(benefits) ? benefits : [benefits],
    usage: isRTL
      ? "در تمرین معنوی روزانه خود، مدیتیشن، یا به عنوان یک قطعه تزئینی در فضای مقدس خود استفاده کنید."
      : "Use in your daily spiritual practice, meditation, or as a decorative piece in your sacred space.",
    reviews: item.reviews || [],
    relatedProducts: relatedProducts.map((p: CatalogProduct) => ({
      id: p.id,
      name: isRTL
        ? p.nameFA || p.nameEN || p.name
        : p.nameEN || p.nameFA || p.name,
      price: p.price,
      image:
        getValidImages(p.images || [p.image])[0] ||
        "/placeholder-accessory.jpg",
      slug: p.slug,
    })),
    isRTL: isRTL,
    avgRating: item.avgRating || 0,
    comparePrice: item.comparePrice || Math.round(item.price * 1.25),
    currency: item.currency,
    variants: item.variants || [],
    colorOptions: item.colorOptions || [],
    attributes: item.attributes || {},
    tags: isRTL
      ? item.tagsFA || ["معنوی", "دست‌ساز", "کیفیت بالا"]
      : item.tagsEN || ["Spiritual", "Handcrafted", "Premium"],
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
