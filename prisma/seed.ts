import { PrismaClient, City } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database with all cafes...')

  // Delete existing data to prevent duplicates on multiple seed runs
  await prisma.image.deleteMany()
  await prisma.review.deleteMany()
  await prisma.cafe.deleteMany()

  const cafeData = [
    {
      slug: 'matchstick-coffee',
      name: 'Matchstick Coffee',
      street: 'Chinatown',
      city: City.Richmond,
      siteURL: 'https://matchstickyvr.com/',
      hours: '7:00 AM - 5:00 PM',
      hasWifi: true,
      isStudyFriendly: true,
      googlePlaceId: 'ChIJmatchstick', 
      latitude: 49.279,
      longitude: -123.099,
      review: {
        order: 'Pour Over',
        pricePoint: 5,
        dateVisited: new Date('2026-05-10T10:00:00Z'),
        thoughts: 'A bright, airy roaster with exceptional single origins and house-made sourdough.',
        recommended: true,
      }
    },
    {
      slug: 'revolver-coffee',
      name: 'Revolver Coffee',
      street: 'Gastown',
      city: City.Vancouver,
      siteURL: 'https://revolvercoffee.ca/',
      hours: '8:00 AM - 6:00 PM',
      hasWifi: false,
      isStudyFriendly: false,
      googlePlaceId: 'ChIJrevolver', 
      latitude: 49.283,
      longitude: -123.109,
      review: {
        order: 'Espresso Flight',
        pricePoint: 5,
        dateVisited: new Date('2026-05-11T10:00:00Z'),
        thoughts: 'A dedicated focus on the craft of brewing, featuring a rotating selection of global roasters.',
        recommended: true,
      }
    },
    {
      slug: 'nemesis-coffee-gnw',
      name: 'Nemesis Coffee',
      street: 'Gastown',
      city: City.Vancouver,
      siteURL: 'https://www.nemesis.coffee/',
      hours: '8:00 AM - 4:00 PM',
      hasWifi: true,
      isStudyFriendly: true,
      googlePlaceId: 'ChIJi7b2_Z5xhlQRPZ7s7z1t7sE',
      latitude: 49.2831,
      longitude: -123.1111,
      review: {
        order: 'Flat White, Butter Croissant',
        pricePoint: 4,
        dateVisited: new Date('2026-05-18T10:00:00Z'),
        thoughts: 'Cult-favorite spot known for its innovative coffee program and incredible pastries.',
        recommended: true,
      }
    },
    {
      slug: 'propaganda-coffee',
      name: 'Propaganda Coffee',
      street: 'Chinatown',
      city: City.Vancouver,
      siteURL: 'https://propagandacoffee.ca/',
      hours: '8:00 AM - 5:00 PM',
      hasWifi: true,
      isStudyFriendly: true,
      googlePlaceId: 'ChIJpropaganda', 
      latitude: 49.280,
      longitude: -123.100,
      review: {
        order: 'Cortado',
        pricePoint: 4,
        dateVisited: new Date('2026-05-12T10:00:00Z'),
        thoughts: 'Sleek, minimalist shop serving excellent multi-roaster coffee in a high-ceilinged space.',
        recommended: true,
      }
    },
    {
      slug: 'milano-espresso-bar',
      name: 'Milano Espresso Bar',
      street: 'Mount Pleasant',
      city: City.Vancouver,
      siteURL: 'https://milanocoffee.ca/',
      hours: '7:00 AM - 6:00 PM',
      hasWifi: true,
      isStudyFriendly: true,
      googlePlaceId: 'ChIJmilano', 
      latitude: 49.263,
      longitude: -123.114,
      review: {
        order: 'Americano',
        pricePoint: 5,
        dateVisited: new Date('2026-05-13T10:00:00Z'),
        thoughts: 'Award-winning Italian-style roasts with a stunning view of the North Shore mountains.',
        recommended: true,
      }
    },
    {
      slug: 'kafkas-coffee',
      name: "Kafka's Coffee",
      street: 'Main St',
      city: City.Vancouver,
      siteURL: 'https://kafkascoffee.ca/',
      hours: '7:00 AM - 8:00 PM',
      hasWifi: true,
      isStudyFriendly: true,
      googlePlaceId: 'ChIJkafka', 
      latitude: 49.258,
      longitude: -123.101,
      review: {
        order: 'Batch Brew',
        pricePoint: 4,
        dateVisited: new Date('2026-05-14T10:00:00Z'),
        thoughts: 'A community hub featuring local art and consistently great coffee roasted in-house.',
        recommended: true,
      }
    }
  ]

  for (const item of cafeData) {
    await prisma.cafe.create({
      data: {
        slug: item.slug,
        name: item.name,
        street: item.street,
        city: item.city as City,
        siteURL: item.siteURL,
        hours: item.hours,
        hasWifi: item.hasWifi,
        isStudyFriendly: item.isStudyFriendly,
        googlePlaceId: item.googlePlaceId,
        latitude: item.latitude,
        longitude: item.longitude,
        reviews: {
          create: [
            item.review
          ]
        }
      }
    })
  }

  console.log('Seeded successfully with 6 cafes!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
