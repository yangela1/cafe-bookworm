import Link from 'next/link'
import { Cafe, Image } from '@prisma/client'

// We extend the Cafe type to include the related images array that we fetch
type CafeWithImages = Cafe & { images: Image[] }

export default function CafeCard({ cafe }: { cafe: CafeWithImages }) {
    // Dynamically create tags based on the database boolean fields
    const tags = []
    if (cafe.hasWifi) tags.push('Wifi')
    if (cafe.isStudyFriendly) tags.push('Study Friendly')

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
                    </div>
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