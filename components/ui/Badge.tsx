import type { CategoryHandle } from '@/types/product'

type BadgeVariant = CategoryHandle | 'new' | 'sale' | 'popular'

interface BadgeProps {
  variant: BadgeVariant
  children: React.ReactNode
}

const categoryStyles: Record<CategoryHandle, { bg: string; text: string; border: string }> = {
  clothes:     { bg: 'rgba(192,57,43,0.20)',  text: '#C0392B', border: '#C0392B' },
  stones:      { bg: 'rgba(41,128,185,0.20)', text: '#2980B9', border: '#2980B9' },
  tours:       { bg: 'rgba(39,174,96,0.20)',  text: '#27AE60', border: '#27AE60' },
  candles:     { bg: 'rgba(230,126,34,0.20)', text: '#E67E22', border: '#E67E22' },
  courses:     { bg: 'rgba(142,68,173,0.20)', text: '#8E44AD', border: '#8E44AD' },
  mentorship:  { bg: 'rgba(155,89,182,0.20)', text: '#9B59B6', border: '#9B59B6' },
  accessories: { bg: 'rgba(241,196,15,0.20)', text: '#F1C40F', border: '#F1C40F' },
}

const fixedStyles: Record<'new' | 'sale' | 'popular', { bg: string; text: string; border: string }> = {
  new:     { bg: 'rgba(254,203,125,0.20)', text: '#fecb7d', border: '#c9a84c' },
  sale:    { bg: 'rgba(192,57,43,0.20)',   text: '#e74c3c', border: '#e74c3c' },
  popular: { bg: 'rgba(41,128,185,0.20)',  text: '#3498db', border: '#3498db' },
}

export default function Badge({ variant, children }: BadgeProps) {
  const style =
    variant in categoryStyles
      ? categoryStyles[variant as CategoryHandle]
      : fixedStyles[variant as 'new' | 'sale' | 'popular']

  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
      style={{
        backgroundColor: style.bg,
        color: style.text,
        borderColor: style.border,
      }}
    >
      {children}
    </span>
  )
}
