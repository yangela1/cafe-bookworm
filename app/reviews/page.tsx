import prisma from '@/lib/prisma'
import CafeCard from '@/app/_components/CafeCard'
import FilterBar from '@/app/_components/FilterBar'
import { matchesQuery } from '@/lib/cafeSearch'
import Link from 'next/link'
import type { Metadata } from 'next'
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: 'all cafe reviews - Metro Vancouver - cafe bookworm',
  description:
    'Browse every cafe reviewed across Metro Vancouver. Filter by city and tag, or sort by rating and price point.',
  alternates: { canonical: '/reviews' },
}
import { City } from '@prisma/client'
import { CITY_OPTIONS } from '@/lib/city'

const PER_PAGE = 24

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; city?: string; tags?: string; sort?: string; page?: string }>
}) {
  const { q, city, tags, sort, page } = await searchParams
  const query = q?.trim() ?? ''
  const selectedTags = tags?.split(',').filter(Boolean) ?? []

  // Fetch all cafes from the database
  const allCafes = await prisma.cafe.findMany({
    include: { images: true, tags: true, reviews: true }
  })

  // Only offer tags and cities that actually have a cafe, so the filter never
  // lists an option that can't match anything. (The admin form still offers
  // every city — that's where the first cafe in a new one gets added.)
  const [tagOptions, usedCities] = await Promise.all([
    prisma.tag.findMany({
      where: { cafes: { some: {} } },
      orderBy: { name: 'asc' },
      select: { name: true },
    }),
    prisma.cafe.groupBy({ by: ['city'] }),
  ])

  const used = new Set(usedCities.map(row => row.city))
  const cityOptions = CITY_OPTIONS.filter(([value]) => used.has(value))

  let cafes = query
    ? allCafes.filter(cafe =>
        matchesQuery(
          { name: cafe.name, city: cafe.city, address: cafe.address, tags: cafe.tags.map(t => t.name) },
          query
        )
      )
    : allCafes

  if (city) {
    cafes = cafes.filter(cafe => cafe.city === (city as City))
  }

  if (selectedTags.length > 0) {
    cafes = cafes.filter(cafe => {
      const cafeTags = cafe.tags.map(tag => tag.name)
      return selectedTags.every(tag => cafeTags.includes(tag))
    })
  }

  if (sort) {
    const [field, direction] = sort.split('-') as ['rating' | 'price', 'asc' | 'desc']
    cafes = [...cafes].sort((a, b) => {
      const valueOf = (cafe: typeof a) =>
        field === 'rating' ? (cafe.reviews[0]?.rating ?? 0) : (cafe.reviews[0]?.pricePoint ?? 0)
      const diff = valueOf(a) - valueOf(b)
      return direction === 'asc' ? diff : -diff
    })
  }

  const hasFilters = Boolean(query || city || selectedTags.length || sort)

  // Name every constraint that's narrowing the list, so a short result set is
  // never a mystery. `sort` is excluded — it reorders, it doesn't narrow.
  const isNarrowed = Boolean(query || city || selectedTags.length)
  let heading = query ? `Results for "${query}"` : 'All reviews'
  if (selectedTags.length) heading += ` tagged ${selectedTags.join(', ')}`

  const total = allCafes.length
  const noun = (n: number) => (n === 1 ? 'cafe' : 'cafes')
  const count = isNarrowed
    ? `${cafes.length} of ${total} ${noun(total)}`
    : `${total} ${noun(total)}`

  // Paginate after filtering so the count above still describes the whole
  // result set, not just the page being shown.
  const pageCount = Math.max(1, Math.ceil(cafes.length / PER_PAGE))
  const currentPage = Math.min(Math.max(1, Number(page) || 1), pageCount)
  const pageCafes = cafes.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)

  // Carry the active search/filters onto the page links.
  const pageHref = (n: number) => {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (city) params.set('city', city)
    if (selectedTags.length) params.set('tags', selectedTags.join(','))
    if (sort) params.set('sort', sort)
    if (n > 1) params.set('page', String(n))
    const qs = params.toString()
    return qs ? `/reviews?${qs}` : '/reviews'
  }

  return (
    <main className="max-w mx-auto px-6 py-10">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-5">
        <h1 className="text-2xl font-medium">{heading}</h1>
        <span className="text-sm text-base-content/55 tabular-nums">{count}</span>
      </div>
      <FilterBar cities={cityOptions} tags={tagOptions.map(tag => tag.name)} />
      {cafes.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageCafes.map(cafe => (
              <CafeCard key={cafe.id} cafe={cafe} />
            ))}
          </div>

          {pageCount > 1 && (
            <nav
              className="flex items-center justify-center gap-2 mt-10"
              aria-label="Pagination"
            >
              {currentPage > 1 ? (
                <Link href={pageHref(currentPage - 1)} className="btn btn-sm btn-ghost gap-1">
                  <CaretLeftIcon weight="bold" className="w-3.5 h-3.5" aria-hidden="true" />
                  Prev
                </Link>
              ) : (
                <span className="btn btn-sm btn-ghost gap-1 btn-disabled opacity-40">
                  <CaretLeftIcon weight="bold" className="w-3.5 h-3.5" aria-hidden="true" />
                  Prev
                </span>
              )}

              {Array.from({ length: pageCount }).map((_, i) => {
                const n = i + 1
                return n === currentPage ? (
                  <span key={n} className="btn btn-sm btn-neutral pointer-events-none" aria-current="page">
                    {n}
                  </span>
                ) : (
                  <Link key={n} href={pageHref(n)} className="btn btn-sm btn-ghost">
                    {n}
                  </Link>
                )
              })}

              {currentPage < pageCount ? (
                <Link href={pageHref(currentPage + 1)} className="btn btn-sm btn-ghost gap-1">
                  Next
                  <CaretRightIcon weight="bold" className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              ) : (
                <span className="btn btn-sm btn-ghost gap-1 btn-disabled opacity-40">
                  Next
                  <CaretRightIcon weight="bold" className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              )}
            </nav>
          )}
        </>
      ) : hasFilters ? (
        <p className="text-base-content/60">No cafes match these filters.</p>
      ) : (
        <p className="text-base-content/60">No cafes found.</p>
      )}
    </main>
  )
}
