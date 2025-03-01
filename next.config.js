/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode for development only
  reactStrictMode: process.env.NODE_ENV === 'development',
  
  // Experimental feature to reduce unnecessary re-renders
  experimental: {
    optimizeCss: true,
    scrollRestoration: false,
  },

  images: {
    domains: [
      'hebbkx1anhila5yf.public.blob.vercel-storage.com'
    ],
  },
}

module.exports = nextConfig 