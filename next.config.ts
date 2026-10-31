import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker imajı için sadece gereken dosyaları paketler
  output: "standalone",
};

export default nextConfig;
