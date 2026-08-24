// Canonical tag list. Keep names lowercase kebab-case so imports and the
// admin form stay consistent for filtering. Add new tags here first,
// then use them in the CSV/admin UI — don't invent variants inline.
export const CANONICAL_TAGS = [
  'laptop-friendly',
  'outlets',
  'spacious',
  'cozy',
  'pricey',
  'affordable',
  'favourite',
  'would-not-return',
  'closed-down',
  'matcha',
  'hojicha',
  'coffee',
  'bubble-tea',
  'dessert',
  'food',
  'bakery',
] as const

export type CanonicalTag = (typeof CANONICAL_TAGS)[number]

export function normalizeTagName(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '')
}
