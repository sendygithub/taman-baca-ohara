import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 reactStrictMode: true,
  images: {
    domains: ['picsum.photos'], // <-- tambahkan domain gambar eksternal
  },

  reactCompiler: true,
};

export default nextConfig;
