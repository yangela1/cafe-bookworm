export type Cafe = {
  slug: string
  name: string
  neighbourhood: string
  rating: number
  description: string
  tags: string[]
}

export const cafes: Cafe[] = [
  {
    slug: 'matchstick-coffee',
    name: 'Matchstick Coffee',
    neighbourhood: 'Chinatown',
    rating: 5,
    description: 'A bright, airy roaster with exceptional single origins...',
    tags: ['Third wave', 'Good WiFi', 'Cozy vibes'],
  },
  
]