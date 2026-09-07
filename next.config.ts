import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Hosts next/image is allowed to optimize. Vercel Blob serves uploaded
    // cafe photos; Unsplash is the placeholder used when a cafe has no image.
    remotePatterns: [
      { protocol: "https", hostname: "**.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
