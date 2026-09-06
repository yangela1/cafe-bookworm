import { PrismaClient, City } from '@prisma/client'

const prisma = new PrismaClient()

function priceToInt(price: string) {
  return price.length
}

async function main() {
  console.log('Seeding database with completed reviews...')

  // Delete existing data to prevent duplicates on multiple seed runs
  await prisma.image.deleteMany()
  await prisma.review.deleteMany()
  await prisma.cafe.deleteMany()
  await prisma.tag.deleteMany()

  const cafeData = [
    {
      slug: 'thierry-mount-pleasant',
      name: 'Thierry Mount Pleasant',
      address: '265 E 10th Ave, Vancouver, BC V5T 4V1',
      city: City.Vancouver,
      tags: ['laptop-friendly', 'outlets', 'coffee', 'spacious'],
      review: {
        order: 'salted caramel cold chocolate; chocolates; iced latte',
        pricePoint: priceToInt('$$$'),
        dateVisited: new Date(),
        thoughts:
          'A comfy, fancy coffee spot that opens late. Delicious drinks & chocolates that are great for studying and hanging out.',
        recommended: true,
        rating: 4,
      },
    },
    {
      slug: 'small-victory-bakery',
      name: 'Small Victory Bakery',
      address: '4580 Brentwood Blvd #1214, Burnaby, BC V5C 0K3',
      city: City.Burnaby,
      tags: ['coffee', 'specialty-drinks', 'dessert', 'baked-goods'],
      review: {
        order: 'lemon tart; spanish latte; iced latte; iced vanilla hojicha (mid)',
        pricePoint: priceToInt('$$$'),
        dateVisited: new Date(),
        thoughts:
          "Located in Brentwood, I come here often to pick up coffee and study in the food court area upstairs - it's a pretty small shop and it's often busy. Their lemon tarts are delicious and their coffee is strong.They have a free fountain to fill up water too.",
        recommended: true,
        rating: 4,
      },
    },
    {
      slug: 'lotus-cake-boutique-burnaby',
      name: "L'OTUS Cake Boutique Burnaby",
      address: '4352 Beresford St., Burnaby, BC V5H 0G3',
      city: City.Burnaby,
      tags: ['matcha', 'laptop-friendly', 'cakes'],
      review: {
        order:
          "matcha uji mille crepe (best mille crepe cake I've ever had); chestnut mille crepe; hot fruit tea (warm and comforting)",
        pricePoint: priceToInt('$$$'),
        dateVisited: new Date(),
        thoughts:
          "My go-to cafe to visit with friends - it's peaceful, cute, and most of their stuff are yummy. I would go here for their cakes and fruit tea. They have a 2 hour limit for laptops and no outlets.",
        recommended: true,
        rating: 4,
      },
    },
    {
      slug: 'lotus-cake-boutique-richmond',
      name: "L'OTUS Cake Boutique Richmond",
      address: '8580 Cambie Rd. #103, Richmond, BC V6X 4K1',
      city: City.Richmond,
      tags: [
        'matcha',
        'hojicha',
        'dessert',
        'laptop-friendly',
        'cakes',
        'tea',
        'outlets',
        'baked-goods',
        'specialty-drinks',
      ],
      review: {
        order:
          "green grape passion cake; basque burnt cheesecake (my boyfriend's fave); pu erh milk tea (must try); lychee sunrise tea mocktail; matcha latte oat; jasmine milk tea; cherry blossom festival cakes; mango sticky rice cake (mid); matcha trio seasonal drink combo (amazing); garlic salty bread (not worth); hojicha cream foam brown sugar; iced matcha; iced latte; creme brulee croissant cube",
        pricePoint: priceToInt('$$$'),
        dateVisited: new Date(),
        thoughts:
          "One of my favourite go-to study places and matcha spot. Their matcha is strong and bold. They're open late, have plenty of individual seating, and serve some pretty mindblowing drinks. They have seasonal crepe cakes, and artisinal baked breads that often get sold out by night-time. Their stuff is pricey but worth it. I always go for a matcha drink or whatever they have on their seasonal menu. All their tea drinks are 10/10 - their pu-erh tea is a must try! ",
        recommended: true,
        rating: 5,
        favourite: true,
      },
    },
    {
      slug: 'la-foret-jubilee',
      name: 'La Forêt Jubilee',
      address: '6848 Jubilee Ave, Burnaby, BC V5J 4B3',
      city: City.Burnaby,
      tags: ['dessert', 'laptop-friendly', 'waffles', 'sandwiches', 'cakes', 'ambience'],
      review: {
        order: 'sparklers; matcha cake; london fog (too sweet)',
        pricePoint: priceToInt('$$$'),
        dateVisited: new Date(),
        thoughts:
          "They're known for their ambience - a spacious, airy garage with giant plants. You see lots of people working on their laptops here, it's a busy place but nice to study in if you want to be in a bustling cafe setting. I love their food here - waffles, baked goods, cakes. I've gotten their matcha cakes a few times for birthdays and I recommend it. To be honest, I don't like their drinks here at all, it is very expensive overall, and their matcha is bad and watered down. All the points go to their cool atmosphere and wide selection of food.",
        recommended: true,
        rating: 4,
      },
    },
    {
      slug: 'soon-coffee',
      name: 'Soon Coffee',
      address: 'The Amazing Brentwood Food Hall, 4567 Lougheed Hwy, Burnaby, BC V5C 0K6',
      city: City.Burnaby,
      tags: ['coffee', 'affordable', 'closed-down'],
      review: {
        order: 'roasted green tea smoothie (fave); coffee slushie; hometown favourite latte',
        pricePoint: priceToInt('$'),
        dateVisited: new Date(),
        thoughts:
          'I loved their coffee & roasted green tea slushies - I would visit here everytime I went to Brentwood. They were affordable and lots of their drinks were made with oat & dairy substitutions. Very sad they closed down :(',
        recommended: true,
        rating: 4,
      },
    },
  ]

  for (const item of cafeData) {
    await prisma.cafe.create({
      data: {
        slug: item.slug,
        name: item.name,
        address: item.address,
        city: item.city,
        tags: {
          connectOrCreate: item.tags.map(name => ({
            where: { name },
            create: { name },
          })),
        },
        reviews: {
          create: [item.review],
        },
      },
    })
  }

  console.log(`Seeded successfully with ${cafeData.length} completed reviews!`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
