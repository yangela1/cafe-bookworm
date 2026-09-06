import prisma from '@/lib/prisma'
import CafeCard from '@/app/_components/CafeCard'
import { matchesQuery } from '@/lib/cafeSearch'

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const query = q?.trim() ?? ''

  // Fetch all cafes from the database
  const allCafes = await prisma.cafe.findMany({
    include: { images: true, tags: true, reviews: true }
  })

  const cafes = query
    ? allCafes.filter(cafe =>
        matchesQuery(
          { name: cafe.name, city: cafe.city, address: cafe.address, tags: cafe.tags.map(t => t.name) },
          query
        )
      )
    : allCafes

  return (
    <main className="max-w mx-auto px-6 py-10">
      <h1 className="text-2xl font-medium mb-6">
        {query ? `Results for "${query}"` : 'All reviews'}
      </h1>
      {cafes.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-6">
          {cafes.map(cafe => (
            <CafeCard key={cafe.id} cafe={cafe} />
          ))}
        </div>
      ) : (
        <p className="text-base-content/60">No cafes found matching &ldquo;{query}&rdquo;.</p>
      )}
    </main>
  )
}
