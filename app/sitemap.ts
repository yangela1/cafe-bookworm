import type { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'
import { SITE_URL } from '@/lib/site'

// Rebuild hourly so cafes added between deploys still get listed.
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cafes = await prisma.cafe.findMany({
    select: { slug: true },
    orderBy: { name: 'asc' },
  })

  return [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/reviews`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.5 },
    ...cafes.map(cafe => ({
      url: `${SITE_URL}/reviews/${cafe.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
