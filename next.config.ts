import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Rimosso output: "export" per abilitare ISR
  // Con ISR il sito si aggiorna automaticamente quando cambiano i dati su Strapi

  trailingSlash: true,

  images: {
    // Domini remoti per le immagini di Strapi
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dmg-backend.altera.consulting",
        port: "",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1338",
        pathname: "/uploads/**",
      },
    ],
  },

  // Variabili ambiente pubbliche (opzionale, ma utile per debugging)
  env: {
    NEXT_PUBLIC_STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
