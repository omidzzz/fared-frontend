'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Input from '@/components/ui/Input'
import Drawer from '@/components/ui/Drawer'
import Modal from '@/components/ui/Modal'
import Spinner from '@/components/ui/Spinner'
import StarRating from '@/components/ui/StarRating'
import ChipTag from '@/components/ui/ChipTag'
import Dropdown from '@/components/ui/Dropdown'
import ChakraIcon from '@/components/ui/ChakraIcon'
import type { ChakraKey } from '@/types/product'

const CHAKRAS: ChakraKey[] = ['root', 'sacral', 'solar', 'heart', 'throat', 'third', 'crown']
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
]

export default function TestPage() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [inputVal, setInputVal] = useState('')
  const [rating, setRating] = useState(3)
  const [sort, setSort] = useState('')
  const [chips, setChips] = useState(['Crystal', 'Meditation', 'Energy'])
  const [activeChip, setActiveChip] = useState('Crystal')

  return (
    <div className="min-h-screen bg-[var(--cosmic-dark)] text-[var(--text-primary)] p-8">
      <h1 className="font-display text-3xl text-[#fecb7d] mb-10">UI Component Library — Test</h1>

      {/* Buttons */}
      <section className="mb-10">
        <h2 className="font-display text-xl mb-4 text-[var(--text-secondary)]">Buttons</h2>
        <div className="flex flex-wrap gap-3 items-center">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="gold">Gold CTA</Button>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="lg">Large</Button>
          <Button variant="primary" loading>Loading</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </section>

      {/* Badges */}
      <section className="mb-10">
        <h2 className="font-display text-xl mb-4 text-[var(--text-secondary)]">Badges</h2>
        <div className="flex flex-wrap gap-2">
          <Badge variant="clothes">Clothes</Badge>
          <Badge variant="stones">Stones</Badge>
          <Badge variant="tours">Tours</Badge>
          <Badge variant="candles">Candles</Badge>
          <Badge variant="courses">Courses</Badge>
          <Badge variant="mentorship">Mentorship</Badge>
          <Badge variant="accessories">Accessories</Badge>
          <Badge variant="new">New</Badge>
          <Badge variant="sale">Sale</Badge>
          <Badge variant="popular">Popular</Badge>
        </div>
      </section>

      {/* Inputs */}
      <section className="mb-10">
        <h2 className="font-display text-xl mb-4 text-[var(--text-secondary)]">Inputs</h2>
        <div className="flex flex-col gap-4 max-w-sm">
          <Input label="Email address" placeholder="you@example.com" type="email" value={inputVal} onChange={setInputVal} />
          <Input placeholder="No label" value="" onChange={() => {}} />
          <Input label="With error" placeholder="Enter value" value="" onChange={() => {}} error="This field is required" />
        </div>
      </section>

      {/* Dropdown */}
      <section className="mb-10">
        <h2 className="font-display text-xl mb-4 text-[var(--text-secondary)]">Dropdown</h2>
        <div className="max-w-xs">
          <Dropdown
            label="Sort by"
            options={SORT_OPTIONS}
            value={sort}
            onChange={setSort}
            placeholder="Choose sort order"
          />
        </div>
      </section>

      {/* Star Rating */}
      <section className="mb-10">
        <h2 className="font-display text-xl mb-4 text-[var(--text-secondary)]">Star Rating</h2>
        <div className="flex flex-col gap-3">
          <StarRating rating={4} size="md" />
          <StarRating rating={rating} size="md" interactive onChange={setRating} />
          <p className="text-sm text-[var(--text-muted)]">Interactive rating: {rating}/5</p>
        </div>
      </section>

      {/* Chip Tags */}
      <section className="mb-10">
        <h2 className="font-display text-xl mb-4 text-[var(--text-secondary)]">Chip Tags</h2>
        <div className="flex flex-wrap gap-2">
          {chips.map((c) => (
            <ChipTag
              key={c}
              label={c}
              active={c === activeChip}
              onClick={() => setActiveChip(c)}
              onRemove={() => setChips((prev) => prev.filter((x) => x !== c))}
            />
          ))}
        </div>
      </section>

      {/* Spinners */}
      <section className="mb-10">
        <h2 className="font-display text-xl mb-4 text-[var(--text-secondary)]">Spinners</h2>
        <div className="flex items-center gap-6">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </div>
      </section>

      {/* Chakra Icons */}
      <section className="mb-10">
        <h2 className="font-display text-xl mb-4 text-[var(--text-secondary)]">Chakra Icons</h2>
        <div className="flex flex-wrap gap-6 items-center">
          {CHAKRAS.map((c) => (
            <div key={c} className="flex flex-col items-center gap-2">
              <ChakraIcon chakra={c} size="lg" animated />
              <ChakraIcon chakra={c} size="md" />
              <ChakraIcon chakra={c} size="sm" />
              <span className="text-xs text-[var(--text-muted)] capitalize">{c}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Drawer & Modal triggers */}
      <section className="mb-10">
        <h2 className="font-display text-xl mb-4 text-[var(--text-secondary)]">Drawer & Modal</h2>
        <div className="flex gap-4">
          <Button variant="secondary" onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
          <Button variant="secondary" onClick={() => setModalOpen(true)}>Open Modal</Button>
        </div>
      </section>

      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} title="Cart" side="right">
        <p className="text-[var(--text-secondary)]">Drawer content goes here.</p>
        <div className="mt-4">
          <Button variant="gold" onClick={() => setDrawerOpen(false)}>Checkout</Button>
        </div>
      </Drawer>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Confirm Action">
        <p className="text-[var(--text-secondary)] mb-4">Are you sure you want to proceed?</p>
        <div className="flex gap-3 justify-end">
          <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button variant="gold" onClick={() => setModalOpen(false)}>Confirm</Button>
        </div>
      </Modal>
    </div>
  )
}
