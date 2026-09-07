'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import { matchesQuery } from '@/lib/cafeSearch'

type CafeResult = {
  slug: string
  name: string
  city: string
  address: string
  tags: string[]
  imageUrl: string | null
}

const MAX_SUGGESTIONS = 6

// 'compact' is the navbar pill; 'wide' is the full-width bar on the home page.
type Variant = 'compact' | 'wide'

export default function SearchBar({
  variant = 'compact',
  initialQuery = '',
}: {
  variant?: Variant
  /** Current search term, so a results page can show what was searched.
   *  Passed in from the server rather than read with useSearchParams, which
   *  would break the static prerender of the pages this also renders on. */
  initialQuery?: string
}) {
  const isWide = variant === 'wide'
  // The long form names every axis matchesQuery() actually searches; the navbar
  // pill is too narrow to show it without truncating.
  const placeholder = isWide
    ? 'Search by cafe, city, or address...'
    : 'Search for cafes...'
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

  const [query, setQuery] = useState(initialQuery)
  const [cafes, setCafes] = useState<CafeResult[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Re-sync when navigation changes the active search, so the box never
  // disagrees with the results being shown.
  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  useEffect(() => {
    fetch('/api/cafes')
      .then(res => res.json())
      .then((data: CafeResult[]) => setCafes(data))
      .catch(() => setCafes([]))
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const suggestions = useMemo(() => {
    if (!query.trim()) return []
    return cafes.filter(cafe => matchesQuery(cafe, query)).slice(0, MAX_SUGGESTIONS)
  }, [cafes, query])

  const goToResults = () => {
    setIsOpen(false)
    const trimmed = query.trim()

    // Keep any filters already applied on the results page — searching should
    // narrow what you're looking at, not silently reset it. Read from the live
    // URL in the handler rather than useSearchParams(), which would opt the
    // statically prerendered home page into client rendering.
    const onResults = typeof window !== 'undefined' && window.location.pathname === '/reviews'
    const params = new URLSearchParams(onResults ? window.location.search : '')

    if (trimmed) params.set('q', trimmed)
    else params.delete('q')

    const next = params.toString()
    router.push(next ? `/reviews?${next}` : '/reviews')
  }

  return (
    <div ref={containerRef} className={`relative w-full ${isWide ? '' : 'md:w-[240px]'}`}>
      {isWide ? (
        <div className="w-full flex items-stretch border-2 border-base-content rounded-[14px] overflow-hidden bg-base-100">
          <div className="flex-1 min-w-0 flex items-center gap-2.5 px-4 py-3.5">
            <MagnifyingGlassIcon
              weight="bold"
              className="w-[17px] h-[17px] shrink-0 text-base-content/45"
              aria-hidden="true"
            />
            <input
              className="flex-1 min-w-0 text-[14.5px] bg-transparent outline-none placeholder:text-base-content/40"
              value={query}
              onChange={e => {
                setQuery(e.target.value)
                setIsOpen(true)
              }}
              onFocus={() => setIsOpen(true)}
              onKeyDown={e => {
                if (e.key === 'Enter') goToResults()
                if (e.key === 'Escape') setIsOpen(false)
              }}
              placeholder={placeholder}
            />
          </div>
          <button
            onClick={goToResults}
            className="flex items-center gap-1.5 px-[22px] text-sm font-semibold bg-accent text-base-100 hover:opacity-90 transition-opacity"
          >
            <MagnifyingGlassIcon weight="bold" className="w-[15px] h-[15px]" aria-hidden="true" />
            Search
          </button>
        </div>
      ) : (
        <div className="w-full flex items-center gap-[7px] border border-base-300 rounded-lg bg-base-100 px-[11px] py-[6px] transition-all duration-300 focus-within:border-accent">
          <button
            onClick={goToResults}
            aria-label="Search"
            className="shrink-0 opacity-55 hover:opacity-100 transition-opacity"
          >
            <MagnifyingGlassIcon weight="bold" className="w-[13px] h-[13px]" aria-hidden="true" />
          </button>
          <input
            className="flex-1 min-w-0 text-[12.5px] bg-transparent outline-none placeholder:text-base-content/45"
            value={query}
            onChange={e => {
              setQuery(e.target.value)
              setIsOpen(true)
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={e => {
              if (e.key === 'Enter') goToResults()
              if (e.key === 'Escape') setIsOpen(false)
            }}
            placeholder={placeholder}
          />
        </div>
      )}

      {isOpen && query.trim() !== '' && (
        <div className="absolute z-20 mt-1.5 w-full rounded-lg border border-base-300 bg-base-100 overflow-hidden">
          {suggestions.length > 0 ? (
            <ul>
              {suggestions.map(cafe => (
                <li key={cafe.slug}>
                  <Link
                    href={`/reviews/${cafe.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-base-200 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-md overflow-hidden bg-base-200 shrink-0">
                      {cafe.imageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={cafe.imageUrl} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{cafe.name}</p>
                      <p className="text-xs text-base-content/50 truncate">{cafe.city}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-3 text-sm text-base-content/50">No cafes found for &ldquo;{query}&rdquo;</p>
          )}
        </div>
      )}
    </div>
  )
}
