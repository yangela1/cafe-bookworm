'use client'
import { useState } from 'react'

export default function SearchBar() {
  const [query, setQuery] = useState('')

  return (
    <div className="w-48 flex border border-base-300 rounded-xl overflow-hidden bg-base-100">
      <input
        className="flex-1 min-w-0 px-4 py-2.5 text-sm bg-white outline-none placeholder:text-base-content/40"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search..."
      />
       <button className="px-4 py-2.5 text-sm bg-accent text-base-100 font-medium hover:opacity-90 transition-opacity">
        Search
      </button>
    </div>
  )
}