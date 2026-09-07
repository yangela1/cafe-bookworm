import Link from 'next/link'
import NextImage from 'next/image'
import prisma from '@/lib/prisma'
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr'
import { CITY_OPTIONS } from '@/lib/city'
import { PLACEHOLDER_CAFE_IMAGE } from '@/lib/images'

// Says nothing useful about what a city is like to visit.
const CAPTION_EXCLUDED_TAGS = new Set(['closed-down', 'would-not-return'])
const CAPTION_TAGS = 3

export default async function BrowseCities() {
  const cafes = await prisma.cafe.findMany({
    select: {
      city: true,
      tags: { select: { name: true } },
      images: { select: { url: true }, take: 1 },
    },
  })

  if (cafes.length === 0) return null

  // Roll the cafes up per city: how many, what they're known for, and a photo
  // to lead with once one exists.
  const byCity = new Map<string, { count: number; tags: Map<string, number>; image?: string }>()
  for (const cafe of cafes) {
    const entry = byCity.get(cafe.city) ?? { count: 0, tags: new Map<string, number>() }
    entry.count += 1
    entry.image ??= cafe.images[0]?.url
    for (const { name } of cafe.tags) {
      if (CAPTION_EXCLUDED_TAGS.has(name)) continue
      entry.tags.set(name, (entry.tags.get(name) ?? 0) + 1)
    }
    byCity.set(cafe.city, entry)
  }

  // Busiest city first; ties fall back to the order cities are declared in.
  const tiles = CITY_OPTIONS
    .filter(([value]) => byCity.has(value))
    .map(([value, label], declaredAt) => {
      const { count, tags, image } = byCity.get(value)!
      const topTags = [...tags.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .slice(0, CAPTION_TAGS)
        .map(([name]) => name)
      return { value, label, count, image, topTags, declaredAt }
    })
    .sort((a, b) => b.count - a.count || a.declaredAt - b.declaredAt)

  return (
    <section className="max-w-4xl mx-auto pt-10" aria-labelledby="browse-city-heading">
      <div className="flex justify-between items-baseline mb-4">
        <h2 id="browse-city-heading" className="text-base font-medium">Browse a city</h2>
        <Link
          href="/reviews"
          className="link link-hover text-xs text-base-content/60 inline-flex items-center gap-1"
        >
          All cities
          <ArrowRightIcon weight="bold" className="w-3 h-3" aria-hidden="true" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {tiles.map(tile => (
          <Link
            key={tile.value}
            href={`/reviews?city=${tile.value}`}
            className="group border border-base-300 rounded-2xl overflow-hidden bg-base-100 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="relative h-24">
              <NextImage
                src={tile.image ?? PLACEHOLDER_CAFE_IMAGE}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Keeps the city name legible over both artwork and photos */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent to-[62%]" />
              <div className="absolute left-3 bottom-2.5 flex items-baseline gap-1.5 text-white">
                {/* Matches CafeCard's `card-title text-sm` — 14px / weight 600 */}
                <span className="text-sm font-semibold">{tile.label}</span>
                <span className="text-[11px] font-semibold opacity-85">
                  {tile.count} {tile.count === 1 ? 'cafe' : 'cafes'}
                </span>
              </div>
            </div>
            {tile.topTags.length > 0 && (
              <p className="px-3 pt-2.5 pb-3 text-xs leading-relaxed text-base-content/60">
                {tile.topTags.join(' · ')}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}
