'use client'

import type { MouseEventHandler } from 'react'
import type { Planet } from '@/types/game'
import { useEffect, useState } from 'react'

export function useUniverseGame(planets: Planet[]) {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [onlineCount, setOnlineCount] = useState(127)

  // 模拟在线人数变化
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount(prev => prev + Math.floor(Math.random() * 3) - 1)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // 鼠标事件处理
  const handleMouseDown: MouseEventHandler<HTMLCanvasElement> = (e) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }

  const handleMouseMove: MouseEventHandler<HTMLCanvasElement> = (e) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // 星球点击检测
  const handleCanvasClick: MouseEventHandler<HTMLCanvasElement> = (e) => {
    if (isDragging)
      return

    const canvas = e.currentTarget
    const rect = canvas.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const clickY = e.clientY - rect.top

    const clickedPlanet = planets.find((planet) => {
      const planetX = (planet.x + pan.x) * zoom
      const planetY = (planet.y + pan.y) * zoom
      const planetSize = planet.size * zoom

      return clickX >= planetX && clickX <= planetX + planetSize
        && clickY >= planetY && clickY <= planetY + planetSize
    })

    setSelectedPlanet(clickedPlanet ?? null)
  }

  // 缩放控制
  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.2, 3))
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.3))
  const handleResetView = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  // 鼠标滚轮缩放 - 以鼠标位置为中心缩放
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const canvas = e.currentTarget as HTMLCanvasElement
    const rect = canvas.getBoundingClientRect()

    // 获取鼠标在canvas上的位置
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    // 计算鼠标位置对应的世界坐标
    const worldMouseX = (mouseX - pan.x) / zoom
    const worldMouseY = (mouseY - pan.y) / zoom

    // 计算新的缩放比例
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1
    const newZoom = Math.min(Math.max(zoom * zoomFactor, 0.3), 3)

    // 计算新的平移，使得鼠标位置保持在同一个世界坐标上
    const newPanX = mouseX - worldMouseX * newZoom
    const newPanY = mouseY - worldMouseY * newZoom

    setZoom(newZoom)
    setPan({ x: newPanX, y: newPanY })
  }

  return {
    // 状态
    zoom,
    pan,
    selectedPlanet,
    isDragging,
    isLoggedIn,
    onlineCount,

    // 事件处理器
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleCanvasClick,
    handleZoomIn,
    handleZoomOut,
    handleResetView,
    handleWheel,

    // 其他操作
    setSelectedPlanet,
    setIsLoggedIn,
  }
}
