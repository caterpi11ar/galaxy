import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // 解决 Konva 在服务端渲染时的 canvas 依赖问题
  webpack: (config, { isServer }) => {
    // 在服务端完全忽略 Konva 相关模块
    if (isServer) {
      config.externals = config.externals || []
      config.externals.push({
        'react-konva': 'react-konva',
        'konva': 'konva',
        'canvas': 'canvas',
      })
    }
    return config
  },
  // 实验性功能配置
  experimental: {
    // 优化 CSS 处理
    optimizeCss: false,
  },
}

export default nextConfig
