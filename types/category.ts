import type { CategoryHandle, ChakraKey } from './product'

export interface Category {
  id: string
  name: string
  handle: CategoryHandle
  description?: string
  metadata?: Record<string, unknown>
}

export interface CategoryConfig {
  handle: CategoryHandle
  chakra: ChakraKey
  color: string
  colorRgb: string
  gradient: string
  label: string
  labelFa: string
  bgImage: string
}

export const CATEGORY_CONFIG: Record<CategoryHandle, CategoryConfig> = {
  clothes: {
    handle: 'clothes',
    chakra: 'root',
    color: '#C0392B',
    colorRgb: '192, 57, 43',
    gradient:
      'radial-gradient(ellipse at 50% 30%, rgba(192,57,43,0.45) 0%, rgba(10,10,26,0.85) 70%)',
    label: 'Clothes',
    labelFa: 'پوشاک',
    bgImage: '/images/backgrounds/clothes-bg.webp',
  },
  stones: {
    handle: 'stones',
    chakra: 'throat',
    color: '#2980B9',
    colorRgb: '41, 128, 185',
    gradient:
      'radial-gradient(ellipse at 50% 30%, rgba(41,128,185,0.45) 0%, rgba(10,10,26,0.85) 70%)',
    label: 'Stones',
    labelFa: 'سنگ‌ها',
    bgImage: '/images/backgrounds/stones-bg.webp',
  },
  tours: {
    handle: 'tours',
    chakra: 'heart',
    color: '#27AE60',
    colorRgb: '39, 174, 96',
    gradient:
      'radial-gradient(ellipse at 50% 30%, rgba(39,174,96,0.40) 0%, rgba(10,10,26,0.85) 70%)',
    label: 'Tours',
    labelFa: 'تورها',
    bgImage: '/images/backgrounds/tours-bg.webp',
  },
  candles: {
    handle: 'candles',
    chakra: 'sacral',
    color: '#E67E22',
    colorRgb: '230, 126, 34',
    gradient:
      'radial-gradient(ellipse at 50% 30%, rgba(230,126,34,0.45) 0%, rgba(10,10,26,0.85) 70%)',
    label: 'Candles',
    labelFa: 'شمع‌ها',
    bgImage: '/images/backgrounds/candles-bg.webp',
  },
  courses: {
    handle: 'courses',
    chakra: 'third',
    color: '#8E44AD',
    colorRgb: '142, 68, 173',
    gradient:
      'radial-gradient(ellipse at 50% 30%, rgba(142,68,173,0.45) 0%, rgba(10,10,26,0.85) 70%)',
    label: 'Courses',
    labelFa: 'دوره‌ها',
    bgImage: '/images/backgrounds/courses-bg.webp',
  },
  mentorship: {
    handle: 'mentorship',
    chakra: 'crown',
    color: '#9B59B6',
    colorRgb: '155, 89, 182',
    gradient:
      'radial-gradient(ellipse at 50% 30%, rgba(155,89,182,0.45) 0%, rgba(10,10,26,0.85) 70%)',
    label: 'Mentorship',
    labelFa: 'منتورشیپ',
    bgImage: '/images/backgrounds/mentorship-bg.webp',
  },
  accessories: {
    handle: 'accessories',
    chakra: 'solar',
    color: '#F1C40F',
    colorRgb: '241, 196, 15',
    gradient:
      'radial-gradient(ellipse at 50% 30%, rgba(241,196,15,0.40) 0%, rgba(10,10,26,0.85) 70%)',
    label: 'Accessories',
    labelFa: 'اکسسوری',
    bgImage: '/images/backgrounds/accessories-bg.webp',
  },
}

export const HOME_CONFIG = {
  color: '#8E44AD',
  colorRgb: '142, 68, 173',
  gradient:
    'radial-gradient(ellipse at 50% 20%, rgba(142,68,173,0.50) 0%, rgba(10,10,26,0.90) 60%)',
  bgImage: '/images/backgrounds/home-bg.webp',
}
