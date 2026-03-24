import SearchBar from "@/app/_components/Searchbar"

export default function HeroSection() {
    return (
        <section className="hero bg-base-200">
            <div className="hero-content text-center flex-col">
                <div className="">
                    <h1 className="text">Metro Vancouver Cafe Reviews</h1>
                    <p className="text-xl py-6">
                        Find your next favourite cafe spot 
                    </p>
                    <p>
                        Honest reviews of cafes across Vancouver*.
                    </p>
                </div>
                   <SearchBar />
            </div>
        </section>
      
    )
}

