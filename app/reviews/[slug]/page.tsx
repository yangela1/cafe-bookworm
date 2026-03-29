import { cafes } from '@/data/cafes'
import { notFound } from 'next/navigation'

export default async function CafePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cafe = cafes.find(c => c.slug === slug)

  if (!cafe) notFound()

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      <div className="breadcrumbs text-sm mb-6">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/reviews">Reviews</a></li>
          <li>{cafe.name}</li>
        </ul>
      </div>
      <div className="card bg-base-100 border border-base-300">
        <div className="card-body gap-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-medium">{cafe.name}</h1>
              <span className="badge badge-ghost mt-1">{cafe.neighbourhood}</span>
            </div>
            <div className="text-warning text-lg">{'★'.repeat(cafe.rating)}</div>
          </div>
          <div className="divider my-0" />
          <p className="text-base-content/80 leading-relaxed">{cafe.description}</p>
          <div className="flex flex-wrap gap-2">
            {cafe.tags.map(tag => (
              <span key={tag} className="badge badge-outline">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}