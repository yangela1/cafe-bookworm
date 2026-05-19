import prisma from '@/lib/prisma'
import CafeCard from '@/app/_components/CafeCard'

export default async function ReviewsPage() {
  // Fetch all cafes from the database
  const cafes = await prisma.cafe.findMany({
    include: { images: true }
  })

  return (
    <main className="max-w mx-auto px-6 py-10">
      <h1 className="text-2xl font-medium mb-6">All reviews</h1>
      <div className="grid grid-cols-3 sm:grid-cols-3 gap-6">
        {cafes.map(cafe => (
          <CafeCard key={cafe.id} cafe={cafe} />
        ))}
      </div>
    </main>
  )
}