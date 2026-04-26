export type Cafe = {
  slug: string
  name: string
  neighbourhood: string
  rating: number
  description: string
  tags: string[]
  image: string
}

export const cafes: Cafe[] = [
  {
    slug: 'matchstick-coffee',
    name: 'Matchstick Coffee',
    neighbourhood: 'Chinatown',
    rating: 5,
    description: 'A bright, airy roaster with exceptional single origins and house-made sourdough.',
    tags: ['Third wave', 'Good WiFi', 'Cozy vibes'],
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=500&auto=format&fit=crop',
  },
  {
    slug: 'revolver-coffee',
    name: 'Revolver Coffee',
    neighbourhood: 'Gastown',
    rating: 5,
    description: 'A dedicated focus on the craft of brewing, featuring a rotating selection of global roasters.',
    tags: ['Specialty Coffee', 'Minimalist', 'Expert Baristas'],
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=500&auto=format&fit=crop',
  },
  {
    slug: 'nemesis-coffee',
    name: 'Nemesis Coffee',
    neighbourhood: 'Gastown',
    rating: 4,
    description: 'Cult-favorite spot known for its innovative coffee program and incredible pastries.',
    tags: ['Pastries', 'Modern Space', 'Great Brunches'],
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=500&auto=format&fit=crop',
  },
  {
    slug: 'propaganda-coffee',
    name: 'Propaganda Coffee',
    neighbourhood: 'Chinatown',
    rating: 4,
    description: 'Sleek, minimalist shop serving excellent multi-roaster coffee in a high-ceilinged space.',
    tags: ['Minimalist', 'Quiet', 'Work Friendly'],
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=500&auto=format&fit=crop',
  },
  {
    slug: 'milano-espresso-bar',
    name: 'Milano Espresso Bar',
    neighbourhood: 'Mount Pleasant',
    rating: 5,
    description: 'Award-winning Italian-style roasts with a stunning view of the North Shore mountains.',
    tags: ['Italian Roast', 'Great Views', 'Spacious'],
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=500&auto=format&fit=crop',
  },
  {
    slug: 'kafkas-coffee',
    name: "Kafka's Coffee",
    neighbourhood: 'Main St',
    rating: 4,
    description: 'A community hub featuring local art and consistently great coffee roasted in-house.',
    tags: ['Local Art', 'Community', 'Main St Vibes'],
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=500&auto=format&fit=crop',
  },
]
