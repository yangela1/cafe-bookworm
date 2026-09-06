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

export default function SearchBar() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

  const [query, setQuery] = useState('')
  const [cafes, setCafes] = useState<CafeResult[]>([])
  const [isOpen, setIsOpen] = useState(false)

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
    router.push(`/reviews?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <div ref={containerRef} className="relative w-full md:w-96 lg:w-96">
      <div className="w-full flex border border-base-300 rounded-lg overflow-hidden bg-base-100 transition-all duration-300 focus-within:border-accent">
        <input
          className="flex-1 min-w-0 px-4 py-2.5 text-sm bg-white outline-none placeholder:text-base-content/40"
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
          placeholder="Search for cafes..."
        />
        <button
          onClick={goToResults}
          className="flex items-center gap-1.5 px-6 py-2.5 text-sm bg-accent text-base-100 font-medium hover:opacity-90 transition-opacity"
        >
          <MagnifyingGlassIcon weight="bold" className="w-4 h-4" aria-hidden="true" />
          Search
        </button>
      </div>

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
