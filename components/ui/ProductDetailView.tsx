"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";

/* ── Helper Functions ── */

// Format price with proper currency display
const formatPrice = (price: number, currency?: string) => {
  if (currency === "IRT" || currency === "IRR") {
    return `${price.toLocaleString()} تومان`;
  }
  return `$${price.toFixed(2)}`;
};

/* ── Types ── */

export interface Review {
  id: string;
  author: string;
  role: "USER";
  rating: number;
  date: string;
  text: string;
  adminReply?: {
    author: string;
    role: "ADMIN";
    date: string;
    text: string;
  };
}

export interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  currency?: string;
}

export interface ProductDetailData {
  id: string;
  name: string;
  category: string;
  categoryHref: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  inStock: boolean;
  images: string[];
  sizes?: { label: string; value: string }[];
  specs: { icon: string; label: string; value: string }[];
  overview: string;
  benefits: string[];
  usage: string;
  reviews: Review[];
  relatedProducts: RelatedProduct[];
  isRTL?: boolean;
  formattedPrice?: string;
  currency?: string;
}

/* ── Spec Strip ── */

function SpecStrip({ specs }: { specs: ProductDetailData["specs"] }) {
  if (!specs || specs.length === 0) return null;
  return (
    <div className="spec-strip">
      {specs.slice(0, 6).map((spec, i) => (
        <div className="spec-item" key={i}>
          <div className="spec-icon">{spec.icon}</div>
          <p className="spec-label">{spec.label}</p>
          <p className="spec-value">{spec.value}</p>
        </div>
      ))}
      <style jsx>{`
        .spec-strip {
          display: grid;
          grid-template-columns: repeat(${Math.min(specs.length, 6)}, 1fr);
          background: rgba(22, 11, 48, 0.55);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(212, 175, 100, 0.12);
          border-radius: 16px;
          padding: clamp(20px, 3vw, 28px) 0;
          margin-bottom: clamp(24px, 3vw, 32px);
        }
        .spec-item {
          text-align: center;
          padding: 0 12px;
          border-inline-end: 1px solid rgba(255, 255, 255, 0.08);
        }
        .spec-item:last-child {
          border-inline-end: none;
        }
        .spec-icon {
          font-size: clamp(1.2rem, 2vw, 1.4rem);
          color: #c9a468;
          margin-bottom: 8px;
        }
        .spec-label {
          font-size: clamp(0.7rem, 1vw, 0.82rem);
          font-weight: 600;
          color: #fff;
          margin-bottom: 4px;
        }
        .spec-value {
          font-size: clamp(0.65rem, 0.9vw, 0.75rem);
          color: rgba(255, 255, 255, 0.5);
          word-break: break-word;
        }
        @media (max-width: 768px) {
          .spec-strip {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 12px 0;
          }
          .spec-item:nth-child(3n) {
            border-inline-end: none;
          }
        }
        @media (max-width: 480px) {
          .spec-strip {
            grid-template-columns: repeat(2, 1fr) !important;
            padding: 16px 0;
          }
          .spec-item:nth-child(3n) {
            border-inline-end: 1px solid rgba(255, 255, 255, 0.08);
          }
          .spec-item:nth-child(2n) {
            border-inline-end: none;
          }
        }
      `}</style>
    </div>
  );
}

/* ── About Panel ── */

