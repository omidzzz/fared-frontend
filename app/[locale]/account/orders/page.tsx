'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import CategoryBackground from '@/components/backgrounds/CategoryBackground'

const ORDERS = [
  { id: 'ORD-001', date: '2025-05-10', status: 'Delivered', total: 152.0, items: 3 },
  { id: 'ORD-002', date: '2025-04-28', status: 'Delivered', total: 88.0, items: 1 },
  { id: 'ORD-003', date: '2025-04-15', status: 'Processing', total: 197.0, items: 2 },
]

export default function OrdersPage() {
  return (
    <CategoryBackground category="home">
      <div className="min-h-screen pt-28 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <Link href="/account" className="text-[#B8AEAD] hover:text-[#FECB7D] transition-colors text-sm">
                Account
              </Link>
              <span className="text-[#B8AEAD]/30">/</span>
              <h1 className="font-display text-2xl text-[#F0EBE3]">Orders</h1>
            </div>

            <div className="space-y-3">
              {ORDERS.map((order, i) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                >
                  <Link href={`/account/orders/${order.id}`}>
                    <div
                      className="rounded-xl p-5 flex items-center justify-between transition-colors hover:bg-white/[0.05]"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <div>
                        <p className="text-sm text-[#F0EBE3] font-medium">{order.id}</p>
                        <p className="text-xs text-[#B8AEAD]">{order.date} · {order.items} items</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-[#FECB7D] font-semibold">${order.total.toFixed(2)}</p>
                        <span
                          className="text-[10px] uppercase tracking-wider"
                          style={{ color: order.status === 'Delivered' ? '#27AE60' : '#F1C40F' }}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </CategoryBackground>
  )
}
