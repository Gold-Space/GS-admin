/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // configured under images 
  // https://nextjs.org/docs/basic-features/images
  images: {
    // allow all
    domains: ['*'],
  },
}

module.exports = nextConfig
