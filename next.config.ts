import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  allowedDevOrigins: ['safepay.local', 'seller.safepay.local', 'admin.safepay.local'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.fbcdn.net' },
      { protocol: 'https', hostname: 'platform-lookaside.fbsbx.com' },
    ],
  },
}

export default nextConfig
