/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  //agrego la configuración de eslint porque se rompe si alguien sube imágenes
  //que no tengan urls
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["api.lorem.space", "placeimg.com", "placeing.com", "source.unsplash.com", "tailwindui.com", "images.unsplash.com", "ui-avatars.com"],
  },
};

module.exports = nextConfig;
