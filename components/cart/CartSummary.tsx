interface CartSummaryProps {
  subtotal: number
  shipping: number
  total: number
}

export default function CartSummary({ subtotal, shipping, total }: CartSummaryProps) {
  return (
    <div className="border-t border-white/10 mt-4 pt-4 space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-[#B8AEAD]">Subtotal</span>
        <span className="text-[#F0EBE3]">${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-[#B8AEAD]">Shipping</span>
        <span className="text-[#F0EBE3]">
          {shipping === 0 ? (
            <span className="text-[#27AE60] text-xs">Free</span>
          ) : (
            `$${shipping.toFixed(2)}`
          )}
        </span>
      </div>
      <div className="flex items-center justify-between text-base pt-2 border-t border-white/10">
        <span className="text-[#F0EBE3] font-semibold">Total</span>
        <span className="text-[#FECB7D] font-bold">${total.toFixed(2)}</span>
      </div>
    </div>
  )
}
