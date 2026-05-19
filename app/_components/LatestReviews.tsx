import prisma from '@/lib/prisma'
import CafeCard from './CafeCard'
import Link from 'next/link'

export default async function LatestReviews() {
  // Fetch latest 6 cafes from the database, including their images
  const latest = await prisma.cafe.findMany({
    take: 6,
    include: { images: true }
  })

  return (
    <section className="px-6 py-8">
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