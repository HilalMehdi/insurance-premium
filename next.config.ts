import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  basePath: '/insurance-premium',
  assetPrefix: '/insurance-premium/',
  images: { unoptimized: true },
  trailingSlash: true,
}

export default nextConfig
