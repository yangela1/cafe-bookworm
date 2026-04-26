import Hero from '@/app/_components/HomeHero'
import LatestReviews from '@/app/_components/LatestReviews'
import Footer from '@/app/_components/Footer'

export default function Home() {
  return (
    <div className="">
      <main>
        <Hero />
        <LatestReviews />
      </main>
    </div>
  );
}
