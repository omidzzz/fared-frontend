'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import CategoryBackground from '@/components/backgrounds/CategoryBackground'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function RegisterPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' })
  const update = (f: string) => (v: string) => setForm((p) => ({ ...p, [f]: v }))

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
              <h1 className="font-display text-3xl text-[#F0EBE3] mb-2">Begin Your Journey</h1>
              <p className="text-[#B8AEAD] text-sm">Create an account to get started</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" value={form.firstName} onChange={update('firstName')} />
                <Input label="Last Name" value={form.lastName} onChange={update('lastName')} />
              </div>
              <Input
                label="Email"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={update('email')}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Create a password"
                value={form.password}
                onChange={update('password')}
              />

              <Button variant="gold" className="w-full" onClick={() => console.log('Register')}>
                Create Account
              </Button>
            </div>

            <div className="text-center mt-6">
              <p className="text-sm text-[#B8AEAD]">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-[#FECB7D] hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </CategoryBackground>
  )
}
