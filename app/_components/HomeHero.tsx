"use client"
import { useState, useEffect } from 'react'

export default function HeroSection() {
    const drinks = [
        { label: "coffee", color: "text-[#6F4E37]" },
        { label: "matcha", color: "text-[#2D5A27]" },
        { label: "tea", color: "text-[#859c73]" }
    ]
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % drinks.length)
        }, 2500)
        return () => clearInterval(timer)
    }, [])

    return (
        <section className="bg-base-200 px-6 py-16 text-center rounded-3xl max-w-4xl mx-auto border border-base-300">
            <p className="text-sm uppercase tracking-[0.2em] font-bold text-base-content/40 mb-6">
                Metro-Vancouver Cafe Reviews
            </p>
            <h1 className="text-4xl font-black mb-6 leading-tight tracking-tight text-base-content">
                Find your next favourite <span className="text-primary">cafe</span>
            </h1>
            <div className="text-base text-base-content/60 max-w-xl mx-auto leading-relaxed flex flex-wrap justify-center items-center gap-1.5">
                <span>Honest reviews and recommendations of</span>
                <span className="relative h-[32px] overflow-hidden inline-flex flex-col font-black min-w-[80px] text-left text-xl -top-px">
                    <span 
                        className="transition-all duration-700 ease-in-out whitespace-nowrap"
                        style={{ transform: `translateY(-${index * 32}px)` }}
                    >
                        {drinks.map((drink, i) => (
                            <span key={i} className={`block h-[32px] leading-[32px] ${drink.color}`}>
                                {drink.label}
                            </span>
                        ))}
                    </span>
                </span>
            </div>
        </section>
    )
}

