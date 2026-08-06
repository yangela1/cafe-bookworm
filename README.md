# Cafe Bookworm

A cafe review platform for Metro Vancouver — discover and review study/work-friendly coffee shops 

## Tech Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS + DaisyUI —  Inter font
- **Database**: PostgreSQL via Prisma ORM
- **File storage**: Vercel Blob (`@vercel/blob`) for cafe images

## Data Model

Defined in `prisma/schema.prisma`:

- **Cafe** — name, street, city (enum), site URL, hours, wifi/laptop-friendly flags, Google Place ID, lat/long
- **Review** — order, price point, date visited, thoughts, recommended flag; belongs to a `Cafe`
- **Image** — photo URL; belongs to a `Cafe`

## Project Structure

- `app/page.tsx` — homepage (hero + latest reviews)
- `app/reviews/` — reviews listing and individual review pages (`[slug]`)
- `app/about/` — about page
- `app/api/upload/` — image upload API route via Vercel Blob *(in progress)*
- `app/_components/` — Navbar, Footer, HomeHero, CafeCard, Searchbar, LatestReviews
- `data/` — static mock data (cafes, nav items), still used alongside the Postgres/Prisma backend
- `prisma/` — schema, migrations, and seed script

See `AGENTS.md` for design principles and contribution guidelines used when working on this project with AI agents.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Prisma client
```
npx prisma generate
```

### Database

This project uses Prisma with PostgreSQL. Set `POSTGRES_PRISMA_URL` and `POSTGRES_URL_NON_POOLING` in `.env`, then:

```bash
npx prisma migrate dev   # apply migrations
npx prisma db seed       # seed with mock cafe data
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
