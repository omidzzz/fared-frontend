import type { Cart } from "@/types/product";
import type { Category } from "@/types/category";
import type { Order } from "@/types/order";
import type { EditorialPost, ForumPost, ForumTopic, ForumReply } from "@/types/content";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/+$/, "") ?? "";

export interface CatalogProduct {
  id: string;
  slug: string;
  name: string;
  nameFA: string;
  description: string;
  descriptionFA: string;
  price: number;
  currency?: string;
  comparePrice?: number;
  discountPercent?: number;
  stock?: number;
  isInStock?: boolean;
  image: string;
  images?: string[];
  category: string;
  categoryName?: string;
  duration?: string;
  lessons?: number;
  level?: string;
  instructor?: { id: string; nameFA: string; avatar?: string | null };
  tags?: string[];
  heroImage?: string | null;
  isFree?: boolean;
  durationWeeks?: number;
  certificate?: boolean;
  language?: string;
  [key: string]: unknown;
}

function buildUrl(endpoint: string): string {
  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;
  if (!BASE_URL) return normalizedEndpoint;

  if (BASE_URL.endsWith("/api")) {
    return `${BASE_URL}${
      normalizedEndpoint.startsWith("/api")
        ? normalizedEndpoint.replace(/^\/api/, "")
        : normalizedEndpoint
    }`;
  }

  return `${BASE_URL}${
    normalizedEndpoint.startsWith("/api")
      ? normalizedEndpoint
      : `/api${normalizedEndpoint}`
  }`;
}

function normalizeProduct(product: Record<string, unknown>): CatalogProduct {
  const price = Number(
    (product.price as number | undefined) ??
      (product.basePrice as number | undefined) ??
      (product.priceValue as number | undefined) ??
      0,
  );

  const currency =
    (product.currency as string | undefined) ??
    (product.currencyCode as string | undefined) ??
    (product.currencyType as string | undefined) ??
    "USD";

  const rawImages = Array.isArray(product.images) ? product.images : [];
  const firstImage =
    (
      rawImages[0] as
        | { url?: string; path?: string; src?: string }
        | string
        | undefined
    )?.toString() ??
    (
      product.image as
        | { url?: string; path?: string; src?: string }
        | string
        | undefined
    )?.toString() ??
    "";

  const imageUrl =
    typeof rawImages[0] === "object" && rawImages[0] !== null
      ? (rawImages[0] as { url?: string; path?: string; src?: string }).url ??
        (rawImages[0] as { url?: string; path?: string; src?: string }).path ??
        (rawImages[0] as { url?: string; path?: string; src?: string }).src ??
        ""
      : typeof product.image === "object" && product.image !== null
      ? (product.image as { url?: string; path?: string; src?: string }).url ??
        (product.image as { url?: string; path?: string; src?: string }).path ??
        (product.image as { url?: string; path?: string; src?: string }).src ??
        ""
      : (product.image as string | undefined) ?? "";

  const comparePrice = Number(
    (product.comparePrice as number | undefined) ??
      (product.originalPrice as number | undefined) ??
      (product.compareAtPrice as number | undefined) ??
      0,
  );

  const discountPercent =
    comparePrice > 0 && price > 0
      ? Math.round(((comparePrice - price) / comparePrice) * 100)
      : 0;

  const stock = Number(
    (product.stock as number | undefined) ??
      (product.quantity as number | undefined) ??
      (product.inventory as number | undefined) ??
      0,
  );

  return {
    id: String(product.id ?? ""),
    slug: String(product.slug ?? product.id ?? ""),
    name: String(product.nameEN ?? product.name ?? product.title ?? ""),
    nameFA: String(product.nameFA ?? product.name ?? product.title ?? ""),
    description: String(product.descriptionEN ?? product.description ?? ""),
    descriptionFA: String(product.descriptionFA ?? product.description ?? ""),
    price,
    currency,
    comparePrice: comparePrice > 0 ? comparePrice : undefined,
    discountPercent: discountPercent > 0 ? discountPercent : undefined,
    stock,
    isInStock: stock > 0,
    image: imageUrl,
    images: rawImages
      .map((img: Record<string, unknown>) =>
        typeof img === "object" && img !== null
          ? ((img.url ?? img.path ?? img.src ?? "") as string)
          : String(img),
      )
      .filter(Boolean),
    category: String(
      (product.category as { slug?: string } | undefined)?.slug ?? "",
    ),
    categoryName: String(
      (
        product.category as
          | { nameFA?: string; nameEN?: string; name?: string }
          | undefined
      )?.nameFA ??
        (
          product.category as
            | { nameFA?: string; nameEN?: string; name?: string }
            | undefined
        )?.nameEN ??
        (
          product.category as
            | { nameFA?: string; nameEN?: string; name?: string }
            | undefined
        )?.name ??
        "",
    ),
    duration: String(product.duration ?? ""),
    lessons: Number(product.lessons ?? 0),
    level: String(product.level ?? ""),
    instructor: product.instructor as
      | { id: string; nameFA: string; avatar?: string | null }
      | undefined,
    tags: product.tags as string[] | undefined,
    heroImage: product.heroImage as string | null | undefined,
    isFree: Boolean(product.isFree ?? false),
    durationWeeks: Number(product.durationWeeks ?? 0),
    certificate: Boolean(product.certificate ?? false),
    language: String(product.language ?? ""),
    variants: product.variants as
      | { id: string; label: string; stock: number }[]
      | undefined,
    colorOptions: product.colorOptions as
      | { id: string; hex: string; nameFA: string }[]
      | undefined,
    ...Object.fromEntries(
      Object.entries(product as Record<string, unknown>).filter(
        ([key]) => key !== "category",
      ),
    ),
  };
}

