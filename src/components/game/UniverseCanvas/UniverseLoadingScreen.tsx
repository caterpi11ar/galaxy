'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

/**
 * 宇宙画布全屏加载界面
 * 像素风格的太空主题加载动画
 */
export function UniverseLoadingScreen() {
  const [loadingDots, setLoadingDots] = useState('')

  // 加载点动画
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingDots((prev) => {
        if (prev.length >= 3)
          return ''
        return `${prev}.`
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  // 生成闪烁的星星
  const generateStars = () => {
    const stars = []
    for (let i = 0; i < 50; i++) {
      const left = Math.random() * 100
      const top = Math.random() * 100
      const delay = Math.random() * 3
      const size = Math.random() * 2 + 1

      stars.push(
        <div
          key={i}
          className="absolute bg-white animate-ping"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: `${size}px`,
            height: `${size}px`,
            animationDelay: `${delay}s`,
            animationDuration: '2s',
          }}
        />,
      )
    }
    return stars
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-space-void overflow-hidden">
      {/* 星空背景 */}
      <div className="absolute inset-0">
        {generateStars()}
      </div>

      {/* 渐变背景 */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at center, rgba(41, 121, 255, 0.1) 0%, transparent 70%)',
        }}
      />

      {/* 主要内容 */}
      <div className="relative z-10 text-center space-y-8">
        {/* Galaxy Logo 区域 - 使用与GameHeader一致的设计 */}
        <div className="relative mb-12">
          <div className="flex flex-col items-center space-y-4">
            {/* 装饰性像素边框容器 - 居中放大版 */}
            <div className="relative bg-space-deep border-2 border-stellar-blue px-6 py-4 shadow-pixel-lg transition-all duration-normal">
              {/* 四角装饰点 */}
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-stellar-purple animate-pixel-pulse" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-stellar-blue" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-stellar-cyan" />
              <div
                className="absolute -bottom-1 -right-1 w-2 h-2 bg-stellar-pink animate-pixel-pulse"
                style={{ animationDelay: '1s' }}
              />

              {/* Logo内容 */}
              <div className="flex items-center gap-4">
                {/* galaxy.svg 图标 - 放大版 */}
                <div className="bg-white p-2 rounded-sm">
                  <Image
                    src="/galaxy.svg"
                    alt="Galaxy"
                    width={48}
                    height={48}
                    className="animate-pixel-pulse"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>

                {/* GALAXY 文字 - 放大版 */}
                <div className="relative">
                  <h1 className="text-4xl font-pixel-display font-bold text-transparent bg-gradient-to-r from-stellar-blue via-stellar-cyan to-stellar-blue bg-clip-text tracking-wide">
                    GALAXY
                  </h1>
                  {/* 文字装饰线 */}
                  <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-stellar-cyan to-transparent animate-pulse" />
                  {/* 闪烁星点 */}
                  <div
                    className="absolute -top-2 right-2 w-1 h-1 bg-stellar-yellow animate-ping"
                    style={{ animationDelay: '2s' }}
                  />
                </div>
              </div>

              {/* 悬停效果光晕 */}
              <div className="absolute inset-0 bg-gradient-to-r from-stellar-blue/5 to-stellar-cyan/5 opacity-50 animate-pulse pointer-events-none" />
            </div>

            {/* 版本标识 - 居中显示在logo下方 */}
            <div className="text-sm font-pixel text-stellar-cyan opacity-60">
              v1.0
            </div>
          </div>
        </div>

        {/* 加载状态 */}
        <div className="space-y-6">
          {/* 加载文本 */}
          <div className="text-2xl font-pixel-display text-ui-text-primary">
            正在初始化宇宙画布
            {loadingDots}
          </div>

          {/* 加载提示 */}
          <div className="text-sm text-ui-text-secondary font-pixel space-y-3 mt-8">
            {/* 主要状态提示 */}
            <div className="flex items-center justify-center space-x-2">
              <div className="w-1 h-1 bg-stellar-cyan animate-pulse" />
              <span>正在初始化星际引擎</span>
              <div className="w-1 h-1 bg-stellar-cyan animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>

            {/* 详细状态 */}
            <div className="text-xs text-ui-text-muted space-y-1">
              <div className="flex items-center justify-center space-x-2 opacity-70">
                <span>⚡</span>
                <span>加载 Konva 渲染引擎</span>
              </div>
              <div className="flex items-center justify-center space-x-2 opacity-50">
                <span>🌌</span>
                <span>生成星球数据</span>
              </div>
              <div className="flex items-center justify-center space-x-2 opacity-30">
                <span>✨</span>
                <span>初始化宇宙画布</span>
              </div>
            </div>
          </div>
        </div>

        {/* 底部装饰 */}
        <div className="mt-12 flex justify-center items-center space-x-2 text-xs text-ui-text-muted">
          <span>Powered by</span>
          <span className="text-stellar-blue animate-pixel-pulse">React Konva</span>
          <div className="w-1 h-1 bg-stellar-blue animate-pixel-pulse" />
        </div>
      </div>

      {/* 边角装饰 */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-stellar-blue animate-pulse" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-stellar-cyan animate-pulse" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-stellar-green animate-pulse" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-stellar-pink animate-pulse" />
    </div>
  )
}
