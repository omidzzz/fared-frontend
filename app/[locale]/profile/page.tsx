'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useAuth } from '@/lib/auth-context'

type Tab = 'orders' | 'sessions' | 'retreats' | 'forum' | 'saved' | 'settings'

const iconMap: Record<string, React.ReactNode> = {
  bag: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" width={20} height={20}><path d="M4 4h12l-1.5 11a1.5 1.5 0 01-1.4 1H6.9a1.5 1.5 0 01-1.4-1L4 4z"/><path d="M7 4V3a3 3 0 016 0v1" strokeLinecap="round"/></svg>,
  person: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" width={20} height={20}><circle cx="10" cy="6" r="4"/><path d="M3 18c0-3.9 3-7 7-7s7 3.1 7 7"/></svg>,
  lotus: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" width={20} height={20}><path d="M10 3c-2 3-2 7 0 10 2-3 2-7 0-10z"/><path d="M10 13c-4-2-7-1-10 1 3 2 6 1 10-1zM10 13c4-2 7-1 10 1-3 2-6 1-10-1z"/></svg>,
  chat: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" width={20} height={20}><path d="M15 14a7 7 0 10-10 0v3l4-2h6z"/></svg>,
  heart: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" width={20} height={20}><path d="M10 17s-6-3.5-7.5-8C1 5.5 3.5 3.5 6 3.5c2 0 3 1.5 4 2.5 1-1 2-2.5 4-2.5 2.5 0 5 2 3.5 5.5-1.5 4.5-7.5 8-7.5 8z"/></svg>,
  settings: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" width={20} height={20}><circle cx="10" cy="10" r="2.5"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.9 4.9l1.4 1.4M13.7 13.7l1.4 1.4M4.9 15.1l1.4-1.4M13.7 6.3l1.4-1.4"/></svg>,
}

const orders = [
  { id: 'AV-1024', product: 'Amethyst Cluster', image: '/images/products/stones/amethyst.webp', price: 48, qty: 1, status: 'delivered', date: 'May 12, 2025' },
  { id: 'AV-1025', product: 'Rose Quartz', image: '/images/products/stones/rose-quartz.webp', price: 39, qty: 1, status: 'shipped', date: 'May 8, 2025', trackingNote: 'Tracking Available' },
  { id: 'AV-1023', product: 'Citrine Bracelet', image: '/images/products/accessories/accessories-1.webp', price: 36, qty: 1, status: 'processing', date: 'May 5, 2025' },
  { id: 'AV-1022', product: 'Labradorite Palm Stone', image: '/images/products/stones/labradorite.webp', price: 44, qty: 1, status: 'confirmed', date: 'May 3, 2025', trackingNote: 'Preparing for shipment' },
]

const statusConfig: Record<string, { color: string; icon: string; label: string }> = {
  delivered: { color: '#4ade80', icon: '✓', label: 'Delivered' },
  shipped: { color: '#60a5fa', icon: '🚚', label: 'Shipped' },
  processing: { color: '#f59e0b', icon: '⏳', label: 'Processing' },
  confirmed: { color: '#a78bfa', icon: '✓', label: 'Confirmed' },
  cancelled: { color: '#f87171', icon: '✗', label: 'Cancelled' },
}

function PanelShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'rgba(10,5,30,0.75)', backdropFilter: 'blur(16px)', border: '1px solid rgba(212,175,100,0.15)', borderRadius: 20, overflow: 'hidden' }}>
      <div style={{ padding: '28px 28px 20px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 600, color: '#fff', fontFamily: "'Playfair Display',Georgia,serif", margin: 0 }}>{title}</h1>
        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>{subtitle}</p>
      </div>
      <div style={{ padding: '0 24px 28px' }}>{children}</div>
    </div>
  )
}

