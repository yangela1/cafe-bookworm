import Hero from '@/app/_components/HomeHero'
import LatestReviews from '@/app/_components/LatestReviews'

export default function Home() {
  return (
    <div className="">
      <main>
        <Hero />
        <LatestReviews />
      </main>

      <footer className=""></footer>
    </div>
  );
}
