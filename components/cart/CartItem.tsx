'use client'

interface CartItemProps {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  variant: string
  onRemove: () => void
  onQuantityChange: (quantity: number) => void
}

export default function CartItem({
  id: _id,
  name,
  price,
  quantity,
  image,
  variant,
  onRemove,
  onQuantityChange,
}: CartItemProps) {
  const lineTotal = price * quantity
  const isClothes = image.endsWith('.webp')

  return (
    <div
      className="flex gap-3 p-3 rounded-xl transition-colors duration-150"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div
        className="w-16 h-20 rounded-lg flex-shrink-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${isClothes ? `/images/products/clothes/${image}` : image})`,
        }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="font-display text-sm text-[#F0EBE3] truncate">{name}</h4>
            <p className="text-[10px] text-[#B8AEAD] mt-0.5">{variant}</p>
          </div>
          <button
            onClick={onRemove}
            className="text-[#B8AEAD] hover:text-red-400 transition-colors flex-shrink-0 p-0.5"
            aria-label={`Remove ${name}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border border-white/10 rounded-full">
            <button
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              className="w-7 h-7 flex items-center justify-center text-xs text-[#B8AEAD] hover:text-[#FECB7D] transition-colors"
            >
              -
            </button>
            <span className="w-6 text-center text-xs text-[#F0EBE3]">{quantity}</span>
            <button
              onClick={() => onQuantityChange(quantity + 1)}
              className="w-7 h-7 flex items-center justify-center text-xs text-[#B8AEAD] hover:text-[#FECB7D] transition-colors"
            >
              +
            </button>
          </div>
          <span className="text-sm text-[#FECB7D] font-semibold">${lineTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
