export type SearchableCafe = {
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

export function matchesQuery(cafe: SearchableCafe, query: string): boolean {
  const q = normalize(query.trim())
  if (!q) return true

  return (
    normalize(cafe.name).includes(q) ||
    normalize(humanizeCity(cafe.city)).includes(q) ||
    normalize(cafe.address).includes(q) ||
    cafe.tags.some(tag => normalize(tag).includes(q))
  )
}
