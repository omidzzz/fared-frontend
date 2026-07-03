'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import CategoryBackground from '@/components/backgrounds/CategoryBackground'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <CategoryBackground category="home">
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="rounded-2xl p-8"
            style={{
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl text-[#F0EBE3] mb-2">Welcome Back</h1>
              <p className="text-[#B8AEAD] text-sm">Sign in to continue your journey</p>
            </div>

            <div className="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={setEmail}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={setPassword}
              />

              <Button variant="gold" className="w-full" onClick={() => console.log('Login')}>
                Sign In
              </Button>
            </div>

            <div className="text-center mt-6">
              <p className="text-sm text-[#B8AEAD]">
                Don&apos;t have an account?{' '}
                <Link href="/auth/register" className="text-[#FECB7D] hover:underline">
                  Create one
                </Link>
              </p>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-[#B8AEAD]">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <div className="mt-4">
              <Button variant="secondary" className="w-full" onClick={() => console.log('Google login')}>
                Continue with Google
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </CategoryBackground>
  )
}
