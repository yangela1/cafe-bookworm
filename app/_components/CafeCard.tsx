import Link from 'next/link'
import { Cafe } from '@/data/cafes'

export default function CafeCard({ cafe }: { cafe: Cafe }) {
    return (
        <Link href={`/reviews/${cafe.slug}`}>
            <div className="card bg-base-100 border border-base-300 hover:shadow-md transition-shadow cursor-pointer h-full">
                <figure className="h-32 w-full overflow-hidden">
                    <img
                        src={cafe.image}
                        alt={cafe.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* <div className="absolute top-2 right-2">
                         <span className="badge badge-primary font-bold shadow-sm">{cafe.rating}.0</span>
                    </div> */}
                </figure>
                <div className="card-body p-3">
                    <h2 className="card-title text-sm">{cafe.name}</h2>
                    <div className="flex justify-between items-center">
                        <span className="badge badge-ghost text-xs">{cafe.neighbourhood}</span>
                        <span className="text-warning text-xs">{'★'.repeat(cafe.rating)}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {cafe.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="badge badge-outline badge-sm">{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    )
}