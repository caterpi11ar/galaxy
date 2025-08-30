'use client'

import { useEffect, useState } from 'react'
import { GameHeader } from '@/components/game/GameHeader'
import { ClientOnlyCanvas } from '@/components/game/UniverseCanvas/ClientOnlyCanvas'

export default function UniverseView() {
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 })

  // 在客户端获取窗口大小
  useEffect(() => {
    const updateSize = () => {
      setCanvasSize({
        width: window.innerWidth - 32,
        height: window.innerHeight - 120,
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
      <main className="flex-1 p-4">
        <ClientOnlyCanvas
          width={canvasSize.width}
          height={canvasSize.height}
          className="w-full"
        />
      </main>
    </div>
  )
}
