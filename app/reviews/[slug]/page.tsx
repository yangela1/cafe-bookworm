import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { MapPinIcon, MapPinLineIcon, StarIcon, CurrencyDollarIcon, CoffeeIcon, ForkKnifeIcon, ProhibitIcon } from '@phosphor-icons/react/dist/ssr'
import CopyAddressButton from '@/app/_components/CopyAddressButton'

const FOOD_KEYWORDS = [
  'cake', 'tart', 'bread', 'sandwich', 'waffle', 'croissant', 'pastry', 'cookie',
  'muffin', 'bagel', 'quiche', 'pie', 'scone', 'panini', 'donut', 'taiyaki',
  'mochi', 'bun', 'cheesecake', 'brownie', 'biscuit', 'toast', 'crepe', 'danish',
  'loaf', 'macaron', 'eclair', 'cupcake', 'gelato', 'salad', 'soup', 'burger',
  'pizza', 'wrap', 'burrito', 'pancake', 'souffle', 'chocolates',
]

function isFoodItem(item: string) {
  const lower = item.toLowerCase()
  return FOOD_KEYWORDS.some(keyword => lower.includes(keyword))
}

export default async function CafePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // Fetch the cafe directly from Postgres using the slug!
  const cafe = await prisma.cafe.findUnique({
    where: { slug },
    include: { images: true, reviews: true, tags: true }
  })

  if (!cafe) notFound()

  const tags = cafe.tags.map(tag => tag.name)
  const review = cafe.reviews[0]

  const description = review ? review.thoughts : 'No review provided yet.'
  const orderItems = review
    ? review.order.split(';').map(item => item.trim()).filter(Boolean)
      .sort((a, b) => Number(isFoodItem(a)) - Number(isFoodItem(b)))
    : []
  const rating = review ? review.rating : 0
  const pricePoint = review ? review.pricePoint : 0
  const recommended = review ? review.recommended : null

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
          <div className="flex justify-between items-start gap-4">
            <div>
              <h1 className="text-2xl font-medium">{cafe.name}</h1>
              <span className="badge badge-ghost mt-1">{cafe.city}</span>
              <div className="flex items-center gap-1.5 text-sm text-base-content/60 mt-2">
                <MapPinLineIcon weight="fill" className="w-4 h-4 shrink-0 text-amber-900" aria-hidden="true" />
                <span>{cafe.address}</span>
                <CopyAddressButton address={cafe.address} />
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="flex items-center gap-0.5 justify-end">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    weight="fill"
                    className={`w-5 h-5 ${i < rating ? 'text-warning' : 'text-base-300'}`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-end mt-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <CurrencyDollarIcon
                    key={i}
                    weight="bold"
                    className={`w-4 h-4 ${i < pricePoint ? 'text-success' : 'text-base-300'}`}
                  />
                ))}
              </div>
              {recommended !== null && (
                <div className="badge badge-outline badge-sm mt-2">
                  recommended: {recommended ? 'yes' : 'no'}
                </div>
              )}
            </div>
          </div>
          <div className="divider my-0" />
          <p className="text-base-content/80 leading-relaxed">{description}</p>
          {orderItems.length > 0 && (
            <div className="flex flex-col gap-2">
              <h2 className="text-xs font-medium uppercase tracking-wide text-base-content/50">
                What I ordered
              </h2>
              <ul className="flex flex-col gap-1.5">
                {orderItems.map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-base-content/80">
                    {isFoodItem(item) ? (
                      <ForkKnifeIcon weight="fill" className="w-3.5 h-3.5 text-warning shrink-0" aria-hidden="true" />
                    ) : (
                      <CoffeeIcon weight="fill" className="w-3.5 h-3.5 text-warning shrink-0" aria-hidden="true" />
                    )}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              tag === 'closed-down' ? (
                <span key={tag} className="badge badge-error gap-1 text-error-content">
                  <ProhibitIcon weight="bold" className="w-3.5 h-3.5" aria-hidden="true" />
                  {tag}
                </span>
              ) : (
                <span key={tag} className="badge badge-outline">{tag}</span>
              )
            ))}
          </div>
          <div className="flex flex-col items-center justify-center gap-2 h-48 rounded-box border border-dashed border-base-300 bg-base-200 text-base-content/40">
            <MapPinIcon weight="fill" className="w-8 h-8" aria-hidden="true" />
            <span className="text-sm">Map coming soon</span>
          </div>
        </div>
      </div>
    </main>
  )
}
