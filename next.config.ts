import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // 解决 Konva 在服务端渲染时的 canvas 依赖问题
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || []
      config.externals.push('canvas')
    }
    return config
  },
}

export default nextConfig
