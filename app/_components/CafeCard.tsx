import Link from 'next/link'
import NextImage from 'next/image'
import { Cafe, Image, Review, Tag } from '@prisma/client'
import { StarIcon, CurrencyDollarIcon, ProhibitIcon } from '@phosphor-icons/react/dist/ssr'
import { PLACEHOLDER_CAFE_IMAGE } from '@/lib/images'

// We extend the Cafe type to include the related images, tags, and reviews we fetch
type CafeWithImages = Cafe & { images: Image[]; tags: Tag[]; reviews: Review[] }

export default function CafeCard({ cafe }: { cafe: CafeWithImages }) {
    const tags = cafe.tags.map(tag => tag.name)
    const isClosed = tags.includes('closed-down')
    // Bump closed-down to the front so it survives the slice below
    const visibleTags = [...tags].sort((a, b) => Number(b === 'closed-down') - Number(a === 'closed-down'))
    const review = cafe.reviews[0]

    // Get the first image, or the default placeholder from before!
    const imageUrl = cafe.images.length > 0
        ? cafe.images[0].url
        : PLACEHOLDER_CAFE_IMAGE

    return (
        <Link href={`/reviews/${cafe.slug}`}>
            <div className="card bg-base-100 border border-base-300 hover:shadow-md transition-shadow cursor-pointer h-full">
                <figure className="relative h-32 w-full overflow-hidden">
                    <NextImage
                        src={imageUrl}
                        alt={cafe.name}
                        fill
                        // One card per row on phones, two on tablets, three on desktop —
                        // keeps a 130-card grid from fetching full-size images.
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {isClosed && (
                        <div className="absolute top-4 -right-10 w-40 rotate-45 bg-error py-1 flex items-center justify-center gap-1.5 text-error-content text-[11px] font-extrabold uppercase tracking-widest text-center border-y border-error-content/25">
                            <ProhibitIcon weight="bold" className="w-3 h-3 ml-3" aria-hidden="true" />
                            Closed
                        </div>
                    )}
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
                            {review.recommended && (
                                <span className="text-base-content/50">recommended</span>
                            )}
                            {/* ml-auto keeps the price at the right edge when the
                                recommended label is absent */}
                            <span className="flex items-center ml-auto">
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
                        {visibleTags.slice(0, 2).map(tag => (
                            tag === 'closed-down' ? (
                                <span key={tag} className="badge badge-error badge-sm gap-1 text-error-content">
                                    <ProhibitIcon weight="bold" className="w-3 h-3" aria-hidden="true" />
                                    {tag}
                                </span>
                            ) : (
                                <span key={tag} className="badge badge-outline badge-sm">{tag}</span>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    )
}
