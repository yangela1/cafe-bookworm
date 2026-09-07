import prisma from '@/lib/prisma'
import Hero from '@/app/_components/HomeHero'
import SearchBar from '@/app/_components/Searchbar'
import LatestReviews from '@/app/_components/LatestReviews'

export default async function Home() {
  const cafeCount = await prisma.cafe.count()

  return (
    <div className="">
      {/* px-6 is the page gutter; each section caps at max-w-4xl so they all
          line up with the hero's outer edge. */}
      <main className="px-6">
        <Hero cafeCount={cafeCount} />
        <section className="max-w-4xl mx-auto pt-8">
          <SearchBar variant="wide" />
        </section>
        <LatestReviews />
      </main>
    </div>
  );
}