async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("fared_token") : null;
  const res = await fetch(buildUrl(endpoint), {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message ?? "API request failed");
  }

  const payload = await res.json().catch(() => null);
  if (payload && typeof payload === "object" && "success" in payload) {
    const envelope = payload as { success: boolean; data?: T; error?: string };
    if (!envelope.success) {
      throw new Error(envelope.error ?? "API request failed");
    }
    return envelope.data as T;
  }

  return payload as T;
}

async function apiFetchPaginated<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<{
  data: T;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("fared_token") : null;
  const res = await fetch(buildUrl(endpoint), {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message ?? "API request failed");
  }

  const payload = await res.json().catch(() => null);
  if (payload && typeof payload === "object" && "success" in payload) {
    const envelope = payload as {
      success: boolean;
      data?: T;
      pagination?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
      error?: string;
    };
    if (!envelope.success) {
      throw new Error(envelope.error ?? "API request failed");
    }
    return {
      data: envelope.data as T,
      pagination: envelope.pagination || {
        total: 0,
        page: 1,
        limit: 0,
        totalPages: 0,
      },
    };
  }

  return {
    data: payload as T,
    pagination: { total: 0, page: 1, limit: 0, totalPages: 0 },
  };
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export interface AuthResponse {
  user: {
    id: string;
    nameFA: string | null;
    name: string | null;
    phone: string | null;
    email: string | null;
    avatar: string | null;
    role: string;
    isVerified: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
  refreshToken: string;
}

export async function loginWithEmail(email: string, password: string): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function registerWithEmail(data: {
  email: string;
  password: string;
  name: string;
  nameFA?: string;
}): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getMe(): Promise<AuthResponse["user"]> {
  return apiFetch<AuthResponse["user"]>("/auth/me");
}

export async function refreshAccessToken(refreshToken: string): Promise<{ accessToken: string }> {
  return apiFetch<{ accessToken: string }>("/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });
}

// ── Orders ────────────────────────────────────────────────────────────────────

export interface BackendOrder {
  id: string;
  orderNumber: string;
  userId: string;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  subtotal: number;
  shippingAmount: number;
  discountAmount: number;
  total: number;
  currency: string;
  addressId: string | null;
  trackingCode: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  items: {
    id: string;
    productType: string;
    refId: string;
    nameFA: string;
    nameEN: string | null;
    price: number;
    quantity: number;
    variant: string | null;
    image: string | null;
  }[];
  address?: {
    id: string;
    fullName: string;
    phone: string;
    country: string;
    city: string;
    address1: string;
    address2: string | null;
    postalCode: string;
  } | null;
}

export async function getOrders(): Promise<BackendOrder[]> {
  return apiFetch<BackendOrder[]>("/orders");
}

// ── Products ──────────────────────────────────────────────────────────────────

async function getProductsFromBackend(params?: {
  category?: string;
  limit?: number;
  offset?: number;
}): Promise<{ products: CatalogProduct[]; count: number }> {
  const query = new URLSearchParams();
  if (params?.category) query.set("category", params.category);
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.offset !== undefined && params?.limit) {
    const page = Math.floor(params.offset / params.limit) + 1;
    query.set("page", String(page));
  }
  const qs = query.toString() ? `?${query.toString()}` : "";

  try {
    const response = await apiFetchPaginated<Record<string, unknown>[]>(
      `/products${qs}`,
    );

    return {
      products: (response.data || []).map(normalizeProduct),
      count: response.pagination?.total || 0,
    };
  } catch {
    return { products: [], count: 0 };
  }
}

export async function getProducts(params?: {
  category?: string;
  limit?: number;
  offset?: number;
  page?: number;
}): Promise<{ products: CatalogProduct[]; count: number }> {
  if (params?.page !== undefined) {
    const limit = params?.limit || 12;
    const offset = (params.page - 1) * limit;
    return await getProductsFromBackend({ category: params.category, limit, offset });
  }
  return await getProductsFromBackend(params);
}

export async function getProduct(id: string): Promise<CatalogProduct> {
  const response = await apiFetch<Record<string, unknown>>(`/products/${id}`);
  return normalizeProduct(response);
}

export async function getCategories(): Promise<Category[]> {
  const categories = await apiFetch<Array<Record<string, unknown>>>("/categories");
  return categories.map((category) => ({
    id: String(category.id ?? ""),
    name: String(category.nameEN ?? category.name ?? ""),
    handle: String((category.slug as string | undefined) ?? "").replace(/\s+/g, "-") as Category["handle"],
    description: String(category.descriptionEN ?? category.description ?? ""),
    metadata: category as Record<string, unknown>,
  }));
}

// ── Cart ──────────────────────────────────────────────────────────────────────

export function createCart(): Promise<Cart> {
  return apiFetch<{ cart: Cart }>("/store/carts", { method: "POST", body: "{}" }).then((r) => r.cart);
}

export function getCart(id: string): Promise<Cart> {
  return apiFetch<{ cart: Cart }>(`/store/carts/${id}`).then((r) => r.cart);
}

export function addToCart(cartId: string, variantId: string, quantity: number): Promise<Cart> {
  return apiFetch<{ cart: Cart }>(`/store/carts/${cartId}/line-items`, {
    method: "POST",
    body: JSON.stringify({ variant_id: variantId, quantity }),
  }).then((r) => r.cart);
}

export function removeFromCart(cartId: string, lineItemId: string): Promise<Cart> {
  return apiFetch<{ cart: Cart }>(`/store/carts/${cartId}/line-items/${lineItemId}`, {
    method: "DELETE",
  }).then((r) => r.cart);
}

export function updateCartItem(cartId: string, lineItemId: string, quantity: number): Promise<Cart> {
  return apiFetch<{ cart: Cart }>(`/store/carts/${cartId}/line-items/${lineItemId}`, {
    method: "POST",
    body: JSON.stringify({ quantity }),
  }).then((r) => r.cart);
}

// ── Editorial ─────────────────────────────────────────────────────────────────

export function getEditorialPosts(category?: string): Promise<EditorialPost[]> {
  const qs = category ? `?category=${category}` : "";
  return apiFetch<{ posts: EditorialPost[] }>(`/store/editorial${qs}`).then((r) => r.posts);
}

export function getEditorialPost(slug: string): Promise<EditorialPost> {
  return apiFetch<{ post: EditorialPost }>(`/store/editorial/${slug}`).then((r) => r.post);
}

// ── Forum ─────────────────────────────────────────────────────────────────────

export async function getForumTopics(page = 1, limit = 20): Promise<{ topics: ForumTopic[]; total: number }> {
  const response = await apiFetchPaginated<ForumTopic[]>(`/forum/topics?page=${page}&limit=${limit}`);
  return { topics: response.data, total: response.pagination.total };
}

export async function getForumTopicBySlug(slug: string): Promise<ForumTopic> {
  return apiFetch<ForumTopic>(`/forum/topics/${slug}`);
}

export async function createForumTopic(data: { titleFA: string; bodyFA: string; category: string; tags?: string[] }): Promise<ForumTopic> {
  return apiFetch<ForumTopic>("/forum/topics", { method: "POST", body: JSON.stringify(data) });
}

export async function createForumReply(topicId: string, data: { bodyFA: string }): Promise<ForumReply> {
  return apiFetch<ForumReply>(`/forum/topics/${topicId}/replies`, { method: "POST", body: JSON.stringify(data) });
}

// ── Category-specific product fetchers ──

export async function getStones(): Promise<CatalogProduct[]> {
  const response = await apiFetch<Record<string, unknown>[] | { products: Record<string, unknown>[]; total?: number; page?: number; limit?: number; totalPages?: number }>("/stones");
  // Handle both array and object with products key
  const products = Array.isArray(response) ? response : (response.products || []);
  return products.map(normalizeProduct);
}

export async function getStoneBySlug(slug: string): Promise<CatalogProduct> {
  const product = await apiFetch<Record<string, unknown>>(`/stones/${slug}`);
  return normalizeProduct(product);
}

export async function getCandles(): Promise<CatalogProduct[]> {
  const response = await apiFetch<Record<string, unknown>[] | { products: Record<string, unknown>[] }>("/candles");
  // Handle both array and object with products key
  const products = Array.isArray(response) ? response : (response.products || []);
  return products.map(normalizeProduct);
}

export async function getCandleBySlug(slug: string): Promise<CatalogProduct> {
  const product = await apiFetch<Record<string, unknown>>(`/candles/${slug}`);
  return normalizeProduct(product);
}

export async function getClothes(): Promise<CatalogProduct[]> {
  const response = await apiFetch<{ products: Record<string, unknown>[]; total?: number; pagination?: any }>("/clothes");
  return (response.products || []).map(normalizeProduct);
}

export async function getClothBySlug(slug: string): Promise<CatalogProduct> {
  const product = await apiFetch<Record<string, unknown>>(`/clothes/${slug}`);
  return normalizeProduct(product);
}

export async function getAccessories(): Promise<CatalogProduct[]> {
  const response = await apiFetch<Record<string, unknown>[] | { products: Record<string, unknown>[] }>("/accessories");
  // Handle both array and object with products key
  const products = Array.isArray(response) ? response : (response.products || []);
  return products.map(normalizeProduct);
}

export async function getAccessoryBySlug(slug: string): Promise<CatalogProduct> {
  const product = await apiFetch<Record<string, unknown>>(`/accessories/${slug}`);
  return normalizeProduct(product);
}

export async function getCourses(): Promise<CatalogProduct[]> {
  const response = await apiFetch<Record<string, unknown>[]>("/courses");
  return (response || []).map(normalizeProduct);
}

export async function getCourseBySlug(slug: string): Promise<CatalogProduct> {
  const product = await apiFetch<Record<string, unknown>>(`/courses/${slug}`);
  return normalizeProduct(product);
}

// ── Editorial / Blog ──

export interface BlogArticle {
  id: string;
  slug: string;
  titleFA: string;
  titleEN?: string;
  excerptFA: string;
  bodyFA: string;
  authorFA: string;
  categoryFA: string;
  image?: string;
  readMinutes: number;
  isFeatured: boolean;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
}

export async function getArticles(): Promise<BlogArticle[]> {
  const articles = await apiFetch<Record<string, unknown>[]>("/editorial/articles");
  return articles.map((a) => ({
    id: String(a.id ?? ""),
    slug: String(a.slug ?? ""),
    titleFA: String(a.titleFA ?? ""),
    titleEN: String(a.titleEN ?? ""),
    excerptFA: String(a.excerptFA ?? ""),
    bodyFA: String(a.bodyFA ?? ""),
    authorFA: String(a.authorFA ?? ""),
    categoryFA: String(a.categoryFA ?? ""),
    image: String(a.image ?? ""),
    readMinutes: Number(a.readMinutes ?? 5),
    isFeatured: Boolean(a.isFeatured ?? false),
    isPublished: Boolean(a.isPublished ?? false),
    publishedAt: a.publishedAt as string | undefined,
    createdAt: String(a.createdAt ?? ""),
  }));
}

export async function getArticleBySlug(slug: string): Promise<BlogArticle> {
  const article = await apiFetch<Record<string, unknown>>(`/editorial/articles/${slug}`);
  return {
    id: String(article.id ?? ""),
    slug: String(article.slug ?? ""),
    titleFA: String(article.titleFA ?? ""),
    titleEN: String(article.titleEN ?? ""),
    excerptFA: String(article.excerptFA ?? ""),
    bodyFA: String(article.bodyFA ?? ""),
    authorFA: String(article.authorFA ?? ""),
    categoryFA: String(article.categoryFA ?? ""),
    image: String(article.image ?? ""),
    readMinutes: Number(article.readMinutes ?? 5),
    isFeatured: Boolean(article.isFeatured ?? false),
    isPublished: Boolean(article.isPublished ?? false),
    publishedAt: article.publishedAt as string | undefined,
    createdAt: String(article.createdAt ?? ""),
  };
}

// ── Tours ──

export interface Tour {
  id: string;
  slug: string;
  destination: string;
  titleFA: string;
  titleEN?: string;
  descriptionFA: string;
  descriptionEN?: string;
  highlightsFA: string[];
  highlightsEN: string[];
  dateRange: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  price: number;
  currency: string;
  spotsTotal: number;
  spotsLeft: number;
  heroImage?: string;
  images: { id: string; url: string; sortOrder: number }[];
  includedFA: string[];
  notIncludedFA: string[];
  itinerary: { id: string; day: number; titleFA: string; descriptionFA: string }[];
  instructor: string;
  level: string;
  isActive: boolean;
  isFeatured: boolean;
  categoryId: string;
  category: { id: string; slug: string; nameFA: string; nameEN?: string };
  enquiriesCount?: number;
  createdAt: string;
  updatedAt: string;
}

export async function getTours(): Promise<Tour[]> {
  const tours = await apiFetch<Record<string, unknown>[]>("/tours");
  return tours.map((tour) => ({
    id: String(tour.id ?? ""),
    slug: String(tour.slug ?? ""),
    destination: String(tour.destination ?? ""),
    titleFA: String(tour.titleFA ?? ""),
    titleEN: tour.titleEN ? String(tour.titleEN) : undefined,
    descriptionFA: String(tour.descriptionFA ?? ""),
    descriptionEN: tour.descriptionEN ? String(tour.descriptionEN) : undefined,
    highlightsFA: Array.isArray(tour.highlightsFA) ? tour.highlightsFA.map(String) : [],
    highlightsEN: Array.isArray(tour.highlightsEN) ? tour.highlightsEN.map(String) : [],
    dateRange: String(tour.dateRange ?? ""),
    startDate: String(tour.startDate ?? ""),
    endDate: String(tour.endDate ?? ""),
    durationDays: Number(tour.durationDays ?? 0),
    price: Number(tour.price ?? 0),
    currency: String(tour.currency ?? "USD"),
    spotsTotal: Number(tour.spotsTotal ?? 0),
    spotsLeft: Number(tour.spotsLeft ?? 0),
    heroImage: tour.heroImage ? String(tour.heroImage) : undefined,
    images: Array.isArray(tour.images)
      ? tour.images.map((img: Record<string, unknown>) => ({
          id: String(img.id ?? ""),
          url: String(img.url ?? ""),
          sortOrder: Number(img.sortOrder ?? 0),
        }))
      : [],
    includedFA: Array.isArray(tour.includedFA) ? tour.includedFA.map(String) : [],
    notIncludedFA: Array.isArray(tour.notIncludedFA) ? tour.notIncludedFA.map(String) : [],
    itinerary: Array.isArray(tour.itinerary)
      ? tour.itinerary.map((day: Record<string, unknown>) => ({
          id: String(day.id ?? ""),
          day: Number(day.day ?? 0),
          titleFA: String(day.titleFA ?? ""),
          descriptionFA: String(day.descriptionFA ?? ""),
        }))
      : [],
    instructor: String(tour.instructor ?? ""),
    level: String(tour.level ?? "ALL_LEVELS"),
    isActive: Boolean(tour.isActive ?? true),
    isFeatured: Boolean(tour.isFeatured ?? false),
    categoryId: String(tour.categoryId ?? ""),
    category: tour.category
      ? {
          id: String((tour.category as Record<string, unknown>).id ?? ""),
          slug: String((tour.category as Record<string, unknown>).slug ?? ""),
          nameFA: String((tour.category as Record<string, unknown>).nameFA ?? ""),
          nameEN: (tour.category as Record<string, unknown>).nameEN ? String((tour.category as Record<string, unknown>).nameEN) : undefined,
        }
      : { id: "", slug: "", nameFA: "" },
    enquiriesCount: (tour._count as Record<string, number> | undefined)?.enquiries
      ? Number((tour._count as Record<string, number>).enquiries)
      : undefined,
    createdAt: String(tour.createdAt ?? ""),
    updatedAt: String(tour.updatedAt ?? ""),
  }));
}

export async function getTourBySlug(slug: string): Promise<Tour> {
  const tour = await apiFetch<Record<string, unknown>>(`/tours/${slug}`);
  return {
    id: String(tour.id ?? ""),
    slug: String(tour.slug ?? ""),
    destination: String(tour.destination ?? ""),
    titleFA: String(tour.titleFA ?? ""),
    titleEN: tour.titleEN ? String(tour.titleEN) : undefined,
    descriptionFA: String(tour.descriptionFA ?? ""),
    descriptionEN: tour.descriptionEN ? String(tour.descriptionEN) : undefined,
    highlightsFA: Array.isArray(tour.highlightsFA) ? tour.highlightsFA.map(String) : [],
    highlightsEN: Array.isArray(tour.highlightsEN) ? tour.highlightsEN.map(String) : [],
    dateRange: String(tour.dateRange ?? ""),
    startDate: String(tour.startDate ?? ""),
    endDate: String(tour.endDate ?? ""),
    durationDays: Number(tour.durationDays ?? 0),
    price: Number(tour.price ?? 0),
    currency: String(tour.currency ?? "USD"),
    spotsTotal: Number(tour.spotsTotal ?? 0),
    spotsLeft: Number(tour.spotsLeft ?? 0),
    heroImage: tour.heroImage ? String(tour.heroImage) : undefined,
    images: Array.isArray(tour.images)
      ? tour.images.map((img: Record<string, unknown>) => ({
          id: String(img.id ?? ""),
          url: String(img.url ?? ""),
          sortOrder: Number(img.sortOrder ?? 0),
        }))
      : [],
    includedFA: Array.isArray(tour.includedFA) ? tour.includedFA.map(String) : [],
    notIncludedFA: Array.isArray(tour.notIncludedFA) ? tour.notIncludedFA.map(String) : [],
    itinerary: Array.isArray(tour.itinerary)
      ? tour.itinerary.map((day: Record<string, unknown>) => ({
          id: String(day.id ?? ""),
          day: Number(day.day ?? 0),
          titleFA: String(day.titleFA ?? ""),
          descriptionFA: String(day.descriptionFA ?? ""),
        }))
      : [],
    instructor: String(tour.instructor ?? ""),
    level: String(tour.level ?? "ALL_LEVELS"),
    isActive: Boolean(tour.isActive ?? true),
    isFeatured: Boolean(tour.isFeatured ?? false),
    categoryId: String(tour.categoryId ?? ""),
    category: tour.category
      ? {
          id: String((tour.category as Record<string, unknown>).id ?? ""),
          slug: String((tour.category as Record<string, unknown>).slug ?? ""),
          nameFA: String((tour.category as Record<string, unknown>).nameFA ?? ""),
          nameEN: (tour.category as Record<string, unknown>).nameEN ? String((tour.category as Record<string, unknown>).nameEN) : undefined,
        }
      : { id: "", slug: "", nameFA: "" },
    enquiriesCount: (tour._count as Record<string, number> | undefined)?.enquiries
      ? Number((tour._count as Record<string, number>).enquiries)
      : undefined,
    createdAt: String(tour.createdAt ?? ""),
    updatedAt: String(tour.updatedAt ?? ""),
  };
}

// ── Tahrirye (تحریریه) ────────────────────────────────────────────────────────

export interface EducationalPost {
  id: string;
  slug: string;
  titleFA: string;
  titleEN?: string;
  categoryFA: string;
  categoryEN?: string;
  bodyFA: string;
  bodyEN?: string;
  excerptFA: string;
  image?: string;
  tagsFA: string[];
  readMinutes: number;
  isPublished: boolean;
  publishedAt?: string;
  authorId?: string;
  createdAt: string;
  updatedAt: string;
}

export async function getEducationalPosts(): Promise<EducationalPost[]> {
  const posts = await apiFetch<Record<string, unknown>[]>("/editorial/educational");
  return posts.map((post) => ({
    id: String(post.id ?? ""),
    slug: String(post.slug ?? ""),
    titleFA: String(post.titleFA ?? ""),
    titleEN: post.titleEN ? String(post.titleEN) : undefined,
    categoryFA: String(post.categoryFA ?? ""),
    categoryEN: post.categoryEN ? String(post.categoryEN) : undefined,
    bodyFA: String(post.bodyFA ?? ""),
    bodyEN: post.bodyEN ? String(post.bodyEN) : undefined,
    excerptFA: String(post.excerptFA ?? ""),
    image: post.image ? String(post.image) : undefined,
    tagsFA: Array.isArray(post.tagsFA) ? post.tagsFA.map(String) : [],
    readMinutes: Number(post.readMinutes ?? 5),
    isPublished: Boolean(post.isPublished ?? false),
    publishedAt: post.publishedAt as string | undefined,
    authorId: post.authorId as string | undefined,
    createdAt: String(post.createdAt ?? ""),
    updatedAt: String(post.updatedAt ?? ""),
  }));
}

export async function getEducationalPostBySlug(slug: string): Promise<EducationalPost> {
  const post = await apiFetch<Record<string, unknown>>(`/editorial/educational/${slug}`);
  return {
    id: String(post.id ?? ""),
    slug: String(post.slug ?? ""),
    titleFA: String(post.titleFA ?? ""),
    titleEN: post.titleEN ? String(post.titleEN) : undefined,
    categoryFA: String(post.categoryFA ?? ""),
    categoryEN: post.categoryEN ? String(post.categoryEN) : undefined,
    bodyFA: String(post.bodyFA ?? ""),
    bodyEN: post.bodyEN ? String(post.bodyEN) : undefined,
    excerptFA: String(post.excerptFA ?? ""),
    image: post.image ? String(post.image) : undefined,
    tagsFA: Array.isArray(post.tagsFA) ? post.tagsFA.map(String) : [],
    readMinutes: Number(post.readMinutes ?? 5),
    isPublished: Boolean(post.isPublished ?? false),
    publishedAt: post.publishedAt as string | undefined,
    authorId: post.authorId as string | undefined,
    createdAt: String(post.createdAt ?? ""),
    updatedAt: String(post.updatedAt ?? ""),
  };
}

export interface Book {
  id: string;
  slug: string;
  titleFA: string;
  titleEN?: string;
  authorFA: string;
  authorEN?: string;
  descriptionFA: string;
  categoryFA: string;
  coverImage?: string;
  year?: number;
  pages?: number;
  rating: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function getBooks(): Promise<Book[]> {
  const books = await apiFetch<Record<string, unknown>[]>("/editorial/books");
  return books.map((book) => ({
    id: String(book.id ?? ""),
    slug: String(book.slug ?? ""),
    titleFA: String(book.titleFA ?? ""),
    titleEN: book.titleEN ? String(book.titleEN) : undefined,
    authorFA: String(book.authorFA ?? ""),
    authorEN: book.authorEN ? String(book.authorEN) : undefined,
    descriptionFA: String(book.descriptionFA ?? ""),
    categoryFA: String(book.categoryFA ?? ""),
    coverImage: book.coverImage ? String(book.coverImage) : undefined,
    year: book.year ? Number(book.year) : undefined,
    pages: book.pages ? Number(book.pages) : undefined,
    rating: Number(book.rating ?? 0),
    isPublished: Boolean(book.isPublished ?? false),
    createdAt: String(book.createdAt ?? ""),
    updatedAt: String(book.updatedAt ?? ""),
  }));
}

export async function getBookBySlug(slug: string): Promise<Book> {
  const book = await apiFetch<Record<string, unknown>>(`/editorial/books/${slug}`);
  return {
    id: String(book.id ?? ""),
    slug: String(book.slug ?? ""),
    titleFA: String(book.titleFA ?? ""),
    titleEN: book.titleEN ? String(book.titleEN) : undefined,
    authorFA: String(book.authorFA ?? ""),
    authorEN: book.authorEN ? String(book.authorEN) : undefined,
    descriptionFA: String(book.descriptionFA ?? ""),
    categoryFA: String(book.categoryFA ?? ""),
    coverImage: book.coverImage ? String(book.coverImage) : undefined,
    year: book.year ? Number(book.year) : undefined,
    pages: book.pages ? Number(book.pages) : undefined,
    rating: Number(book.rating ?? 0),
    isPublished: Boolean(book.isPublished ?? false),
    createdAt: String(book.createdAt ?? ""),
    updatedAt: String(book.updatedAt ?? ""),
  };
}

export interface Poem {
  id: string;
  slug: string;
  titleFA: string;
  poetFA: string;
  poetEN?: string;
  era?: string;
  eraFA?: string;
  category: string;
  categoryFA: string;
  linesFA: string[];
  theme: string[];
  backgroundGradient?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function getPoems(): Promise<Poem[]> {
  const poems = await apiFetch<Record<string, unknown>[]>("/editorial/poems");
  return poems.map((poem) => ({
    id: String(poem.id ?? ""),
    slug: String(poem.slug ?? ""),
    titleFA: String(poem.titleFA ?? ""),
    poetFA: String(poem.poetFA ?? ""),
    poetEN: poem.poetEN ? String(poem.poetEN) : undefined,
    era: poem.era ? String(poem.era) : undefined,
    eraFA: poem.eraFA ? String(poem.eraFA) : undefined,
    category: String(poem.category ?? ""),
    categoryFA: String(poem.categoryFA ?? ""),
    linesFA: Array.isArray(poem.linesFA) ? poem.linesFA.map(String) : [],
    theme: Array.isArray(poem.theme) ? poem.theme.map(String) : [],
    backgroundGradient: poem.backgroundGradient ? String(poem.backgroundGradient) : undefined,
    isPublished: Boolean(poem.isPublished ?? false),
    createdAt: String(poem.createdAt ?? ""),
    updatedAt: String(poem.updatedAt ?? ""),
  }));
}

export async function getPoemBySlug(slug: string): Promise<Poem> {
  const poem = await apiFetch<Record<string, unknown>>(`/editorial/poems/${slug}`);
  return {
    id: String(poem.id ?? ""),
    slug: String(poem.slug ?? ""),
    titleFA: String(poem.titleFA ?? ""),
    poetFA: String(poem.poetFA ?? ""),
    poetEN: poem.poetEN ? String(poem.poetEN) : undefined,
    era: poem.era ? String(poem.era) : undefined,
    eraFA: poem.eraFA ? String(poem.eraFA) : undefined,
    category: String(poem.category ?? ""),
    categoryFA: String(poem.categoryFA ?? ""),
    linesFA: Array.isArray(poem.linesFA) ? poem.linesFA.map(String) : [],
    theme: Array.isArray(poem.theme) ? poem.theme.map(String) : [],
    backgroundGradient: poem.backgroundGradient ? String(poem.backgroundGradient) : undefined,
    isPublished: Boolean(poem.isPublished ?? false),
    createdAt: String(poem.createdAt ?? ""),
    updatedAt: String(poem.updatedAt ?? ""),
  };
}

export const POEM_CATEGORIES = [
  { id: "all", labelFA: "همه", slug: "all" },
  { id: "ghazal", labelFA: "غزل", slug: "ghazal" },
  { id: "robaei", labelFA: "رباعی", slug: "robaei" },
  { id: "modern", labelFA: "شعر نو", slug: "modern" },
] as const;

// ── Quotes ──

export interface Quote {
  id: string;
  textFA: string;
  textEN?: string;
  sourceFA: string;
  sourceEN?: string;
  scheduledDate?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function getTodayQuote(): Promise<Quote | null> {
  try {
    const quote = await apiFetch<Record<string, unknown>>("/quotes/today");
    return {
      id: String(quote.id ?? ""),
      textFA: String(quote.textFA ?? ""),
      textEN: quote.textEN ? String(quote.textEN) : undefined,
      sourceFA: String(quote.sourceFA ?? ""),
      sourceEN: quote.sourceEN ? String(quote.sourceEN) : undefined,
      scheduledDate: quote.scheduledDate as string | undefined,
      isActive: Boolean(quote.isActive ?? false),
      createdAt: String(quote.createdAt ?? ""),
      updatedAt: String(quote.updatedAt ?? ""),
    };
  } catch {
    return null;
  }
}