"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import type { CategoryHandle } from "@/types/product";
import { useProducts } from "@/hooks/useProducts";

interface ProductGridProps {
  category: CategoryHandle;
  initialOffset?: number;
  itemsPerPage?: number;
  filter?: (product: any) => boolean;
  renderCard: (
    product: any,
    onAddToCart: (id: string) => void,
  ) => React.ReactNode;
  onAddToCart?: (id: string) => void;
  cols?: {
    mobile?: 1 | 2 | 3 | 4;
    tablet?: 1 | 2 | 3 | 4;
    desktop?: 1 | 2 | 3 | 4;
  };
  gap?: "gap-2" | "gap-3" | "gap-4" | "gap-6" | "gap-8";
  className?: string;
  loadMore?: boolean;
  loadMoreLabel?: string;
  loadingLabel?: string;
  noMoreLabel?: string;
  emptyMessage?: string;
  onProductsLoaded?: (products: any[]) => void;
  onError?: (error: Error) => void;
  filterParams?: { property?: string };
}

export default function ProductGrid({
  category,
  initialOffset = 0,
  itemsPerPage = 12,
  filter,
  filterParams,
  renderCard,
  onAddToCart,
  cols = { mobile: 2, tablet: 2, desktop: 4 },
  gap = "gap-6",
  className = "",
  loadMore = true,
  loadMoreLabel = "Load More",
  loadingLabel = "Loading...",
  noMoreLabel = "No more products to load",
  emptyMessage = "No products found",
  onProductsLoaded,
  onError,
}: ProductGridProps) {
  const [currentOffset, setCurrentOffset] = useState(initialOffset);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  // Fetch products for current offset
  const { data, isLoading, error } = useProducts({
    category,
    limit: itemsPerPage,
    offset: currentOffset,
    ...(filterParams ? { property: filterParams.property } : {} ),
  });

  // Handle data updates
  useEffect(() => {
    if (!data) return;

    console.log("📊 Data received in ProductGrid:", data);

    // Your API returns: { products: [...], count: number }
    const newProducts = data.products || [];
    const total = data.count || 0;

    console.log("📊 Extracted:", { productsCount: newProducts.length, total   ...(filterParams ? { property: filterParams.property } : {} ),
  });

    setTotalCount(total);

    // Apply filter if provided
    const filteredProducts = filter ? newProducts.filter(filter) : newProducts;

    if (currentOffset === initialOffset) {
      // Initial load - replace all products
      setAllProducts(filteredProducts);
      setIsInitialLoading(false);

      // Check if there are more products to load
      const hasMoreProducts = filteredProducts.length < total;
      setHasMore(hasMoreProducts);

      if (onProductsLoaded) {
        onProductsLoaded(filteredProducts);
      }
    } else {
      // Load more - append only products that aren't already loaded
      // (dedup by ID prevents duplicates from React Query returning stale data
      //  when offset changes before the new fetch completes)
      setAllProducts((prev) => {
        const existingIds = new Set(prev.map((p: any) => p.id));
        const uniqueNewProducts = filteredProducts.filter(
          (p: any) => !existingIds.has(p.id),
        );
        const updatedProducts = [...prev, ...uniqueNewProducts];
        const hasMoreProducts = updatedProducts.length < total;
        setHasMore(hasMoreProducts);
        return updatedProducts;
        ...(filterParams ? { property: filterParams.property } : {} ),
  });
      setIsLoadingMore(false);
    }
  }, [data, currentOffset, initialOffset, filter,
  filterParams, onProductsLoaded]);

  // Handle errors
  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  // Load more function
  const handleLoadMore = useCallback(() => {
    if (isLoadingMore || !hasMore || isLoading || isInitialLoading) return;

    setIsLoadingMore(true);
    setCurrentOffset((prev) => prev + itemsPerPage);
  }, [isLoadingMore, hasMore, isLoading, isInitialLoading, itemsPerPage]);

  // Reset grid (useful when category changes)
  const resetGrid = useCallback(() => {
    setCurrentOffset(initialOffset);
    setAllProducts([]);
    setIsInitialLoading(true);
    setHasMore(true);
    setTotalCount(0);
  }, [initialOffset]);

  // Map column count to Tailwind classes
  const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  const mobileCol = colClasses[cols.mobile || 2];
  const tabletCol = colClasses[cols.tablet || cols.mobile || 2];
  const desktopCol = colClasses[cols.desktop || 4];

  // Loading skeleton
  if (isInitialLoading) {
    const skeletonCount = Math.min(itemsPerPage, 8);
    return (
      <div
        className={`grid ${mobileCol} sm:${tabletCol} lg:${desktopCol} ${gap} ${className}`}
      >
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse"
            style={{
              height: "clamp(240px, 75vw, 460px)",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "8px",
            }}
          />
        ))}
      </div>
    );
  }

  // Empty state
  if (allProducts.length === 0 && !isInitialLoading) {
    return (
      <div className="w-full text-center py-12">
        <p className="text-white/60 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  const showLoadMore =
    loadMore && hasMore && allProducts.length > 0 && !isInitialLoading;

  return (
    <div className="w-full">
      {/* Products Grid */}
      <div
        className={`grid ${mobileCol} sm:${tabletCol} lg:${desktopCol} ${gap} ${className}`}
      >
        {allProducts.map((product, index) => (
          <motion.div
            key={`${product.id}-${index}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex justify-center w-full"
            style={{ minWidth: 0 }}
          >
            <div style={{ width: "100%", minWidth: 0 }}>
              {renderCard(product, onAddToCart || (() => {}))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      {showLoadMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-[#d4af64] to-[#f3dca0] text-black font-medium hover:shadow-lg hover:shadow-[#d4af64]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingMore ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {loadingLabel}
              </span>
            ) : (
              loadMoreLabel
            )}
          </button>
        </div>
      )}

      {/* No more products message */}
      {loadMore && !hasMore && allProducts.length > 0 && !isInitialLoading && (
        <div className="text-center text-white/40 mt-8 text-sm">
          {noMoreLabel}
        </div>
      )}

      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === "development" && (
        <div className="text-xs text-white/20 text-center mt-4 font-mono">
          Loaded: {allProducts.length} / Total: {totalCount} | Has More:{" "}
          {hasMore ? "✅ Yes" : "❌ No"} | Offset: {currentOffset} | Items:{" "}
          {itemsPerPage}
        </div>
      )}
    </div>
  );
}

