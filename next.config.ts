import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;

// bodySizeLimit: Pour augmenter le limite de taille de corps de la requête.