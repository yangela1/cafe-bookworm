import Link from 'next/link'
import { Cafe, Image, Review, Tag } from '@prisma/client'
import { StarIcon, CurrencyDollarIcon } from '@phosphor-icons/react/dist/ssr'

// We extend the Cafe type to include the related images, tags, and reviews we fetch
type CafeWithImages = Cafe & { images: Image[]; tags: Tag[]; reviews: Review[] }

export default function CafeCard({ cafe }: { cafe: CafeWithImages }) {
    const tags = cafe.tags.map(tag => tag.name)
    const review = cafe.reviews[0]

    // Get the first image, or the default placeholder from before!
    const imageUrl = cafe.images.length > 0
        ? cafe.images[0].url
        : 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=500&auto=format&fit=crop'

    return (
        <Link href={`/reviews/${cafe.slug}`}>
            <div className="card bg-base-100 border border-base-300 hover:shadow-md transition-shadow cursor-pointer h-full">
                <figure className="h-32 w-full overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={cafe.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </figure>
                <div className="card-body p-3">
                    <h2 className="card-title text-sm">{cafe.name}</h2>
                    <div className="flex justify-between items-center">
                        <span className="badge badge-ghost text-xs">{cafe.city}</span>
                        {review && (
                            <span className="flex items-center gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        weight="fill"
                                        className={`w-3 h-3 ${i < review.rating ? 'text-warning' : 'text-base-300'}`}
                                    />
                                ))}
                            </span>
                        )}
                    </div>
                    {review && (
                        <div className="flex justify-between items-center text-xs mt-1">
                            <span className="text-base-content/50">
                                recommended: {review.recommended ? 'yes' : 'no'}
                            </span>
                            <span className="flex items-center">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <CurrencyDollarIcon
                                        key={i}
                                        weight="bold"
                                        className={`w-3 h-3 ${i < review.pricePoint ? 'text-success' : 'text-base-300'}`}
                                    />
                                ))}
                            </span>
                        </div>
                    )}
                    <div className="flex flex-wrap gap-1 mt-1">
                        {tags.slice(0, 2).map(tag => (
                            <span key={tag} className="badge badge-outline badge-sm">{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    )
}
