import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  allowedDevOrigins: ['deepth.local', 'seller.deepth.local', 'admin.deepth.local'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.fbcdn.net' },
      { protocol: 'https', hostname: 'platform-lookaside.fbsbx.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: '*.r2.cloudflarestorage.com' },
      { protocol: 'https', hostname: '*.s3.amazonaws.com' },
    ],
  },
  serverExternalPackages: ['@prisma/client', 'prisma'],
  outputFileTracingExcludes: {
    '*': [
      'theme/**',
      'docs/**',
      'uploads/**',
    ],
  },
}

export default nextConfig
