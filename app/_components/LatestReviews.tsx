import prisma from '@/lib/prisma'
import CafeCard from './CafeCard'
import Link from 'next/link'

// Most recent visit for a cafe. Cafes with no review yet sort last.
function lastVisited(cafe: { reviews: { dateVisited: Date }[] }) {
  return cafe.reviews.reduce((newest, review) => Math.max(newest, review.dateVisited.getTime()), 0)
}

export default async function LatestReviews() {
  // Prisma can't order a to-many relation by one of its own fields, so rank the
  // cafes here instead of in the query.
  const cafes = await prisma.cafe.findMany({
    include: { images: true, tags: true, reviews: true }
  })

  const latest = [...cafes]
    .sort((a, b) => lastVisited(b) - lastVisited(a))
    .slice(0, 6)

  return (
    <section className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-baseline mb-4">
        <h2 className="text-base font-medium">Latest reviews</h2>
        <Link href="/reviews" className="link link-hover text-xs text-base-content/60">
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {latest.map(cafe => (
          <CafeCard key={cafe.id} cafe={cafe} />
        ))}
      </div>
    </section>
  )
}