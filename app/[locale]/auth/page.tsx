'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import DynamicHeader from '@/components/layout/DynamicHeader'
import { HeroShimmer } from '@/components/ui/HeroShimmer'
import { useAuth } from '@/lib/auth-context'

export default function AuthPage() {
  const router = useRouter()
  const { user } = useAuth()

  const [tab, setTab] = useState<'login' | 'register'>('login')
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [resetEmail, setResetEmail] = useState<string>('')
  const [showForgot, setShowForgot] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')

  const { login, register, resetPassword } = useAuth()

  useEffect(() => {
    if (user) {
      router.push('/profile')
    }
  }, [user, router])

  const handleLogin = async () => {
    setError('')
    setIsSubmitting(true)
    const result = await login(email, password)
    setIsSubmitting(false)
    if (result.success) {
      toast.success('Welcome back ✦')
      router.push('/profile')
    } else {
      toast.error('Invalid email or password.')
      setError(result.error ?? 'خطا در ورود')
    }
  }

  const handleRegister = async () => {
    setError('')
    if (password !== confirmPassword) {
      setError('رمز عبور و تکرار آن یکسان نیستند')
      return
    }
    if (!name || !email || !phone || !password) {
      setError('لطفاً همه فیلدها را پر کنید')
      return
    }
    setIsSubmitting(true)
    const result = await register(name, email, phone, password)
    setIsSubmitting(false)
    if (result.success) {
      toast.success('Account created! Welcome.')
      router.push('/profile')
    } else {
      toast.error('Registration failed. Try again.')
      setError(result.error ?? 'خطا در ثبت‌نام')
    }
  }

  const handleForgot = async () => {
    setError('')
    setSuccess('')
    setIsSubmitting(true)
    const result = await resetPassword(resetEmail)
    setIsSubmitting(false)
    if (result.success) {
      setSuccess('لینک بازیابی به ایمیل شما ارسال شد')
    } else {
      setError('خطا در ارسال ایمیل')
    }
  }

  return (
    <main className="page-gradient-crown min-h-screen">
      {/* Section 1 — Header */}
      <DynamicHeader />

      {/* Section 2 — Isolated Hero */}
      <section className="px-4 pt-[88px] pb-4">
        <div className="relative rounded-3xl overflow-hidden aspect-[2/1]">
          <Image
            src="/images/hero-backgrounds/home-page-hero.webp"
            alt=""
            fill
            className="object-cover object-top"
            priority
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <HeroShimmer />
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-6" dir="rtl">
            {!showForgot && tab === 'login' && (
              <>
                <h1 className="font-display text-2xl text-[var(--text-primary)]">
                  خوش برگشتی
                </h1>
                <p className="font-farsi text-sm text-[var(--text-secondary)] mt-1">
                  به دنیای اورا وارد شو
                </p>
              </>
            )}
            {!showForgot && tab === 'register' && (
              <>
                <h1 className="font-display text-2xl text-[var(--text-primary)]">
                  عضویت در اورا
                </h1>
                <p className="font-farsi text-sm text-[var(--text-secondary)] mt-1">
                  سفر معنوی خود را آغاز کن
                </p>
              </>
            )}
            {showForgot && (
              <>
                <h1 className="font-display text-2xl text-[var(--text-primary)]">
                  بازیابی رمز عبور
                </h1>
                <p className="font-farsi text-sm text-[var(--text-secondary)] mt-1">
                  ایمیل خود را وارد کنید
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Section 3 — Tab switcher */}
      {!showForgot && (
        <div className="flex px-4 gap-2 mb-2">
          <button
            onClick={() => { setTab('login'); setError(''); setSuccess('') }}
            className="flex-1 py-2.5 rounded-xl border font-farsi text-sm min-h-11 transition-all duration-200"
            style={{
              background: tab === 'login' ? 'rgba(254,203,125,0.15)' : 'rgba(255,255,255,0.03)',
              borderColor: tab === 'login' ? 'rgba(254,203,125,0.40)' : 'rgba(255,255,255,0.06)',
              color: tab === 'login' ? 'var(--gold-accent)' : 'var(--text-secondary)',
            }}
          >
            ورود
          </button>
          <button
            onClick={() => { setTab('register'); setError(''); setSuccess('') }}
            className="flex-1 py-2.5 rounded-xl border font-farsi text-sm min-h-11 transition-all duration-200"
            style={{
              background: tab === 'register' ? 'rgba(254,203,125,0.15)' : 'rgba(255,255,255,0.03)',
              borderColor: tab === 'register' ? 'rgba(254,203,125,0.40)' : 'rgba(255,255,255,0.06)',
              color: tab === 'register' ? 'var(--gold-accent)' : 'var(--text-secondary)',
            }}
          >
            ثبت‌نام
          </button>
        </div>
      )}

      {/* Section 4 — Form body */}
      <section className="px-4 py-2 flex flex-col gap-3">
        {/* Error banner */}
        {error && (
          <div className="rounded-xl p-3 font-farsi text-sm text-center" dir="rtl"
               style={{ background: 'rgba(192,57,43,0.15)', border: '1px solid rgba(192,57,43,0.30)', color: 'var(--text-primary)' }}>
            {error}
          </div>
        )}

        {/* Success banner */}
        {success && (
          <div className="rounded-xl p-3 font-farsi text-sm text-center" dir="rtl"
               style={{ background: 'rgba(39,174,96,0.15)', border: '1px solid rgba(39,174,96,0.30)', color: 'var(--text-primary)' }}>
            {success}
          </div>
        )}

        {/* LOGIN form */}
        {tab === 'login' && !showForgot && (
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1" dir="rtl">
              <label className="font-farsi text-xs text-[var(--text-secondary)]">ایمیل</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.10] rounded-xl px-4 py-3 font-farsi text-sm text-[var(--text-primary)] min-h-11 outline-none focus:border-[var(--gold-accent)]/50 transition-colors"
                dir="rtl"
              />
            </div>
            <div className="flex flex-col gap-1" dir="rtl">
              <label className="font-farsi text-xs text-[var(--text-secondary)]">رمز عبور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.10] rounded-xl px-4 py-3 font-farsi text-sm text-[var(--text-primary)] min-h-11 outline-none focus:border-[var(--gold-accent)]/50 transition-colors"
                dir="rtl"
              />
            </div>
            <button
              onClick={() => { setShowForgot(true); setError(''); setSuccess('') }}
              className="font-farsi text-xs text-[var(--gold-accent)] self-end text-left"
            >
              فراموشی رمز عبور؟
            </button>
            <button
              onClick={handleLogin}
              disabled={isSubmitting}
              className="w-full min-h-11 rounded-xl font-farsi text-sm font-bold transition-all duration-200 active:scale-[0.98]"
              style={{ background: 'var(--gold-accent)', color: 'var(--cosmic-dark)' }}
            >
              {isSubmitting ? 'در حال ورود...' : 'ورود به حساب'}
            </button>
          </div>
        )}

        {/* REGISTER form */}
        {tab === 'register' && !showForgot && (
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1" dir="rtl">
              <label className="font-farsi text-xs text-[var(--text-secondary)]">نام و نام خانوادگی</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.10] rounded-xl px-4 py-3 font-farsi text-sm text-[var(--text-primary)] min-h-11 outline-none focus:border-[var(--gold-accent)]/50 transition-colors"
                dir="rtl"
              />
            </div>
            <div className="flex flex-col gap-1" dir="rtl">
              <label className="font-farsi text-xs text-[var(--text-secondary)]">ایمیل</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.10] rounded-xl px-4 py-3 font-farsi text-sm text-[var(--text-primary)] min-h-11 outline-none focus:border-[var(--gold-accent)]/50 transition-colors"
                dir="rtl"
              />
            </div>
            <div className="flex flex-col gap-1" dir="rtl">
              <label className="font-farsi text-xs text-[var(--text-secondary)]">شماره موبایل</label>
              <input
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.10] rounded-xl px-4 py-3 font-farsi text-sm text-[var(--text-primary)] min-h-11 outline-none focus:border-[var(--gold-accent)]/50 transition-colors"
                dir="rtl"
              />
            </div>
            <div className="flex flex-col gap-1" dir="rtl">
              <label className="font-farsi text-xs text-[var(--text-secondary)]">رمز عبور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.10] rounded-xl px-4 py-3 font-farsi text-sm text-[var(--text-primary)] min-h-11 outline-none focus:border-[var(--gold-accent)]/50 transition-colors"
                dir="rtl"
              />
            </div>
            <div className="flex flex-col gap-1" dir="rtl">
              <label className="font-farsi text-xs text-[var(--text-secondary)]">تکرار رمز عبور</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.10] rounded-xl px-4 py-3 font-farsi text-sm text-[var(--text-primary)] min-h-11 outline-none focus:border-[var(--gold-accent)]/50 transition-colors"
                dir="rtl"
              />
            </div>
            <button
              onClick={handleRegister}
              disabled={isSubmitting}
              className="w-full min-h-11 rounded-xl font-farsi text-sm font-bold transition-all duration-200 active:scale-[0.98]"
              style={{ background: 'var(--gold-accent)', color: 'var(--cosmic-dark)' }}
            >
              {isSubmitting ? 'در حال ثبت‌نام...' : 'ایجاد حساب کاربری'}
            </button>
          </div>
        )}

        {/* FORGOT PASSWORD form */}
        {showForgot && (
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1" dir="rtl">
              <label className="font-farsi text-xs text-[var(--text-secondary)]">ایمیل</label>
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.10] rounded-xl px-4 py-3 font-farsi text-sm text-[var(--text-primary)] min-h-11 outline-none focus:border-[var(--gold-accent)]/50 transition-colors"
                dir="rtl"
              />
            </div>
            <button
              onClick={handleForgot}
              disabled={isSubmitting}
              className="w-full min-h-11 rounded-xl font-farsi text-sm font-bold transition-all duration-200 active:scale-[0.98]"
              style={{ background: 'var(--gold-accent)', color: 'var(--cosmic-dark)' }}
            >
              {isSubmitting ? 'در حال ارسال...' : 'ارسال لینک بازیابی'}
            </button>
            <button
              onClick={() => { setShowForgot(false); setError(''); setSuccess('') }}
              className="font-farsi text-xs text-[var(--text-muted)] text-center"
            >
              → بازگشت به ورود
            </button>
          </div>
        )}
      </section>

      {/* Section 5 — Bottom note */}
      {!showForgot && (
        <p className="text-center font-farsi text-xs text-[var(--text-muted)] px-4 pb-8 mt-2" dir="rtl">
          {tab === 'login' ? (
            <>
              حساب کاربری ندارید؟{' '}
              <button onClick={() => setTab('register')} className="text-[var(--gold-accent)]">
                ثبت‌نام کنید
              </button>
            </>
          ) : (
            <>
              قبلاً ثبت‌نام کرده‌اید؟{' '}
              <button onClick={() => setTab('login')} className="text-[var(--gold-accent)]">
                وارد شوید
              </button>
            </>
          )}
        </p>
      )}
    </main>
  )
}
