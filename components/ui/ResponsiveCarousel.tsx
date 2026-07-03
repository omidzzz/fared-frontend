"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";

interface ResponsiveCarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  /** Items visible per slide on tablet (default: 2) */
  tabletItemsPerSlide?: number;
  /** Items visible per slide on desktop (default: 4) */
  desktopItemsPerSlide?: number;
  autoplayMs?: number;
  className?: string;
}

// ── shared slider logic ──────────────────────────────────────────────
function useSlider(totalSlides: number, autoplayMs: number) {
  const [active, setActive] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTransitioning = useRef(false);
  const isHovered = useRef(false);

  useEffect(() => {
    if (active >= totalSlides && totalSlides > 0) {
      setActive(0);
    }
  }, [totalSlides, active]);

  const next = useCallback(() => {
    if (isTransitioning.current || totalSlides <= 1) return;
    isTransitioning.current = true;
    setActive((i) => (i + 1) % totalSlides);
    setTimeout(() => {
      isTransitioning.current = false;
    }, 400);
  }, [totalSlides]);

  const prev = useCallback(() => {
    if (isTransitioning.current || totalSlides <= 1) return;
    isTransitioning.current = true;
    setActive((i) => (i - 1 + totalSlides) % totalSlides);
    setTimeout(() => {
      isTransitioning.current = false;
    }, 400);
  }, [totalSlides]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (autoplayMs > 0 && totalSlides > 1 && !isHovered.current) {
      timerRef.current = setInterval(next, autoplayMs);
    }
  }, [next, autoplayMs, totalSlides]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [resetTimer]);

  const handleMouseEnter = useCallback(() => {
    isHovered.current = true;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHovered.current = false;
    if (autoplayMs > 0 && totalSlides > 1) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      timerRef.current = setInterval(next, autoplayMs);
    }
  }, [next, autoplayMs, totalSlides]);

  const handlePrev = useCallback(() => {
    if (totalSlides <= 1) return;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    prev();
    setTimeout(() => {
      if (autoplayMs > 0 && totalSlides > 1 && !isHovered.current) {
        timerRef.current = setInterval(next, autoplayMs);
      }
    }, 5000);
  }, [prev, next, autoplayMs, totalSlides]);

  const handleNext = useCallback(() => {
    if (totalSlides <= 1) return;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    next();
    setTimeout(() => {
      if (autoplayMs > 0 && totalSlides > 1 && !isHovered.current) {
        timerRef.current = setInterval(next, autoplayMs);
      }
    }, 5000);
  }, [next, autoplayMs, totalSlides]);

  const handleDot = useCallback(
    (i: number) => {
      if (totalSlides <= 1 || i === active) return;
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setActive(i);
      setTimeout(() => {
        if (autoplayMs > 0 && totalSlides > 1 && !isHovered.current) {
          timerRef.current = setInterval(next, autoplayMs);
        }
      }, 5000);
    },
    [active, next, autoplayMs, totalSlides],
  );

  return {
    active,
    handlePrev,
    handleNext,
    handleDot,
    handleMouseEnter,
    handleMouseLeave,
  };
}

// ── nav arrow ────────────────────────────────────────────────────────
const NavArrow = ({
  direction,
  onClick,
  label,
  disabled = false,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
  disabled?: boolean;
}) => (
  <button
    onClick={onClick}
    aria-label={label}
    disabled={disabled}
    className={`absolute ${
      direction === "prev" ? "right-4" : "left-4"
    } top-1/2 -translate-y-1/2 z-20 transition-all duration-300 ${
      disabled
        ? "opacity-30 cursor-not-allowed"
        : "hover:opacity-80 hover:scale-110"
    }`}
    style={{
      width: 40,
      height: 40,
      borderRadius: "50%",
      background:
        "linear-gradient(160deg, rgba(96,46,160,0.85), rgba(43,18,90,0.9))",
      border: "1px solid rgba(231,193,111,0.5)",
      boxShadow: "0 0 16px rgba(120,60,190,0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backdropFilter: "blur(4px)",
    }}
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#F5D79C"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "prev" ? (
        <polyline points="9 18 15 12 9 6" />
      ) : (
        <polyline points="15 18 9 12 15 6" />
      )}
    </svg>
  </button>
);

