'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import {
  FunnelXIcon,
  TagIcon,
  MapPinIcon,
  CaretDownIcon,
} from '@phosphor-icons/react'

const SORT_OPTIONS = [
  { value: '', label: 'Sort: default' },
  { value: 'rating-asc', label: 'Rating: low to high' },
  { value: 'rating-desc', label: 'Rating: high to low' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
] as const

// Shared field styling. Deliberately avoids daisyUI's `select` classes: the theme
// sets --border: 2px and select-sm forces a 32px height, which wouldn't match the
// 1px / 5px-9px-padded Tags trigger sitting beside it.
const FIELD =
  'appearance-none bg-base-100 border border-base-300 rounded-lg py-[5px] text-xs font-medium text-base-content cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent'
// Right room for the caret: 6px gap + 8px caret + 2px nudge + 9px padding
const FIELD_X = 'pl-[9px] pr-[25px]'
const CARET =
  'pointer-events-none absolute right-[9px] top-1/2 -translate-y-1/2 w-2 h-2 text-base-content/40'
const LEAD_ICON =
  'pointer-events-none absolute left-[9px] top-1/2 -translate-y-1/2 w-[13px] h-[13px] text-base-content/50'

// `cities` and `tags` come from what's actually attached to a cafe, not from the
// full enum/canonical lists — otherwise the filters drift from the data and offer
// options that match nothing.
export default function FilterBar({
  cities,
  tags,
}: {
  /** [enum value, display label] pairs, already narrowed to cities with cafes. */
  cities: [string, string][]
  tags: string[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const city = searchParams.get('city') ?? ''
  const sort = searchParams.get('sort') ?? ''
  const selectedTags = searchParams.get('tags')?.split(',').filter(Boolean) ?? []

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString())
    for (const [key, value] of Object.entries(updates)) {
      if (value) params.set(key, value)
      else params.delete(key)
    }
    const next = params.toString()
    router.push(next ? `${pathname}?${next}` : pathname)
  }

  function toggleTag(tag: string) {
    const next = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag]
    updateParams({ tags: next.length ? next.join(',') : null })
  }

  const hasFilters = Boolean(city || sort || selectedTags.length)

  return (
    <div className="flex flex-wrap items-center justify-between gap-2.5 bg-base-200 border border-base-300 rounded-2xl px-4 py-3 mb-6">
      <span className="text-[12.5px] font-semibold text-base-content/55">
        Filter
      </span>

      {/* Right-anchored group. Clear leads it and keeps its space when hidden, so
          it only ever eats slack on the left — the fields stay flush to the edge. */}
      <div className="flex flex-wrap items-center justify-end gap-2.5">
        <button
          onClick={() => updateParams({ city: null, sort: null, tags: null })}
          className={`flex items-center gap-1 text-xs font-medium text-base-content/50 hover:text-base-content transition-colors ${hasFilters ? '' : 'invisible'}`}
          aria-hidden={!hasFilters}
          tabIndex={hasFilters ? 0 : -1}
        >
          <FunnelXIcon weight="bold" className="w-3.5 h-3.5" aria-hidden="true" />
          Clear
        </button>

        <div className="relative flex items-center">
          <MapPinIcon weight="fill" className={LEAD_ICON} aria-hidden="true" />
          <select
            aria-label="City"
            // 9px padding + 13px icon + 6px gap = text starts at 28px
            className={`${FIELD} w-28 pl-7 pr-[25px]`}
            value={city}
            onChange={e => updateParams({ city: e.target.value || null })}
          >
            <option value="">All cities</option>
            {cities.map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <CaretDownIcon weight="bold" className={CARET} aria-hidden="true" />
        </div>

        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="flex items-center gap-1.5 bg-base-100 border border-base-300 rounded-lg py-[5px] px-[9px] text-xs font-medium text-base-content cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
          >
            <TagIcon weight="fill" className="w-[13px] h-[13px] text-base-content/50" aria-hidden="true" />
            Tags
            {selectedTags.length > 0 && (
              <span className="flex items-center justify-center w-[15px] h-[15px] rounded-full bg-accent text-accent-content text-[9.5px] font-bold">
                {selectedTags.length}
              </span>
            )}
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-10 w-56 p-2 border border-base-300 max-h-72 overflow-y-auto flex-nowrap"
          >
            {tags.map(tag => (
              <li key={tag}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    checked={selectedTags.includes(tag)}
                    onChange={() => toggleTag(tag)}
                  />
                  <span className="text-sm">{tag}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <label className="relative flex items-center">
          <span className="sr-only">Sort by</span>
          <select
            className={`${FIELD} ${FIELD_X}`}
            value={sort}
            onChange={e => updateParams({ sort: e.target.value || null })}
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <CaretDownIcon weight="bold" className={CARET} aria-hidden="true" />
        </label>
      </div>
    </div>
  )
}
