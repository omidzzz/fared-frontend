'use client'

import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react'
import toast from 'react-hot-toast'

export type CartItemType =
  | 'stone'
  | 'candle'
  | 'accessory'
  | 'course'
  | 'mentorship'
  | 'tour'
  | 'clothes'

export interface LocalCartItem {
  id: string
  productId: string
  productType: CartItemType
  name: string
  nameFA: string
  price: number
  currency: 'USD' | 'IRT'
  quantity: number
  image: string
  variant?: string
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<LocalCartItem, 'id'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; qty: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: LocalCartItem[] }

function cartReducer(state: LocalCartItem[], action: CartAction): LocalCartItem[] {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find(
        (i) =>
          i.productId === action.payload.productId &&
          i.variant === action.payload.variant,
      )
      if (existing) {
        return state.map((i) =>
          i.id === existing.id
            ? { ...i, quantity: i.quantity + action.payload.quantity }
            : i,
        )
      }
      return [
        ...state,
        {
          ...action.payload,
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        },
      ]
    }
    case 'REMOVE_ITEM':
      return state.filter((i) => i.id !== action.payload)
    case 'UPDATE_QUANTITY':
      if (action.payload.qty <= 0) {
        return state.filter((i) => i.id !== action.payload.id)
      }
      return state.map((i) =>
        i.id === action.payload.id ? { ...i, quantity: action.payload.qty } : i,
      )
    case 'CLEAR_CART':
      return []
    case 'LOAD_CART':
      return action.payload
    default:
      return state
  }
}

interface CartContextType {
  items: LocalCartItem[]
  addItem: (item: Omit<LocalCartItem, 'id'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | null>(null)

const STORAGE_KEY = 'aura-cart-v1'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, [])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) dispatch({ type: 'LOAD_CART', payload: JSON.parse(saved) })
    } catch {
      // ignore parse errors
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // ignore storage errors
    }
  }, [items])

  const addItem = (item: Omit<LocalCartItem, 'id'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
    toast.success('Added to cart ✦')
  }

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
    toast('Item removed', { icon: '🗑️' })
  }

  const updateQuantity = (id: string, qty: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, qty } })

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
    toast('Cart cleared')
  }

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within <CartProvider>')
  return ctx
}
