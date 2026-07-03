'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import CategoryBackground from '@/components/backgrounds/CategoryBackground'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const TABS = [
  { key: 'profile', label: 'Profile' },
  { key: 'orders', label: 'Orders' },
  { key: 'wishlist', label: 'Wishlist' },
]

const ORDERS = [
  { id: 'ORD-001', date: '2025-05-10', status: 'Delivered', total: 152.0 },
  { id: 'ORD-002', date: '2025-04-28', status: 'Delivered', total: 88.0 },
  { id: 'ORD-003', date: '2025-04-15', status: 'Processing', total: 197.0 },
]

const WISHLIST_ITEMS = [
  { id: '1', name: 'Amethyst Cluster', price: 48, image: '/images/backgrounds/stones-bg.webp' },
  { id: '2', name: 'Sacred Cedar Candle', price: 42, image: '/images/backgrounds/candles-bg.webp' },
]

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <CategoryBackground category="home">
      <div className="min-h-screen pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl text-[#F0EBE3] mb-8">Account</h1>

            <div className="flex items-center gap-2 mb-8">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-5 py-2 rounded-full text-sm transition-all duration-200 ${
                    activeTab === tab.key
                      ? 'bg-[#FECB7D] text-[#0A0A1A] font-medium'
                      : 'glass-light border-white/10 text-[#B8AEAD] hover:text-[#F0EBE3]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === 'profile' && (
              <div
                className="rounded-2xl p-8 space-y-5"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#FECB7D]/20 flex items-center justify-center">
                    <span className="font-display text-2xl text-[#FECB7D]">NS</span>
                  </div>
                  <div>
                    <h2 className="font-display text-xl text-[#F0EBE3]">Nia Sol</h2>
                    <p className="text-sm text-[#B8AEAD]">nia@example.com</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="First Name" value="Nia" onChange={() => {}} />
                  <Input label="Last Name" value="Sol" onChange={() => {}} />
                </div>
                <Input label="Email" type="email" value="nia@example.com" onChange={() => {}} />
                <Button variant="gold">Save Changes</Button>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-3">
                {ORDERS.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-xl p-5 flex items-center justify-between"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div>
                      <p className="text-sm text-[#F0EBE3] font-medium">{order.id}</p>
                      <p className="text-xs text-[#B8AEAD]">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-[#FECB7D]">${order.total.toFixed(2)}</p>
                      <span className="text-[10px] uppercase tracking-wider text-[#27AE60]">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {WISHLIST_ITEMS.map((item) => (
                  <Link key={item.id} href={`/product/${item.id}`}>
                    <div
                      className="rounded-xl p-4 flex items-center gap-4 transition-colors hover:bg-white/[0.05]"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <div
                        className="w-16 h-16 rounded-lg bg-cover bg-center flex-shrink-0"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div>
                        <p className="text-sm text-[#F0EBE3]">{item.name}</p>
                        <p className="text-sm text-[#FECB7D]">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </CategoryBackground>
  )
}
