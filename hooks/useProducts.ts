"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts, getProduct, getCategories } from "@/lib/api";

export function useProducts(params?: {
  category?: string;
  limit?: number;
  offset?: number;
  page?: number; // Add page support
}) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () =>
      getProducts({
        category: params?.category,
        limit: params?.limit || 12,
        offset: params?.offset,
        page: params?.page, // Pass page through
      }),
    staleTime: 30_000,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: Boolean(id),
    staleTime: 30_000,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 30_000,
  });
}
