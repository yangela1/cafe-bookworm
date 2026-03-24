'use client'
import { useState } from 'react'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  return (
    <div className="join">
    <input
      className="input join-item input-bordered"
      value={query}
      onChange={e => setQuery(e.target.value)}
      placeholder="Search by cafe name or neighbourhood..."
    />
    <button className="btn join-item rounded-r-full">Search</button>
    </div>
  )
}
