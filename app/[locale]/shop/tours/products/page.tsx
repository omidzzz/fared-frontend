import Link from 'next/link';

export default function ToursProductsPage() {
  return (
    <main className="page-gradient-heart min-h-screen pt-[80px] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="font-display text-2xl text-[--text-primary] mb-3">Tours Collection</p>
        <p className="font-body text-sm text-[--text-muted] mb-6">Full product list coming soon.</p>
        <Link href="/shop/tours">
          <button className="font-body text-sm px-5 py-2.5 rounded-xl"
                  style={{ border: '1px solid rgba(254,203,125,0.30)', color: 'var(--gold-accent)' }}>
            ← Back
          </button>
        </Link>
      </div>
    </main>
  );
}
