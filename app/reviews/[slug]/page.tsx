import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function CafePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  // Fetch the cafe directly from Postgres using the slug!
  const cafe = await prisma.cafe.findUnique({ 
    where: { slug },
    include: { images: true, reviews: true } 
  })

  if (!cafe) notFound()

  // Generate tags dynamically
  const tags = []
  if (cafe.hasWifi) tags.push('Wifi')
  if (cafe.isStudyFriendly) tags.push('Study Friendly')

  // Use review thoughts as description if available
  const description = cafe.reviews.length > 0 ? cafe.reviews[0].thoughts : 'No review provided yet.'
  const rating = cafe.reviews.length > 0 ? cafe.reviews[0].pricePoint : 0

  return (
    <main className="max-w mx-auto px-6 py-10">
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
              <span className="badge badge-ghost mt-1">{cafe.city}</span>
            </div>
            <div className="text-warning text-lg">{'★'.repeat(rating)}</div>
          </div>
          <div className="divider my-0" />
          <p className="text-base-content/80 leading-relaxed">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span key={tag} className="badge badge-outline">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}