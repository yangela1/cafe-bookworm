import type { Metadata } from "next";
import "@/app/ui/globals.css";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";
import { inter } from "./ui/fonts";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  // Lets pages declare canonical URLs relative to the live domain.
  metadataBase: new URL(SITE_URL),
  title: "cafe bookworm | Metro Vancouver cafe reviews",
  description: "Find your next favourite cafe in Metro Vancouver, BC. Browse reviews, photos, and honest opinions from a Vancouver local.",
  alternates: { canonical: "/" },
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
