'use server'

import prisma from '@/lib/prisma'
import { City } from '@prisma/client'
import { redirect } from 'next/navigation'

export async function createCafe(formData: FormData, imageUrl: string | null) {
  const name = formData.get('name') as string
  const street = formData.get('street') as string
  const city = formData.get('city') as City
  const latitude = parseFloat(formData.get('latitude') as string)
  const hours = formData.get('hours') as string
  const hasWifi = formData.get('hasWifi') === 'on'
  const isLaptopFriendly = formData.get('isLaptopFriendly') === 'on'
  
  const order = formData.get('order') as string
  const pricePoint = parseInt(formData.get('pricePoint') as string) || 3
  const thoughts = formData.get('thoughts') as string
  const recommended = formData.get('recommended') === 'on'
  
  // Create a clean URL slug from the name
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
  
  const newCafe = await prisma.cafe.create({
    data: {
      name,
      slug,
      street,
      city,
      latitude,
      hours,
      hasWifi,
      isLaptopFriendly,
      reviews: {
        create: {
          order,
          pricePoint,
          dateVisited: new Date(),
          thoughts,
          recommended
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