function AboutPanel({
  overview,
  benefits,
  usage,
  isRTL,
}: {
  overview: string;
  benefits: string[];
  usage: string;
  isRTL?: boolean;
}) {
  return (
    <div className="about-panel">
      <h2 className="section-heading">
        {isRTL ? "درباره این محصول" : "About This Product"}
      </h2>
      <div className="about-grid">
        <div>
          <div className="about-col-header">
            <span className="col-icon">💎</span>
            <h3>{isRTL ? "مرور کلی" : "Overview"}</h3>
          </div>
          <p className="about-text">{overview}</p>
        </div>
        <div>
          <div className="about-col-header">
            <span className="col-icon">⭐</span>
            <h3>{isRTL ? "مزایا" : "Benefits"}</h3>
          </div>
          <ul className="benefit-list">
            {benefits.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="about-col-header">
            <span className="col-icon">👑</span>
            <h3>{isRTL ? "روش استفاده" : "Usage"}</h3>
          </div>
          <p className="about-text">{usage}</p>
        </div>
      </div>
      <style jsx>{`
        .about-panel {
          background: rgba(22, 11, 48, 0.55);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: clamp(20px, 3vw, 32px);
          margin-bottom: clamp(24px, 3vw, 32px);
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: clamp(20px, 3vw, 32px);
        }
        .about-col-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }
        .about-col-header h3 {
          font-size: clamp(0.85rem, 1vw, 0.95rem);
          font-weight: 600;
          color: #fff;
        }
        .col-icon {
          color: #d4af64;
        }
        .about-text {
          font-size: clamp(0.78rem, 1vw, 0.82rem);
          color: rgba(255, 255, 255, 0.62);
          line-height: 1.7;
        }
        .benefit-list {
          list-style: none;
          padding: 0;
        }
        .benefit-list li {
          font-size: clamp(0.78rem, 1vw, 0.82rem);
          color: rgba(255, 255, 255, 0.62);
          margin-bottom: 8px;
          padding-inline-start: 14px;
          position: relative;
          line-height: 1.5;
        }
        .benefit-list li::before {
          content: "·";
          position: absolute;
          inset-inline-start: 0;
          color: #d4af64;
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
      `}</style>
    </div>
  );
}

/* ── Review Card ── */

function ReviewCard({
  author,
  role,
  rating,
  date,
  text,
  isReply,
}: {
  author: string;
  role: string;
  rating?: number;
  date: string;
  text: string;
  isReply?: boolean;
}) {
  return (
    <div className={`review-card ${isReply ? "reply" : ""}`}>
      <div className="review-header">
        <div className="reviewer">
          <div className="avatar">{role === "ADMIN" ? "✦" : author[0]}</div>
          <div>
            <div className="name-row">
              <span className="author">{author}</span>
              <span className="role-badge">{role}</span>
            </div>
            {rating && (
              <div className="rating">
                {"★".repeat(rating)}
                {"☆".repeat(5 - rating)}
              </div>
            )}
          </div>
        </div>
        <span className="date">{date}</span>
      </div>
      <p className="review-text">{text}</p>
      <style jsx>{`
        .review-card {
          background: rgba(22, 11, 48, 0.55);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: clamp(14px, 2vw, 18px) clamp(16px, 2vw, 20px);
        }
        .review-card.reply {
          background: rgba(212, 175, 100, 0.07);
          border-color: rgba(212, 175, 100, 0.22);
          margin-inline-start: clamp(16px, 2vw, 24px);
        }
        .review-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
          gap: 10px;
        }
        .reviewer {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .avatar {
          width: clamp(32px, 4vw, 36px);
          height: clamp(32px, 4vw, 36px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(0.75rem, 1vw, 0.85rem);
          flex-shrink: 0;
          background: rgba(140, 80, 255, 0.2);
          color: #b490fa;
        }
        .review-card.reply .avatar {
          background: rgba(212, 175, 100, 0.2);
          color: #d4af64;
        }
        .name-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .author {
          font-size: clamp(0.78rem, 1vw, 0.85rem);
          font-weight: 600;
          color: #fff;
        }
        .role-badge {
          font-size: clamp(0.5rem, 0.7vw, 0.6rem);
          padding: 2px 8px;
          border-radius: 100px;
          background: rgba(140, 80, 255, 0.2);
          color: #b490fa;
          font-weight: 600;
          white-space: nowrap;
        }
        .review-card.reply .role-badge {
          background: rgba(212, 175, 100, 0.2);
          color: #d4af64;
        }
        .rating {
          color: #d4af64;
          font-size: clamp(0.6rem, 0.8vw, 0.7rem);
          margin-top: 2px;
        }
        .date {
          font-size: clamp(0.6rem, 0.7vw, 0.7rem);
          color: rgba(255, 255, 255, 0.4);
          white-space: nowrap;
        }
        .review-text {
          font-size: clamp(0.78rem, 1vw, 0.82rem);
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}

/* ── Reviews Section ── */

function ReviewsSection({
  reviews,
  isRTL,
}: {
  reviews: Review[];
  isRTL?: boolean;
}) {
  if (reviews.length === 0) return null;
  return (
    <div className="reviews-section">
      <h2 className="section-heading">
        {isRTL
          ? `نظرات مشتریان (${reviews.length})`
          : `Customer Reviews (${reviews.length})`}
      </h2>
      <div className="reviews-grid">
        {reviews.map((review) => (
          <div className="review-stack" key={review.id}>
            <ReviewCard
              author={review.author}
              role="USER"
              rating={review.rating}
              date={review.date}
              text={review.text}
            />
            {review.adminReply && (
              <ReviewCard
                author={review.adminReply.author}
                role="ADMIN"
                date={review.adminReply.date}
                text={review.adminReply.text}
                isReply
              />
            )}
          </div>
        ))}
      </div>
      <style jsx>{`
        .reviews-section {
          margin-bottom: clamp(24px, 3vw, 32px);
        }
        .reviews-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(12px, 2vw, 16px);
        }
        .review-stack {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        @media (max-width: 768px) {
          .reviews-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

/* ── Related Products ── */

function RelatedProducts({
  products,
  isRTL,
}: {
  products: RelatedProduct[];
  isRTL?: boolean;
}) {
  // Filter out products with empty or invalid images
  const validProducts = products.filter((p) => typeof p.image === 'string' && p.image.trim() !== '');
  
  if (validProducts.length === 0) return null;
  return (
    <div className="related-section">
      <h2 className="section-heading">
        {isRTL ? "ممکن است اینها را هم دوست داشته باشید" : "You May Also Love"}
      </h2>
      <div className="related-grid">
        {validProducts.map((p) => (
          <Link key={p.id} href={`/product/${p.id}`} className="related-card">
            <div className="related-image">
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="(max-width: 480px) 50vw, 25vw"
                style={{ objectFit: "cover" }}
                unoptimized
              />
            </div>
            <div className="related-info">
              <p className="related-name">{p.name}</p>
              <span className="related-price">
                {formatPrice(p.price, p.currency)}
              </span>
            </div>
          </Link>
        ))}
      </div>
      <style jsx>{`
        .related-section {
          margin-bottom: clamp(24px, 3vw, 32px);
        }
        .related-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(12px, 2vw, 20px);
        }
        .related-card {
          display: block;
          text-decoration: none;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(22, 11, 48, 0.5);
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .related-card:hover {
          transform: translateY(-4px);
          border-color: rgba(212, 175, 100, 0.4);
        }
        .related-image {
          position: relative;
          aspect-ratio: 1 / 1;
        }
        .related-info {
          padding: clamp(10px, 1.5vw, 14px);
        }
        .related-name {
          font-size: clamp(0.75rem, 1vw, 0.85rem);
          color: #fff;
          margin-bottom: 6px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .related-price {
          font-size: clamp(0.8rem, 1vw, 0.9rem);
          color: #d4af64;
          font-weight: 600;
          display: block;
        }
        @media (max-width: 1024px) {
          .related-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 768px) {
          .related-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .related-grid {
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
}

/* ── Shipping Info ── */

function ShippingInfoBar({ isRTL }: { isRTL?: boolean }) {
  const items = [
    {
      icon: "🚚",
      label: isRTL ? "ارسال" : "Shipping",
      text: isRTL
        ? "سفارشات در عرض ۲۴-۴۸ ساعت پردازش و با دقت ارسال می‌شوند."
        : "Orders are processed within 24-48 hours and shipped with care.",
    },
    {
      icon: "📦",
      label: isRTL ? "تحویل" : "Delivery",
      text: isRTL
        ? "زمان تحویل تخمینی ۳-۷ روز کاری در داخل ایران."
        : "Estimated delivery time is 3-7 business days within the U.S.",
    },
    {
      icon: "↻",
      label: isRTL ? "بازگشت" : "Returns",
      text: isRTL
        ? "ما سیاست بازگشت ۳۰ روزه برای کالاهای استفاده نشده در شرایط اصلی ارائه می‌دهیم."
        : "We offer a 30-day return policy for unused items in original condition.",
    },
  ];
  return (
    <div className="shipping-bar">
      {items.map((item) => (
        <div className="shipping-item" key={item.label}>
          <span className="shipping-icon">{item.icon}</span>
          <div>
            <p className="shipping-label">{item.label}</p>
            <p className="shipping-text">{item.text}</p>
          </div>
        </div>
      ))}
      <style jsx>{`
        .shipping-bar {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(16px, 3vw, 32px);
          background: rgba(22, 11, 48, 0.55);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: clamp(20px, 3vw, 28px) clamp(16px, 3vw, 32px);
        }
        .shipping-item {
          display: flex;
          gap: clamp(10px, 1.5vw, 14px);
          align-items: flex-start;
        }
        .shipping-icon {
          font-size: clamp(1.2rem, 2vw, 1.4rem);
          color: #c9a468;
          flex-shrink: 0;
        }
        .shipping-label {
          font-size: clamp(0.8rem, 1vw, 0.88rem);
          font-weight: 600;
          color: #fff;
          margin-bottom: 4px;
        }
        .shipping-text {
          font-size: clamp(0.7rem, 0.9vw, 0.78rem);
          color: rgba(255, 255, 255, 0.55);
          line-height: 1.5;
        }
        @media (max-width: 768px) {
          .shipping-bar {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>
    </div>
  );
}

/* ── Main Component ── */

export default function ProductDetailView({
  product,
}: {
  product: ProductDetailData;
}) {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(
    product.sizes?.[1]?.value || product.sizes?.[0]?.value || "",
  );
  const [quantity, setQuantity] = useState(1);
  const isRTL = product.isRTL || false;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productType: "stone",
      name: product.name,
      nameFA: product.name,
      price: product.price,
      currency: (product.currency === "IRT" || product.currency === "IRR") ? "IRT" : "USD",
      quantity,
      image: product.images[0],
    });
  };

  return (
    <div className={isRTL ? "pdv rtl" : "pdv"} dir={isRTL ? "rtl" : "ltr"}>
      {/* Fixed psychedelic backdrop — one ambient aura, transform-only animation */}
      <div className="pdv-backdrop" aria-hidden="true">
        <div className="pdv-aura" />
      </div>

      <div className="pdv-body">
        <div className="pdv-container">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <Link href="/">{isRTL ? "خانه" : "Home"}</Link>
            <span>›</span>
            <Link href="/shop">{isRTL ? "فروشگاه" : "Shop"}</Link>
            <span>›</span>
            <Link href={product.categoryHref}>{product.category}</Link>
            <span>›</span>
            <span className="crumb-current">{product.name}</span>
          </div>

          {/* Hero: Gallery + Info */}
          <div className="hero-grid">
            {/* Gallery */}
            <div className="gallery">
              <div className="thumbs">
                {product.images.slice(0, 5).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`thumb ${selectedImage === i ? "active" : ""}`}
                    aria-label={`${isRTL ? "تصویر" : "Image"} ${i + 1}`}
                  >
                    {typeof img === 'string' && img.trim() !== '' ? (
                      <Image
                        src={img}
                        alt=""
                        fill
                        sizes="64px"
                        style={{ objectFit: "cover" }}
                        unoptimized
                      />
                    ) : (
                      <div style={{ 
                        width: '100%', 
                        height: '100%', 
                        background: 'rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'rgba(255,255,255,0.3)',
                        fontSize: '0.7rem'
                      }}>
                        {isRTL ? 'بدون تصویر' : 'No img'}
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="main-image-wrap">
                <div className="main-image-glow" />
                {(typeof product.images[selectedImage] === 'string' && product.images[selectedImage].trim() !== '') || 
                 (typeof product.images[0] === 'string' && product.images[0].trim() !== '') ? (
                  <Image
                    src={product.images[selectedImage] || product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                    unoptimized
                    priority
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: 'clamp(1rem, 2vw, 1.5rem)'
                  }}>
                    {isRTL ? 'تصویر محصول' : 'Product Image'}
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="info">
              <h1 className="title">{product.name}</h1>
              <p className="description">{product.description}</p>

              <div className="price-row">
                <span className="price">
                  {formatPrice(product.price, product.currency)}
                </span>
                {product.originalPrice && (
                  <span className="price-original">
                    {formatPrice(product.originalPrice, product.currency)}
                  </span>
                )}
                {product.discountPercent && (
                  <span className="discount-badge">
                    {product.discountPercent}% OFF
                  </span>
                )}
              </div>

              <div className="stock-row">
                <span
                  className={`stock-dot ${product.inStock ? "in" : "out"}`}
                />
                <span
                  className={`stock-label ${product.inStock ? "in" : "out"}`}
                >
                  {product.inStock
                    ? isRTL
                      ? "موجود"
                      : "In Stock"
                    : isRTL
                    ? "ناموجود"
                    : "Out of Stock"}
                </span>
              </div>

              {product.sizes && product.sizes.length > 0 && (
                <div className="size-block">
                  <p className="field-label">{isRTL ? "سایز" : "Size"}</p>
                  <div className="size-row">
                    {product.sizes.map((size) => (
                      <button
                        key={size.value}
                        onClick={() => setSelectedSize(size.value)}
                        className={`size-btn ${
                          selectedSize === size.value ? "active" : ""
                        }`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="qty-block">
                <p className="field-label">{isRTL ? "تعداد" : "Quantity"}</p>
                <div className="qty-row">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label={isRTL ? "کاهش" : "Decrease quantity"}
                  >
                    −
                  </button>
                  <span className="qty-val">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label={isRTL ? "افزایش" : "Increase quantity"}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="actions">
                <button className="btn-primary" onClick={handleAddToCart}>
                  🛍 {isRTL ? "افزودن به سبد خرید" : "Add To Cart"}
                </button>
                <button className="btn-secondary">
                  ⚡ {isRTL ? "خرید فوری" : "Buy Now"}
                </button>
              </div>
            </div>
          </div>

          <SpecStrip specs={product.specs} />
          <AboutPanel
            overview={product.overview}
            benefits={product.benefits}
            usage={product.usage}
            isRTL={isRTL}
          />
          <ReviewsSection reviews={product.reviews} isRTL={isRTL} />
          <RelatedProducts products={product.relatedProducts} isRTL={isRTL} />
          <ShippingInfoBar isRTL={isRTL} />
        </div>
      </div>

      <style jsx global>{`
        .section-heading {
          font-family: "Playfair Display", Georgia, serif;
          font-size: clamp(1.1rem, 2vw, 1.3rem);
          color: #fff;
          margin-bottom: clamp(16px, 2vw, 20px);
          letter-spacing: 0.01em;
        }
      `}</style>

      <style jsx>{`
        .pdv {
          position: relative;
          min-height: 100vh;
          text-align: left;
        }
        .pdv.rtl {
          text-align: right;
        }

        /* ── Ambient backdrop: one signature move ──
           A slow-rotating conic gradient, blurred and dim, fixed
           behind everything. Transform + opacity only — cheap to
           composite, no layout thrash, no scroll listeners. */
        .pdv-backdrop {
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          background: linear-gradient(
            180deg,
            #150a30 0%,
            #0d0620 55%,
            #0a0418 100%
          );
        }
        .pdv-aura {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 140vmax;
          height: 140vmax;
          margin: -70vmax 0 0 -70vmax;
          background: conic-gradient(
            from 0deg,
            rgba(138, 92, 246, 0.16),
            rgba(217, 79, 213, 0.12),
            rgba(212, 175, 100, 0.1),
            rgba(79, 216, 196, 0.1),
            rgba(138, 92, 246, 0.16)
          );
          filter: blur(80px);
          opacity: 0.6;
          animation: spin 90s linear infinite;
          will-change: transform;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .pdv-aura {
            animation: none;
          }
        }

        .pdv-body {
          position: relative;
          z-index: 1;
          padding: clamp(16px, 4vw, 90px) 0 clamp(40px, 5vw, 60px);
        }
        .pdv-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(16px, 4vw, 40px);
        }

        /* Breadcrumb */
        .breadcrumb {
          display: flex;
          align-items: center;
          gap: clamp(4px, 1vw, 8px);
          font-size: clamp(0.7rem, 1vw, 0.82rem);
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: clamp(16px, 3vw, 24px);
          flex-wrap: wrap;
        }
        .breadcrumb :global(a) {
          color: inherit;
          text-decoration: none;
        }
        .breadcrumb :global(a:hover) {
          color: #d4af64;
        }
        .crumb-current {
          color: rgba(255, 255, 255, 0.85);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: clamp(100px, 30vw, 200px);
        }

        /* Hero */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(24px, 5vw, 48px);
          margin-bottom: clamp(32px, 5vw, 48px);
        }
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        .gallery {
          display: flex;
          gap: clamp(8px, 1.5vw, 12px);
        }
        @media (max-width: 480px) {
          .gallery {
            flex-direction: column-reverse;
          }
        }

        .thumbs {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 1vw, 10px);
        }
        @media (max-width: 480px) {
          .thumbs {
            flex-direction: row;
            justify-content: center;
            flex-wrap: wrap;
          }
        }
        .thumb {
          width: clamp(48px, 6vw, 64px);
          height: clamp(48px, 6vw, 64px);
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 0;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.04);
          position: relative;
          flex-shrink: 0;
          transition: border-color 0.2s ease;
        }
        .thumb.active {
          border: 2px solid #d4af64;
        }

        .main-image-wrap {
          flex: 1;
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(212, 175, 100, 0.25);
          aspect-ratio: 1 / 1;
          background: rgba(255, 255, 255, 0.02);
          min-height: clamp(200px, 50vw, 400px);
        }
        @media (max-width: 480px) {
          .main-image-wrap {
            min-height: clamp(200px, 70vw, 300px);
          }
        }
        .main-image-glow {
          position: absolute;
          inset: -30%;
          background: radial-gradient(
            circle,
            rgba(217, 79, 213, 0.25),
            rgba(138, 92, 246, 0.15) 45%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 0;
        }

        /* Info column */
        .info {
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 2vw, 16px);
        }
        .title {
          font-family: "Playfair Display", Georgia, serif;
          font-size: clamp(1.5rem, 3.5vw, 2.6rem);
          color: #fff;
          line-height: 1.2;
          background: linear-gradient(90deg, #fff, #f2d9ff 60%, #fff);
          -webkit-background-clip: text;
          background-clip: text;
        }
        .description {
          font-size: clamp(0.85rem, 1.2vw, 0.95rem);
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.7;
        }

        .price-row {
          display: flex;
          align-items: center;
          gap: clamp(10px, 1.5vw, 14px);
          flex-wrap: wrap;
        }
        .price {
          font-family: "Playfair Display", Georgia, serif;
          font-size: clamp(1.5rem, 3vw, 1.8rem);
          color: #fff;
          font-weight: 600;
        }
        .price-original {
          font-size: clamp(0.9rem, 1.5vw, 1.1rem);
          color: rgba(255, 255, 255, 0.4);
          text-decoration: line-through;
        }
        .discount-badge {
          padding: 4px 12px;
          border-radius: 100px;
          background: rgba(212, 175, 100, 0.15);
          border: 1px solid rgba(212, 175, 100, 0.4);
          color: #d4af64;
          font-size: clamp(0.7rem, 0.9vw, 0.78rem);
          font-weight: 600;
        }

        .stock-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .stock-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .stock-dot.in {
          background: #4ade80;
        }
        .stock-dot.out {
          background: #f87171;
        }
        .stock-label {
          font-size: clamp(0.8rem, 1vw, 0.85rem);
        }
        .stock-label.in {
          color: #4ade80;
        }
        .stock-label.out {
          color: #f87171;
        }

        .field-label {
          font-size: clamp(0.8rem, 1vw, 0.85rem);
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 10px;
        }

        .size-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .size-btn {
          padding: clamp(8px, 1vw, 10px) clamp(14px, 2vw, 20px);
          border-radius: 100px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: transparent;
          color: rgba(255, 255, 255, 0.6);
          font-size: clamp(0.78rem, 0.9vw, 0.82rem);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .size-btn.active {
          border: 1.5px solid #d4af64;
          background: rgba(212, 175, 100, 0.1);
          color: #fff;
        }

        .qty-row {
          display: inline-flex;
          align-items: center;
          gap: clamp(12px, 1.5vw, 16px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 100px;
          padding: clamp(6px, 0.8vw, 8px) clamp(14px, 2vw, 18px);
        }
        .qty-row button {
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
          font-size: clamp(0.9rem, 1.2vw, 1rem);
          padding: 4px 8px;
          border-radius: 50%;
          transition: background 0.2s ease;
        }
        .qty-row button:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .qty-val {
          color: #fff;
          font-size: clamp(0.85rem, 1vw, 0.9rem);
          min-width: 24px;
          text-align: center;
        }

        .actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }
        @media (min-width: 480px) {
          .actions {
            flex-direction: row;
          }
        }
        .btn-primary,
        .btn-secondary {
          flex: 1;
          padding: clamp(14px, 2vw, 16px);
          border-radius: 100px;
          font-size: clamp(0.9rem, 1.1vw, 0.95rem);
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 56px;
          transition: transform 0.15s ease, box-shadow 0.2s ease,
            background 0.2s ease;
        }
        .btn-primary {
          background: linear-gradient(135deg, #c8a24a, #e8c96a 50%, #c8a24a);
          border: none;
          color: #1a0d00;
          box-shadow: 0 4px 24px rgba(200, 162, 74, 0.35);
        }
        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 28px rgba(200, 162, 74, 0.5);
        }
        .btn-primary:active {
          transform: translateY(0) scale(0.98);
        }
        .btn-secondary {
          background: transparent;
          border: 1.5px solid rgba(212, 175, 100, 0.5);
          color: #d4af64;
          font-weight: 600;
        }
        .btn-secondary:hover {
          background: rgba(212, 175, 100, 0.1);
          border-color: #d4af64;
        }
      `}</style>
    </div>
  );
}
