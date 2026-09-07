import Hero from '@/app/_components/HomeHero'
import BrowseCities from '@/app/_components/BrowseCities'
import LatestReviews from '@/app/_components/LatestReviews'

export default async function Home() {
  return (
    <div className="">
      {/* px-6 is the page gutter; each section caps at max-w-4xl so they all
          line up with the hero's outer edge. */}
      <main className="px-6">
        <Hero />
        <BrowseCities />
        <LatestReviews />
      </main>
    </div>
  );
}
