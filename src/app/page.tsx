'use client'

import { useEffect, useState } from 'react'
import { GameHeader } from '@/components/game/GameHeader'
import { ClientOnlyCanvas } from '@/components/game/UniverseCanvas/ClientOnlyCanvas'

export default function UniverseView() {
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 })

  // 在客户端获取窗口大小
  useEffect(() => {
    const updateSize = () => {
      // 响应式 padding: 移动端 16px (p-2), 桌面端 32px (p-4)
      const isMobile = window.innerWidth < 480
      const padding = isMobile ? 16 : 32
      const headerHeight = isMobile ? 56 : 64 // 移动端头部更高

      setCanvasSize({
        width: window.innerWidth - padding,
        height: window.innerHeight - headerHeight - padding,
      })
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return (
    <div className="min-h-screen bg-space-void text-ui-text-primary font-pixel flex flex-col">
      <GameHeader />

      {/* 主要内容区域 - 宇宙画布 */}
      <main className="flex-1 p-2 pixel-sm:p-4">
        <ClientOnlyCanvas
          width={canvasSize.width}
          height={canvasSize.height}
          className="w-full"
        />
      </main>
    </div>
  )
}
