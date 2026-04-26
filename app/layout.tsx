import type { Metadata } from "next";
import "@/app/ui/globals.css";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";
import { inter } from "./ui/fonts";

export const metadata: Metadata = {
  title: "Cafe Bookworm | Metro Vancouver Cafe Reviews",
  description: "Discover the best coffee spots in Metro Vancouver with honest reviews and curated recommendations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased max-w-4xl mx-auto flex flex-col min-h-screen`}
        cz-shortcut-listen="true"
      >
        <section>
          <Navbar />
        </section>
        <main className="grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
