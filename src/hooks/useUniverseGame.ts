'use client'

import type { Planet } from '@/types'
import { useEffect, useState } from 'react'

export function useUniverseGame() {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [onlineCount, setOnlineCount] = useState(127)

  // 模拟在线人数变化
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount(prev => prev + Math.floor(Math.random() * 3) - 1)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return {
    // 状态
    selectedPlanet,
    isLoggedIn,
    onlineCount,

    // 其他操作
    setSelectedPlanet,
    setIsLoggedIn,
  }
}
