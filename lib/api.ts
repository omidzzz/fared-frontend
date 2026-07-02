import type { Cart } from '@/types/product'
import type { Category } from '@/types/category'
import type { Order } from '@/types/order'
import type { EditorialPost, ForumPost } from '@/types/content'

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/+$/, '') ?? ''

export interface CatalogProduct {
  id: string
  slug: string
  name: string
  nameFA: string
  description?: string
  descriptionFA?: string
  price: number
  image: string
  category?: string
  // Course-specific fields
  duration?: string
  durationWeeks?: number
  lessons?: number
  level?: string
  language?: string
  certificate?: boolean
  heroImage?: string | null
  currency?: string
  isFree?: boolean
  instructor?: {
    id: string
    nameFA: string
    avatar?: string | null
  }
  tags?: string[]
}

function buildUrl(endpoint: string): string {
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  if (!BASE_URL) return normalizedEndpoint

  if (BASE_URL.endsWith('/api')) {
    return `${BASE_URL}${normalizedEndpoint.startsWith('/api') ? normalizedEndpoint.replace(/^\/api/, '') : normalizedEndpoint}`
  }

  return `${BASE_URL}${normalizedEndpoint.startsWith('/api') ? normalizedEndpoint : `/api${normalizedEndpoint}`}`
}

function normalizeProduct(product: Record<string, unknown>): CatalogProduct {
  const price = Number(
    (product.price as number | undefined) ??
      (product.basePrice as number | undefined) ??
      (product.priceValue as number | undefined) ??
      0,
  )

  const rawImages = Array.isArray(product.images) ? product.images : []
  const firstImage =
    (rawImages[0] as { url?: string; path?: string; src?: string } | string | undefined)?.toString() ??
    (product.image as { url?: string; path?: string; src?: string } | string | undefined)?.toString() ??
    ''

  const imageUrl =
    typeof rawImages[0] === 'object' && rawImages[0] !== null
      ? ((rawImages[0] as { url?: string; path?: string; src?: string }).url ??
          (rawImages[0] as { url?: string; path?: string; src?: string }).path ??
          (rawImages[0] as { url?: string; path?: string; src?: string }).src ??
          '')
      : typeof product.image === 'object' && product.image !== null
        ? ((product.image as { url?: string; path?: string; src?: string }).url ??
            (product.image as { url?: string; path?: string; src?: string }).path ??
            (product.image as { url?: string; path?: string; src?: string }).src ??
            '')
        : (product.image as string | undefined) ?? ''

  return {
    id: String(product.id ?? ''),
    slug: String(product.slug ?? product.id ?? ''),
    name: String(product.nameEN ?? product.name ?? product.title ?? ''),
    nameFA: String(product.nameFA ?? product.name ?? product.title ?? ''),
    description: String(product.descriptionEN ?? product.description ?? ''),
    descriptionFA: String(product.descriptionFA ?? product.description ?? ''),
    price,
    image: imageUrl,
    category: String((product.category as { slug?: string } | undefined)?.slug ?? ''),
    // Pass through any extra fields for course/category-specific data
    duration: String(product.duration ?? ''),
    lessons: Number(product.lessons ?? 0),
    level: String(product.level ?? ''),
    instructor: product.instructor as { id: string; nameFA: string; avatar?: string | null } | undefined,
    tags: product.tags as string[] | undefined,
    heroImage: product.heroImage as string | null | undefined,
    currency: String(product.currency ?? ''),
    isFree: Boolean(product.isFree ?? false),
    durationWeeks: Number(product.durationWeeks ?? 0),
    certificate: Boolean(product.certificate ?? false),
    language: String(product.language ?? ''),
  }
}

async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('fared_token') : null
  const res = await fetch(buildUrl(endpoint), {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }))
    throw new Error(error.message ?? 'API request failed')
  }

  const payload = await res.json().catch(() => null)
  if (payload && typeof payload === 'object' && 'success' in payload) {
    const envelope = payload as { success: boolean; data?: T; error?: string }
    if (!envelope.success) {
      throw new Error(envelope.error ?? 'API request failed')
    }
    return envelope.data as T
  }

  return payload as T
}

