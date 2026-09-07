type SearchableCafe = {
  name: string
  city: string
  address: string
  tags: string[]
}

// "NorthVancouver" -> "North Vancouver", for matching against what a user actually types
function humanizeCity(city: string) {
  return city.replace(/([a-z])([A-Z])/g, '$1 $2')
}

// Strips accents, apostrophes, dashes, and other punctuation so "L'OTUS" matches "lotus"
// and "Foret" matches "Forêt"
function normalize(text: string) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/gi, '')
}

// Filler words people type between the parts of a real query, e.g.
// "matcha in Burnaby" or "cafes near Brentwood".
const STOPWORDS = new Set([
  'in', 'at', 'on', 'of', 'the', 'a', 'an', 'and', 'or',
  'near', 'with', 'for', 'to', 'cafe', 'cafes',
])

export function matchesQuery(cafe: SearchableCafe, query: string): boolean {
  // One haystack per cafe so a query can span fields — "burnaby matcha" matches
  // a cafe whose city is Burnaby and whose tag is matcha, which checking each
  // field separately would miss. Normalizing first also collapses kebab-case
  // tags, so "laptop friendly" still finds "laptop-friendly".
  const haystack = normalize(
    [cafe.name, humanizeCity(cafe.city), cafe.address, ...cafe.tags].join(' ')
  )

  const terms = normalize(query)
    .split(/\s+/)
    .filter(Boolean)
    .filter(term => !STOPWORDS.has(term))

  // Nothing meaningful typed (empty, or only filler) — don't filter anything out.
  if (terms.length === 0) return true

  return terms.every(term => haystack.includes(term))
}
