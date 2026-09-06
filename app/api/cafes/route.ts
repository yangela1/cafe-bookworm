import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const cafes = await prisma.cafe.findMany({
    select: {
      slug: true,
      name: true,
      city: true,
      address: true,
      tags: { select: { name: true } },
      images: { take: 1, select: { url: true } },
    },
    orderBy: { name: 'asc' },
  })

  const results = cafes.map(cafe => ({
    slug: cafe.slug,
    name: cafe.name,
    city: cafe.city,
    address: cafe.address,
    tags: cafe.tags.map(tag => tag.name),
    imageUrl: cafe.images[0]?.url ?? null,
  }))

  return NextResponse.json(results)
}
