export type CategoryHandle =
  | 'clothes'
  | 'stones'
  | 'tours'
  | 'candles'
  | 'courses'
  | 'mentorship'
  | 'accessories'

export type ChakraKey =
  | 'root'
  | 'sacral'
  | 'solar'
  | 'heart'
  | 'throat'
  | 'third'
  | 'crown'

export interface ProductVariant {
  id: string
  title: string
  prices: { amount: number; currency_code: string }[]
  options: { value: string }[]
  inventory_quantity: number
}

export interface Product {
  id: string
  title: string
  description: string
  thumbnail: string
  images: { url: string }[]
  variants: ProductVariant[]
  category: { handle: CategoryHandle; name: string }
  metadata?: Record<string, unknown>
}

export interface CartItem {
  id: string
  product_id: string
  variant_id: string
  title: string
  thumbnail: string
  quantity: number
  unit_price: number
  total: number
}

export interface Cart {
  id: string
  items: CartItem[]
  total: number
  subtotal: number
  discount_total: number
  region_id: string
}
