import { cafes } from '@/data/cafes'
import CafeCard from '@/app/_components/CafeCard'

export default function ReviewsPage() {
  return (
    <main className="max-w mx-auto px-6 py-10">
      <h1 className="text-2xl font-medium mb-6">All reviews</h1>
      <div className="grid grid-cols-3 sm:grid-cols-3 gap-6">
        {cafes.map(cafe => (
          <CafeCard key={cafe.slug} cafe={cafe} />
        ))}
      </div>
    </main>
  )
}