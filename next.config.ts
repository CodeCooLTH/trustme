import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  allowedDevOrigins: ['deepth.local', 'seller.deepth.local', 'admin.deepth.local'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.fbcdn.net' },
      { protocol: 'https', hostname: 'platform-lookaside.fbsbx.com' },
    ],
  },
}

export default nextConfig
