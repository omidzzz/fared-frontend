import type { CategoryHandle } from '@/types/product'
import { CATEGORY_CONFIG } from '@/types/category'
import type { CategoryConfig } from '@/types/category'

export function formatPrice(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount / 100)
}

export function getCategoryConfig(handle: CategoryHandle): CategoryConfig {
  return CATEGORY_CONFIG[handle]
}

export function getChakraGlowClass(handle: CategoryHandle): string {
  const map: Record<CategoryHandle, string> = {
    clothes: 'chakra-glow-root',
    stones: 'chakra-glow-throat',
    tours: 'chakra-glow-heart',
    candles: 'chakra-glow-sacral',
    courses: 'chakra-glow-third',
    mentorship: 'chakra-glow-crown',
    accessories: 'chakra-glow-solar',
  }
  return map[handle]
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length).trimEnd() + '…'
}
