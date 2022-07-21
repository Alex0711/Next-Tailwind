/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // eslint: {
  //   ignoreDuringBuilds: true,
  // }, Por si algún día estoy apurado!
  images: {
    domains: ["api.lorem.space", "placeimg.com", "placeing.com", "source.unsplash.com", "tailwindui.com", "images.unsplash.com", "ui-avatars.com"],
  },
};

module.exports = nextConfig;