async function getProductsFromBackend(params?: {
  category?: string
  limit?: number
  offset?: number
}): Promise<{ products: CatalogProduct[]; count: number }> {
  const query = new URLSearchParams()
  if (params?.category) query.set('category', params.category)
  if (params?.limit) query.set('limit', String(params.limit))
  if (params?.offset) query.set('offset', String(params.offset))
  const qs = query.toString() ? `?${query.toString()}` : ''

  const products = await apiFetch<Record<string, unknown>[]>(`/products${qs}`)
  return {
    products: products.map(normalizeProduct),
    count: products.length,
  }
}

export async function getProducts(params?: {
  category?: string
  limit?: number
  offset?: number
}): Promise<{ products: CatalogProduct[]; count: number }> {
  return await getProductsFromBackend(params)
}

export async function getProduct(id: string): Promise<CatalogProduct> {
  const response = await apiFetch<Record<string, unknown>>(`/products/${id}`)
  return normalizeProduct(response)
}

export async function getCategories(): Promise<Category[]> {
  const categories = await apiFetch<Array<Record<string, unknown>>>('/categories')
  return categories.map((category) => ({
    id: String(category.id ?? ''),
    name: String(category.nameEN ?? category.name ?? ''),
    handle: String((category.slug as string | undefined) ?? '').replace(/\s+/g, '-') as Category['handle'],
    description: String(category.descriptionEN ?? category.description ?? ''),
    metadata: category as Record<string, unknown>,
  }))
}

export function createCart(): Promise<Cart> {
  return apiFetch<{ cart: Cart }>('/store/carts', { method: 'POST', body: '{}' }).then(
    (r) => r.cart,
  )
}

export function getCart(id: string): Promise<Cart> {
  return apiFetch<{ cart: Cart }>(`/store/carts/${id}`).then((r) => r.cart)
}

export function addToCart(cartId: string, variantId: string, quantity: number): Promise<Cart> {
  return apiFetch<{ cart: Cart }>(`/store/carts/${cartId}/line-items`, {
    method: 'POST',
    body: JSON.stringify({ variant_id: variantId, quantity }),
  }).then((r) => r.cart)
}

export function removeFromCart(cartId: string, lineItemId: string): Promise<Cart> {
  return apiFetch<{ cart: Cart }>(`/store/carts/${cartId}/line-items/${lineItemId}`, {
    method: 'DELETE',
  }).then((r) => r.cart)
}

export function updateCartItem(
  cartId: string,
  lineItemId: string,
  quantity: number,
): Promise<Cart> {
  return apiFetch<{ cart: Cart }>(`/store/carts/${cartId}/line-items/${lineItemId}`, {
    method: 'POST',
    body: JSON.stringify({ quantity }),
  }).then((r) => r.cart)
}

