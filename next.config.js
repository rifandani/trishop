/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
  },
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
}

module.exports = nextConfig
