import type { CartItem } from './product'

export interface ShippingAddress {
  first_name: string
  last_name: string
  address_1: string
  city: string
  country_code: string
  postal_code: string
}

export interface Order {
  id: string
  status: string
  payment_status: string
  fulfillment_status: string
  items: CartItem[]
  total: number
  created_at: string
  shipping_address: ShippingAddress
}
