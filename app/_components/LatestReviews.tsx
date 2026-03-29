import { cafes } from '@/data/cafes'
import CafeCard from './CafeCard'
import Link from 'next/link'

export default function LatestReviews() {
  const latest = cafes.slice(0, 4)

  return (
    <section className="px-6 py-8">
      <div className="flex justify-between items-baseline mb-4">
        <h2 className="text-base font-medium">Latest reviews</h2>
        <Link href="/reviews" className="link link-hover text-xs text-base-content/60">
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
        {latest.map(cafe => (
          <CafeCard key={cafe.slug} cafe={cafe} />
        ))}
      </div>
    </section>
  )
}