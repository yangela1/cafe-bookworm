'use server'

import prisma from '@/lib/prisma'
import { City } from '@prisma/client'
import { redirect } from 'next/navigation'
import { normalizeTagName } from '@/lib/tags'

export async function createCafe(formData: FormData, imageUrl: string | null) {
  const name = formData.get('name') as string
  const address = formData.get('address') as string
  const city = formData.get('city') as City
  const latitude = parseFloat(formData.get('latitude') as string)
  const hours = formData.get('hours') as string
  const tagNames = formData.getAll('tags')
    .map(t => normalizeTagName(t as string))
    .filter(Boolean)


  const order = formData.get('order') as string
  const pricePoint = parseInt(formData.get('pricePoint') as string) || 3
  const rating = parseInt(formData.get('rating') as string) || 5
  const thoughts = formData.get('thoughts') as string
  const recommended = formData.get('recommended') === 'on'
  const favourite = formData.get('favourite') === 'on'
  
  // Create a clean URL slug from the name
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
  
  const newCafe = await prisma.cafe.create({
    data: {
      name,
      slug,
      address,
      city,
      latitude,
      hours,
      tags: tagNames.length > 0 ? {
        connectOrCreate: tagNames.map(name => ({
          where: { name },
          create: { name }
        }))
      } : undefined,
      reviews: {
        create: {
          order,
          pricePoint,
          rating,
          dateVisited: new Date(),
          thoughts,
          recommended,
          favourite
        }
      },
      images: imageUrl ? {
        create: {
          url: imageUrl
        }
      } : undefined
    }
  })
  
  // Redirect the user straight to the new cafe's detail page!
  redirect(`/reviews/${newCafe.slug}`)
}