// ── dots ─────────────────────────────────────────────────────────────
const Dots = ({
  count,
  active,
  onDot,
}: {
  count: number;
  active: number;
  onDot: (i: number) => void;
}) => {
  if (count <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDot(i)}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i === active
              ? "w-6 bg-gradient-to-r from-[#FECB7D] to-[#f0d090] shadow-lg"
              : "w-1.5 bg-[rgba(231,193,111,0.25)] hover:bg-[rgba(231,193,111,0.5)]"
          }`}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  );
};

// ── Fade transition wrapper ──────────────────────────────────────────
const FadeTransition = ({
  children,
  isActive,
}: {
  children: React.ReactNode;
  isActive: boolean;
}) => {
  return (
    <div
      className={`carousel-slide ${isActive ? "active" : "inactive"}`}
      style={{
        transition:
          "opacity 0.6s ease, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        opacity: isActive ? 1 : 0,
        transform: isActive
          ? "translateX(0) scale(1)"
          : "translateX(30px) scale(0.97)",
        position: isActive ? "relative" : "absolute",
        top: 0,
        left: 0,
        right: 0,
        pointerEvents: isActive ? "auto" : "none",
        willChange: "transform, opacity",
        zIndex: isActive ? 2 : 1,
        width: "100%",
      }}
    >
      {children}
    </div>
  );
};

// ── main export ──────────────────────────────────────────────────────
export function ResponsiveCarousel<T>({
  items,
  renderItem,
  tabletItemsPerSlide = 2,
  desktopItemsPerSlide = 4,
  autoplayMs = 3500,
  className = "",
}: ResponsiveCarouselProps<T>) {
  const memoizedItems = useMemo(() => items, [items]);

  const effectiveTabletItems = Math.min(
    tabletItemsPerSlide,
    memoizedItems.length || 1,
  );
  const effectiveDesktopItems = Math.min(
    desktopItemsPerSlide,
    memoizedItems.length || 1,
  );

  if (memoizedItems.length === 0) {
    return null;
  }

  // Mobile: 1 item per slide
  const mobileSlides = memoizedItems.length;
  const mobileSlider = useSlider(mobileSlides, autoplayMs);

  // Tablet: N items per slide
  const tabletSlides = Math.ceil(memoizedItems.length / effectiveTabletItems);
  const tabletSlider = useSlider(tabletSlides, autoplayMs + 500);

  // Desktop: N items per slide
  const desktopSlides = Math.ceil(memoizedItems.length / effectiveDesktopItems);
  const desktopSlider = useSlider(desktopSlides, autoplayMs + 500);

  const memoizedRenderItem = useCallback(
    (item: T, index: number) => renderItem(item, index),
    [renderItem],
  );

  // Get items for current slide
  const getSlideItems = (activeIndex: number, itemsPerSlide: number) => {
    const start = activeIndex * itemsPerSlide;
    const result = [];
    for (let i = 0; i < Math.min(itemsPerSlide, memoizedItems.length); i++) {
      const index = (start + i) % memoizedItems.length;
      result.push(memoizedItems[index]);
    }
    return result;
  };

  // Render slide content
  const renderSlideContent = (items: T[], activeIndex: number) => (
    <div
      className="carousel-grid"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${Math.min(items.length, 4)}, 1fr)`,
        gap: "18px",
        padding: "4px 0",
        width: "100%",
      }}
    >
      {items.map((item, i) => {
        const actualIndex =
          (activeIndex * items.length + i) % memoizedItems.length;
        return memoizedRenderItem(item, actualIndex);
      })}
    </div>
  );

  return (
    <>
      {/* Mobile — 1 item */}
      <div
        className={`md:hidden relative px-4 ${className}`}
        dir="rtl"
        onMouseEnter={mobileSlider.handleMouseEnter}
        onMouseLeave={mobileSlider.handleMouseLeave}
        onTouchStart={mobileSlider.handleMouseEnter}
        onTouchEnd={mobileSlider.handleMouseLeave}
      >
        <div
          className="carousel-track"
          style={{
            position: "relative",
            overflow: "visible",
            minHeight: "350px",
          }}
        >
          {memoizedItems.map((item, index) => {
            const isActive = index === mobileSlider.active;
            return (
              <div
                key={index}
                style={{
                  transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  opacity: isActive ? 1 : 0,
                  transform: isActive
                    ? "translateX(0) scale(1)"
                    : "translateX(30px) scale(0.95)",
                  position: isActive ? "relative" : "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  pointerEvents: isActive ? "auto" : "none",
                  willChange: "transform, opacity",
                  zIndex: isActive ? 2 : 1,
                  width: "100%",
                }}
              >
                {memoizedRenderItem(item, index)}
              </div>
            );
          })}
        </div>

        <NavArrow
          direction="prev"
          onClick={mobileSlider.handlePrev}
          label="قبلی"
          disabled={mobileSlides <= 1}
        />
        <NavArrow
          direction="next"
          onClick={mobileSlider.handleNext}
          label="بعدی"
          disabled={mobileSlides <= 1}
        />
        <Dots
          count={mobileSlides}
          active={mobileSlider.active}
          onDot={mobileSlider.handleDot}
        />
      </div>

      {/* Tablet — N items per slide */}
      <div
        className={`hidden md:block lg:hidden relative px-4 ${className}`}
        dir="rtl"
        onMouseEnter={tabletSlider.handleMouseEnter}
        onMouseLeave={tabletSlider.handleMouseLeave}
        onTouchStart={tabletSlider.handleMouseEnter}
        onTouchEnd={tabletSlider.handleMouseLeave}
      >
        <div
          className="carousel-track"
          style={{
            position: "relative",
            overflow: "visible",
            minHeight: "350px",
          }}
        >
          {Array.from({ length: tabletSlides }).map((_, slideIndex) => {
            const isActive = slideIndex === tabletSlider.active;
            const slideItems = getSlideItems(slideIndex, effectiveTabletItems);
            return (
              <div
                key={slideIndex}
                style={{
                  transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  opacity: isActive ? 1 : 0,
                  transform: isActive
                    ? "translateX(0) scale(1)"
                    : "translateX(30px) scale(0.95)",
                  position: isActive ? "relative" : "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  pointerEvents: isActive ? "auto" : "none",
                  willChange: "transform, opacity",
                  zIndex: isActive ? 2 : 1,
                  width: "100%",
                }}
              >
                {renderSlideContent(slideItems, slideIndex)}
              </div>
            );
          })}
        </div>

        <NavArrow
          direction="prev"
          onClick={tabletSlider.handlePrev}
          label="قبلی"
          disabled={tabletSlides <= 1}
        />
        <NavArrow
          direction="next"
          onClick={tabletSlider.handleNext}
          label="بعدی"
          disabled={tabletSlides <= 1}
        />
        <Dots
          count={tabletSlides}
          active={tabletSlider.active}
          onDot={tabletSlider.handleDot}
        />
      </div>

      {/* Desktop — N items per slide */}
      <div
        className={`hidden lg:block relative px-4 lg:px-8 mx-auto ${className}`}
        style={{ maxWidth: 1200 }}
        dir="rtl"
        onMouseEnter={desktopSlider.handleMouseEnter}
        onMouseLeave={desktopSlider.handleMouseLeave}
        onTouchStart={desktopSlider.handleMouseEnter}
        onTouchEnd={desktopSlider.handleMouseLeave}
      >
        <div
          className="carousel-track"
          style={{
            position: "relative",
            overflow: "visible",
            minHeight: "380px",
          }}
        >
          {Array.from({ length: desktopSlides }).map((_, slideIndex) => {
            const isActive = slideIndex === desktopSlider.active;
            const slideItems = getSlideItems(slideIndex, effectiveDesktopItems);
            return (
              <div
                key={slideIndex}
                style={{
                  transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  opacity: isActive ? 1 : 0,
                  transform: isActive
                    ? "translateX(0) scale(1)"
                    : "translateX(30px) scale(0.95)",
                  position: isActive ? "relative" : "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  pointerEvents: isActive ? "auto" : "none",
                  willChange: "transform, opacity",
                  zIndex: isActive ? 2 : 1,
                  width: "100%",
                }}
              >
                {renderSlideContent(slideItems, slideIndex)}
              </div>
            );
          })}
        </div>

        <NavArrow
          direction="prev"
          onClick={desktopSlider.handlePrev}
          label="قبلی"
          disabled={desktopSlides <= 1}
        />
        <NavArrow
          direction="next"
          onClick={desktopSlider.handleNext}
          label="بعدی"
          disabled={desktopSlides <= 1}
        />
        <Dots
          count={desktopSlides}
          active={desktopSlider.active}
          onDot={desktopSlider.handleDot}
        />
      </div>

      <style jsx>{`
        .carousel-track {
          position: relative;
          overflow: visible !important;
        }

        .carousel-grid {
          display: grid;
          gap: 18px;
          padding: 4px 0;
          width: 100%;
        }

        /* Mobile grid */
        @media (max-width: 767px) {
          .carousel-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Tablet grid */
        @media (min-width: 768px) and (max-width: 1023px) {
          .carousel-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Desktop grid */
        @media (min-width: 1024px) {
          .carousel-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </>
  );
}