export default function ProfilePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<Tab>('orders')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage] = useState(1)

  const navItems: { id: Tab; icon: string; label: string }[] = [
    { id: 'orders', icon: 'bag', label: 'My Orders' },
    { id: 'sessions', icon: 'person', label: 'My Sessions' },
    { id: 'retreats', icon: 'lotus', label: 'My Retreats' },
    { id: 'forum', icon: 'chat', label: 'Forum Activity' },
    { id: 'saved', icon: 'heart', label: 'Saved Items' },
    { id: 'settings', icon: 'settings', label: 'Account Settings' },
  ]

  return (
    <main style={{ minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: '#fff' }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <Image src="/images/hero-backgrounds/user-profile-bg.webp" alt="" fill sizes="100vw" unoptimized priority
               className="object-cover object-center"
               onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
      </div>

      <div className="hidden lg:flex" style={{ position: 'relative', zIndex: 1, minHeight: '100vh', padding: '90px 32px 32px', gap: 24, maxWidth: 1400, margin: '0 auto', boxSizing: 'border-box' }}>
        {/* LEFT SIDEBAR */}
        <aside style={{ width: 260, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12, alignSelf: 'flex-start', position: 'sticky', top: 90 }}>
          {/* Profile card */}
          <div style={{ background: 'rgba(15,8,40,0.82)', backdropFilter: 'blur(16px)', border: '1px solid rgba(212,175,100,0.2)', borderRadius: 20, padding: '32px 20px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 96, height: 96, borderRadius: '50%', border: '2px solid rgba(212,175,100,0.5)', overflow: 'hidden', background: 'rgba(212,175,100,0.1)', boxShadow: '0 0 20px rgba(160,80,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'rgba(212,175,100,0.7)' }}>
              {user?.name?.[0] || 'A'}
            </div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#fff', fontFamily: "'Playfair Display',Georgia,serif", marginTop: 8 }}>{user?.name || 'Anahita'}</h2>
            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)' }}>{user?.email || 'anahita@email.com'}</p>
          </div>

          {/* Nav items */}
          <div style={{ background: 'rgba(15,8,40,0.82)', backdropFilter: 'blur(16px)', border: '1px solid rgba(212,175,100,0.15)', borderRadius: 20, padding: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {navItems.map(item => (
              <button key={item.id} onClick={() => setActiveTab(item.id)} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 12, border: 'none', cursor: 'pointer', textAlign: 'left',
                background: activeTab === item.id ? 'rgba(212,175,100,0.15)' : 'transparent',
                borderLeft: activeTab === item.id ? '3px solid rgba(212,175,100,0.8)' : '3px solid transparent',
                transition: 'all 0.2s ease', color: activeTab === item.id ? '#fff' : 'rgba(255,255,255,0.6)',
                fontSize: '0.88rem', fontWeight: activeTab === item.id ? 600 : 400,
              }}>
                <span style={{ color: activeTab === item.id ? 'rgba(212,175,100,0.9)' : 'rgba(255,255,255,0.5)', display: 'flex' }}>{iconMap[item.icon]}</span>
                {item.label}
              </button>
            ))}
          </div>

          {/* Quote card */}
          <div style={{ background: 'rgba(15,8,40,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(212,175,100,0.15)', borderRadius: 20, padding: '24px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <svg viewBox="0 0 40 40" fill="none" stroke="rgba(212,175,100,0.6)" strokeWidth="1.2" width={40} height={40}>
              <path d="M20 4c-3.5 5-3.5 11 0 16 3.5-5 3.5-11 0-16z"/><path d="M20 20c-5.5-3-11-2-16 1 5.5 3 11 2 16-1zM20 20c5.5-3 11-2 16 1-5.5 3-11 2-16-1z"/>
            </svg>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>You are on a beautiful spiritual journey.</p>
            <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', fontSize: '1rem', color: '#d4af64' }}>Keep shining ✦</p>
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24, minWidth: 0 }}>
          {activeTab === 'orders' && (
            <div style={{ background: 'rgba(10,5,30,0.75)', backdropFilter: 'blur(16px)', border: '1px solid rgba(212,175,100,0.15)', borderRadius: 20, overflow: 'hidden' }}>
              <div style={{ height: 160, backgroundImage: 'url(/images/hero-backgrounds/user-profile-bg.webp)', backgroundSize: 'cover', backgroundPosition: 'center 30%', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(10,5,30,0.95) 100%)' }}/>
                <div style={{ position: 'absolute', bottom: 20, left: 28 }}>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: 600, color: '#fff', fontFamily: "'Playfair Display',Georgia,serif", margin: 0 }}>My Orders</h1>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>Track and review your orders.</p>
                </div>
              </div>
              <div style={{ padding: '20px 24px' }}>
                {/* Filter bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {['all','processing','shipped','delivered','cancelled'].map(f => (
                      <button key={f} onClick={() => setStatusFilter(f)} style={{
                        padding: '8px 18px', borderRadius: 100, border: `1px solid ${statusFilter === f ? 'rgba(212,175,100,0.6)' : 'rgba(255,255,255,0.1)'}`,
                        cursor: 'pointer', fontSize: '0.8rem', letterSpacing: '0.03em',
                        background: statusFilter === f ? 'rgba(212,175,100,0.2)' : 'rgba(255,255,255,0.06)',
                        color: statusFilter === f ? '#fff' : 'rgba(255,255,255,0.55)',
                        transition: 'all 0.2s ease',
                      }}>{f === 'all' ? 'All Orders' : f.charAt(0).toUpperCase() + f.slice(1)}</button>
                    ))}
                  </div>
                  <select style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)', borderRadius: 10, padding: '8px 16px', fontSize: '0.8rem', cursor: 'pointer' }}>
                    <option>All Time</option><option>This Month</option><option>Last 3 Months</option><option>This Year</option>
                  </select>
                </div>

                {/* Order rows */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
                  {orders.filter(o => statusFilter === 'all' || o.status === statusFilter).map(order => {
                    const s = statusConfig[order.status]
                    return (
                      <div key={order.id} dir="ltr" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16, borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <Image src={order.image} alt={order.product} width={72} height={72} unoptimized style={{ borderRadius: 10, objectFit: 'cover', flexShrink: 0 }}/>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', margin: '0 0 4px' }}>{order.product}</h4>
                          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', margin: '0 0 4px' }}>Order #{order.id}</p>
                          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>${order.price}.00 · Qty: {order.qty}</p>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <p style={{ fontSize: '0.88rem', fontWeight: 600, color: s.color, display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end' }}><span>{s.icon}</span>{s.label}</p>
                          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>{order.date}</p>
                          {order.trackingNote && <p style={{ fontSize: '0.72rem', color: '#818cf8', marginTop: 2 }}>{order.trackingNote}</p>}
                        </div>
                        <button style={{ flexShrink: 0, padding: '8px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                          {order.status === 'shipped' ? 'Track Order' : 'View Details'} ›
                        </button>
                      </div>
                    )
                  })}
                </div>

                {/* Pagination */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 24 }}>
                  <button style={{ color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>‹</button>
                  {[1,2].map(i => (
                    <button key={i} style={{ width: 36, height: 36, borderRadius: '50%', border: currentPage === i ? 'none' : '1px solid rgba(255,255,255,0.15)', background: currentPage === i ? 'rgba(212,175,100,0.3)' : 'transparent', color: currentPage === i ? '#fff' : 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '0.85rem' }}>{i}</button>
                  ))}
                  <button style={{ color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>›</button>
                </div>
              </div>
            </div>
          )}

          {/* Support banner */}
          {activeTab === 'orders' && (
            <div style={{ background: 'rgba(10,5,30,0.75)', backdropFilter: 'blur(12px)', border: '1px solid rgba(212,175,100,0.12)', borderRadius: 16, padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <svg viewBox="0 0 40 40" fill="none" stroke="rgba(212,175,100,0.6)" strokeWidth="1.2" width={40} height={40}>
                  <path d="M20 4c-3.5 5-3.5 11 0 16 3.5-5 3.5-11 0-16z"/><path d="M20 20c-5.5-3-11-2-16 1 5.5 3 11 2 16-1zM20 20c5.5-3 11-2 16 1-5.5 3-11 2-16-1z"/>
                </svg>
                <div><p style={{ fontSize: '0.9rem', fontWeight: 600 }}>Need help with your order?</p><p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>Our support team is here for you.</p></div>
              </div>
              <button style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', cursor: 'pointer', whiteSpace: 'nowrap' }}>🎧 Contact Support ›</button>
            </div>
          )}

          {/* Other tabs */}
          {activeTab === 'sessions'   && <PanelShell title="My Sessions" subtitle="Your booked consultation sessions."><p style={{ color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>No sessions booked yet.</p></PanelShell>}
          {activeTab === 'retreats'   && <PanelShell title="My Retreats" subtitle="Your retreat bookings."><p style={{ color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>No retreats booked yet.</p></PanelShell>}
          {activeTab === 'forum'      && <PanelShell title="Forum Activity" subtitle="Your posts and interactions."><p style={{ color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>No forum activity yet.</p></PanelShell>}
          {activeTab === 'saved'      && <PanelShell title="Saved Items" subtitle="Products you've wishlisted."><p style={{ color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>No saved items yet.</p></PanelShell>}
          {activeTab === 'settings'   && (
            <PanelShell title="Account Settings" subtitle="Manage your profile information.">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 480 }}>
                <input placeholder="Full Name" style={{ padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '0.9rem', outline: 'none' }}/>
                <input placeholder="Email" type="email" style={{ padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '0.9rem', outline: 'none' }}/>
                <input placeholder="Phone" type="tel" style={{ padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '0.9rem', outline: 'none' }}/>
                <button style={{ padding: '12px', borderRadius: 12, border: 'none', background: 'rgba(212,175,100,0.2)', color: '#d4af64', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}>Save Changes</button>
              </div>
            </PanelShell>
          )}
        </div>
      </div>
    </main>
  )
}
