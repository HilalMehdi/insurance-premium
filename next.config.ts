import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/insurance-premium',
  assetPrefix: '/insurance-premium/',
  images: { unoptimized: true },
  trailingSlash: true,
}

export default nextConfig
