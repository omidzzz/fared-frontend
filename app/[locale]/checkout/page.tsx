'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import toast from 'react-hot-toast'
import DynamicHeader from '@/components/layout/DynamicHeader'
import { HeroShimmer } from '@/components/ui/HeroShimmer'
import CheckoutStepper from '@/components/ui/CheckoutStepper'
import OrderSummary from '@/components/ui/OrderSummary'
import CTAButton from '@/components/ui/CTAButton'
import { useCart } from '@/lib/cart-context'

export default function CheckoutPage() {
  const { items, totalPrice, totalItems, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [confirmedItems, setConfirmedItems] = useState<typeof items>([])
  const [confirmedTotal, setConfirmedTotal] = useState(0)

  const inputClass = "w-full bg-white/[0.04] border border-white/[0.10] rounded-xl px-4 py-3 font-farsi text-sm text-[var(--text-primary)] min-h-11 outline-none focus:border-[var(--gold-accent)]/50 transition-colors"

  const handleStep1Next = () => {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError('لطفاً همه فیلدها را پر کنید')
      return
    }
    setError('')
    setStep(2)
  }

  const handlePlaceOrder = async () => {
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items, total: totalPrice,
          address: { name, email, phone, address, city, postalCode },
        }),
      })
      if (res.ok) {
        setConfirmedItems([...items])
        setConfirmedTotal(totalPrice)
        clearCart()
        toast.success('Order placed! ✦')
        setStep(3)
      } else {
        toast.error('Order failed. Please try again.')
      }
    } catch {
      toast.error('Order failed. Please try again.')
    }
    setIsSubmitting(false)
  }

  return (
    <main className="min-h-screen">
      {/* Fixed background */}
      <div className="hidden lg:block" style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <Image src="/images/hero-backgrounds/cart-hero.webp" alt="" fill sizes="100vw" unoptimized priority
               className="object-cover object-center"
               onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,5,20,0.5)' }}/>
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <DynamicHeader />
        <section className="px-4 pt-[88px] pb-4">
          <div className="relative rounded-3xl overflow-hidden p-6 bg-white/[0.03] border border-white/[0.08]" style={{ backdropFilter: 'blur(20px)' }}>
            <HeroShimmer />
            <div className="relative z-20" dir="rtl">
              <h1 className="font-display text-3xl text-[var(--text-primary)]">تکمیل سفارش</h1>
              <CheckoutStepper currentStep={step}/>
            </div>
          </div>
        </section>

        <section className="px-4 py-4 flex flex-col gap-4">
          {/* STEP 1 — Shipping */}
          {step === 1 && (
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5 flex flex-col gap-4" dir="rtl" style={{ backdropFilter: 'blur(20px)' }}>
              <h2 className="font-farsi font-bold text-[var(--text-primary)] mb-2">اطلاعات ارسال</h2>
              {[
                { label: 'نام و نام خانوادگی', val: name, set: setName, placeholder: 'نام و نام خانوادگی' },
                { label: 'ایمیل', val: email, set: setEmail, placeholder: 'you@example.com', type: 'email' },
                { label: 'شماره تماس', val: phone, set: setPhone, placeholder: 'شماره تماس', inputMode: 'tel' as const },
                { label: 'آدرس کامل', val: address, set: setAddress, placeholder: 'آدرس کامل', textarea: true },
                { label: 'شهر', val: city, set: setCity, placeholder: 'شهر' },
                { label: 'کد پستی', val: postalCode, set: setPostalCode, placeholder: 'کد پستی' },
              ].map(f => (
                <div key={f.label}>
                  <label className="font-farsi text-xs text-[var(--text-secondary)] mb-1 block">{f.label}</label>
                  {f.textarea ? (
                    <textarea placeholder={f.placeholder} value={f.val} onChange={(e: any) => f.set(e.target.value)} rows={3} className={inputClass + ' resize-none'} />
                  ) : (
                    <input type={f.type || 'text'} inputMode={f.inputMode} placeholder={f.placeholder} value={f.val} onChange={(e: any) => f.set(e.target.value)} className={inputClass} />
                  )}
                </div>
              ))}
              {error && <p className="text-red-400 text-xs font-farsi">{error}</p>}
              <CTAButton onClick={handleStep1Next} className="w-full">مرحله بعد ←</CTAButton>
            </div>
          )}

          {/* STEP 2 — Payment */}
          {step === 2 && (
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5 flex flex-col gap-4" dir="rtl" style={{ backdropFilter: 'blur(20px)' }}>
              <h2 className="font-farsi font-bold text-[var(--text-primary)] mb-2">اطلاعات پرداخت</h2>
              <div>
                <label className="font-farsi text-xs text-[var(--text-secondary)] mb-1 block">شماره کارت</label>
                <input type="text" placeholder="•••• •••• •••• ••••" className={inputClass} />
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="font-farsi text-xs text-[var(--text-secondary)] mb-1 block">تاریخ انقضا</label>
                  <input type="text" placeholder="MM/YY" className={inputClass} />
                </div>
                <div className="flex-1">
                  <label className="font-farsi text-xs text-[var(--text-secondary)] mb-1 block">CVV</label>
                  <input type="text" placeholder="•••" className={inputClass} />
                </div>
              </div>
              <div>
                <label className="font-farsi text-xs text-[var(--text-secondary)] mb-1 block">نام دارنده کارت</label>
                <input type="text" placeholder="نام دارنده کارت" className={inputClass} />
              </div>
              <OrderSummary totalPrice={totalPrice} totalItems={totalItems}/>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 min-h-11 rounded-xl border border-white/[0.10] font-farsi text-sm text-[var(--text-secondary)] transition-all duration-300">→ برگشت</button>
                <CTAButton onClick={handlePlaceOrder} disabled={isSubmitting}>
                  {isSubmitting ? 'در حال ثبت...' : 'ثبت سفارش ✓'}
                </CTAButton>
              </div>
            </div>
          )}

          {/* STEP 3 — Confirmation */}
          {step === 3 && (
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-8 flex flex-col items-center text-center gap-4" dir="rtl" style={{ backdropFilter: 'blur(20px)' }}>
              <span className="text-5xl">✨</span>
              <h2 className="font-display text-2xl text-[var(--text-primary)]">سفارش شما ثبت شد</h2>
              <p className="font-farsi text-sm text-[var(--text-secondary)]">به زودی با شما تماس می‌گیریم</p>
              <div className="font-farsi text-xs text-[var(--text-muted)] mt-2">
                <p>{name} — {phone}</p>
                <p className="mt-1">{address}</p>
              </div>
              {confirmedItems.length > 0 && (
                <div className="w-full mt-2 text-right">
                  <p className="font-farsi text-xs text-[var(--text-muted)] mb-2">خلاصه سفارش:</p>
                  {confirmedItems.map(item => (
                    <div key={item.id} className="flex justify-between font-farsi text-xs text-[var(--text-secondary)] py-1 border-b border-white/[0.05]">
                      <span>{item.nameFA || item.name} ×{item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-farsi text-sm font-bold text-[var(--text-primary)] mt-2 pt-2 border-t border-white/[0.1]">
                    <span>جمع کل</span><span>${confirmedTotal.toFixed(2)}</span>
                  </div>
                </div>
              )}
              <div className="flex gap-3 mt-4">
                <CTAButton href="/shop" size="small">بازگشت به فروشگاه</CTAButton>
                <CTAButton href="/profile" size="small">مشاهده سفارش‌ها</CTAButton>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