export function loginCustomer(
  email: string,
  password: string,
): Promise<{ token: string }> {
  return apiFetch('/store/auth', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export function registerCustomer(data: {
  email: string
  password: string
  first_name: string
  last_name: string
}): Promise<{ customer: unknown }> {
  return apiFetch('/store/customers', { method: 'POST', body: JSON.stringify(data) })
}

export function getCustomer(): Promise<unknown> {
  return apiFetch('/store/customers/me')
}

export function getOrders(): Promise<Order[]> {
  return apiFetch<{ orders: Order[] }>('/store/orders').then((r) => r.orders)
}

export function getEditorialPosts(category?: string): Promise<EditorialPost[]> {
  const qs = category ? `?category=${category}` : ''
  return apiFetch<{ posts: EditorialPost[] }>(`/store/editorial${qs}`).then((r) => r.posts)
}

export function getEditorialPost(slug: string): Promise<EditorialPost> {
  return apiFetch<{ post: EditorialPost }>(`/store/editorial/${slug}`).then((r) => r.post)
}

export function getForumPosts(): Promise<ForumPost[]> {
  return apiFetch<{ posts: ForumPost[] }>('/store/forum').then((r) => r.posts)
}

export function getForumPost(id: string): Promise<ForumPost> {
  return apiFetch<{ post: ForumPost }>(`/store/forum/${id}`).then((r) => r.post)
}

// ── Category-specific product fetchers ──
export async function getStones(): Promise<CatalogProduct[]> {
  const products = await apiFetch<Record<string, unknown>[]>('/stones')
  return products.map(normalizeProduct)
}

export async function getStoneBySlug(slug: string): Promise<CatalogProduct> {
  const product = await apiFetch<Record<string, unknown>>(`/stones/${slug}`)
  return normalizeProduct(product)
}

export async function getCandles(): Promise<CatalogProduct[]> {
  const products = await apiFetch<Record<string, unknown>[]>('/candles')
  return products.map(normalizeProduct)
}

export async function getCandleBySlug(slug: string): Promise<CatalogProduct> {
  const product = await apiFetch<Record<string, unknown>>(`/candles/${slug}`)
  return normalizeProduct(product)
}

export async function getClothes(): Promise<CatalogProduct[]> {
  const products = await apiFetch<Record<string, unknown>[]>('/clothes')
  return products.map(normalizeProduct)
}

export async function getClothBySlug(slug: string): Promise<CatalogProduct> {
  const product = await apiFetch<Record<string, unknown>>(`/clothes/${slug}`)
  return normalizeProduct(product)
}

export async function getAccessories(): Promise<CatalogProduct[]> {
  const products = await apiFetch<Record<string, unknown>[]>('/accessories')
  return products.map(normalizeProduct)
}

export async function getAccessoryBySlug(slug: string): Promise<CatalogProduct> {
  const product = await apiFetch<Record<string, unknown>>(`/accessories/${slug}`)
  return normalizeProduct(product)
}

export async function getCourses(): Promise<CatalogProduct[]> {
  const products = await apiFetch<Record<string, unknown>[]>('/courses')
  return products.map(normalizeProduct)
}

export async function getCourseBySlug(slug: string): Promise<CatalogProduct> {
  const product = await apiFetch<Record<string, unknown>>(`/courses/${slug}`)
  return normalizeProduct(product)
}

// ── Editorial / Blog ──
export interface BlogArticle {
  id: string
  slug: string
  titleFA: string
  titleEN?: string
  excerptFA: string
  bodyFA: string
  authorFA: string
  categoryFA: string
  image?: string
  readMinutes: number
  isFeatured: boolean
  isPublished: boolean
  publishedAt?: string
  createdAt: string
}

export async function getArticles(): Promise<BlogArticle[]> {
  const articles = await apiFetch<Record<string, unknown>[]>('/editorial/articles')
  return articles.map((a) => ({
    id: String(a.id ?? ''),
    slug: String(a.slug ?? ''),
    titleFA: String(a.titleFA ?? ''),
    titleEN: String(a.titleEN ?? ''),
    excerptFA: String(a.excerptFA ?? ''),
    bodyFA: String(a.bodyFA ?? ''),
    authorFA: String(a.authorFA ?? ''),
    categoryFA: String(a.categoryFA ?? ''),
    image: String(a.image ?? ''),
    readMinutes: Number(a.readMinutes ?? 5),
    isFeatured: Boolean(a.isFeatured ?? false),
    isPublished: Boolean(a.isPublished ?? false),
    publishedAt: a.publishedAt as string | undefined,
    createdAt: String(a.createdAt ?? ''),
  }))
}

export async function getArticleBySlug(slug: string): Promise<BlogArticle> {
  const article = await apiFetch<Record<string, unknown>>(`/editorial/articles/${slug}`)
  return {
    id: String(article.id ?? ''),
    slug: String(article.slug ?? ''),
    titleFA: String(article.titleFA ?? ''),
    titleEN: String(article.titleEN ?? ''),
    excerptFA: String(article.excerptFA ?? ''),
    bodyFA: String(article.bodyFA ?? ''),
    authorFA: String(article.authorFA ?? ''),
    categoryFA: String(article.categoryFA ?? ''),
    image: String(article.image ?? ''),
    readMinutes: Number(article.readMinutes ?? 5),
    isFeatured: Boolean(article.isFeatured ?? false),
    isPublished: Boolean(article.isPublished ?? false),
    publishedAt: article.publishedAt as string | undefined,
    createdAt: String(article.createdAt ?? ''),
  }
}
