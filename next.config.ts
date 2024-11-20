import type { NextConfig } from "next";

const nextConfig : NextConfig = {
  reactStrictMode: true, // Habilitar modo estricto de React
  env: {
    NEXT_PUBLIC_SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    NEXT_PUBLIC_SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI,
    NEXT_PUBLIC_SPOTIFY_SCOPES: process.env.SPOTIFY_SCOPES,
  },
  images: {
    domains: ['i.scdn.co'], // Permitir cargar imágenes desde el dominio de Spotify
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false }; // Soluciona problemas con módulos de servidor
    return config;
  },
};

module.exports = nextConfig;


export default nextConfig;
