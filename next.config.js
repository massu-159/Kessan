/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
    appDir: true,
  },
  images: {
    domains: ['plgmtpwjxodyofnrutcn.supabase.co'],
  },
}

module.exports = nextConfig
