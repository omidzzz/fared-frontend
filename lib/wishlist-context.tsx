'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import toast from 'react-hot-toast'

export interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
}

interface WishlistContextType {
  items: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: string) => void
  isWishlisted: (id: string) => boolean
  toggleWishlist: (item: WishlistItem) => void
}

const WishlistContext = createContext<WishlistContextType | null>(null)

const STORAGE_KEY = 'lumina-wishlist'

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setItems(JSON.parse(saved))
    } catch { /* ignore */ }
  }, [])

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)) }
    catch { /* ignore */ }
  }, [items])

  const addToWishlist = (item: WishlistItem) => {
    setItems(prev => { if (prev.find(i => i.id === item.id)) return prev; return [...prev, item] })
    toast.success('Added to wishlist ♡')
  }

  const removeFromWishlist = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
    toast('Removed from wishlist')
  }

  const isWishlisted = (id: string) => items.some(i => i.id === id)

  const toggleWishlist = (item: WishlistItem) => {
    if (isWishlisted(item.id)) removeFromWishlist(item.id)
    else addToWishlist(item)
  }

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isWishlisted, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within <WishlistProvider>')
  return ctx
}
