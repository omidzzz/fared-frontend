import type { CategoryHandle } from '@/types/product'

type CategoryOrHome = CategoryHandle | 'home'

export const chakraOverlayGradients: Record<CategoryOrHome, string> = {
  home: 'radial-gradient(ellipse at 50% 20%, rgba(142,68,173,0.50) 0%, rgba(10,10,26,0.90) 60%)',
  clothes:
    'radial-gradient(ellipse at 50% 30%, rgba(192,57,43,0.45) 0%, rgba(10,10,26,0.85) 70%)',
  stones:
    'radial-gradient(ellipse at 50% 30%, rgba(41,128,185,0.45) 0%, rgba(10,10,26,0.85) 70%)',
  tours:
    'radial-gradient(ellipse at 50% 30%, rgba(39,174,96,0.40) 0%, rgba(10,10,26,0.85) 70%)',
  candles:
    'radial-gradient(ellipse at 50% 30%, rgba(230,126,34,0.45) 0%, rgba(10,10,26,0.85) 70%)',
  courses:
    'radial-gradient(ellipse at 50% 30%, rgba(142,68,173,0.45) 0%, rgba(10,10,26,0.85) 70%)',
  mentorship:
    'radial-gradient(ellipse at 50% 30%, rgba(155,89,182,0.45) 0%, rgba(10,10,26,0.85) 70%)',
  accessories:
    'radial-gradient(ellipse at 50% 30%, rgba(241,196,15,0.40) 0%, rgba(10,10,26,0.85) 70%)',
}

export const chakraColors: Record<CategoryOrHome, string> = {
  home: '#8E44AD',
  clothes: '#C0392B',
  stones: '#2980B9',
  tours: '#27AE60',
  candles: '#E67E22',
  courses: '#8E44AD',
  mentorship: '#9B59B6',
  accessories: '#F1C40F',
}
