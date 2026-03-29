// app/_components/CafeCard.tsx
import Link from 'next/link'
import { Cafe } from '@/data/cafes'

export default function CafeCard({ cafe }: { cafe: Cafe }) {
  return (
    <Link href={`/reviews/${cafe.slug}`}>
      <div className="card bg-base-100 border border-base-300 hover:shadow-md transition-shadow cursor-pointer h-full">
        <div className="card-body p-4 gap-2">
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