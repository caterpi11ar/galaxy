'use client'

import type { MouseEventHandler } from 'react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface Planet {
  id: number
  name: string
  author: string
  x: number
  y: number
  size: number
  color: string
  likes: number
  dislikes: number
}

// 模拟星球数据
const mockPlanets: Planet[] = [
  { id: 1, name: '火星殖民地', author: 'SpaceExplorer', x: 150, y: 200, size: 24, color: '#f44336', likes: 42, dislikes: 3 },
  { id: 2, name: '蓝色海洋', author: 'DeepSea', x: 300, y: 150, size: 32, color: '#2979ff', likes: 38, dislikes: 1 },
  { id: 3, name: '原谅星球', author: 'TreeLover', x: 450, y: 300, size: 199, color: '#4caf50', likes: 56, dislikes: 2 },
  { id: 4, name: '紫色星云', author: 'CosmicArt', x: 200, y: 350, size: 36, color: '#533483', likes: 29, dislikes: 5 },
  { id: 5, name: '金色沙丘', author: 'DesertKing', x: 380, y: 100, size: 20, color: '#ffeb3b', likes: 33, dislikes: 2 },
  { id: 6, name: '冰晶世界', author: 'FrozenRealm', x: 100, y: 120, size: 26, color: '#00bcd4', likes: 47, dislikes: 1 },
]

export default function UniverseView() {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [onlineCount, setOnlineCount] = useState(127)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // 模拟在线人数变化
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount(prev => prev + Math.floor(Math.random() * 3) - 1)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Canvas绘制星空背景
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas)
      return

    const ctx = canvas.getContext('2d')
    if (!ctx)
      return

    const drawStarfield = () => {
      ctx.fillStyle = '#0a0a0f'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 绘制星星
      for (let i = 0; i < 200; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * 2
        const brightness = Math.random()

        ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`
        ctx.fillRect(x, y, size, size)
      }

      // 绘制星球
      mockPlanets.forEach((planet) => {
        const planetX = (planet.x + pan.x) * zoom
        const planetY = (planet.y + pan.y) * zoom
        const planetSize = planet.size * zoom

        if (planetX > -planetSize && planetX < canvas.width + planetSize
          && planetY > -planetSize && planetY < canvas.height + planetSize) {
          // 星球阴影
          ctx.fillStyle = '#000000'
          ctx.fillRect(planetX + 2, planetY + 2, planetSize, planetSize)

          // 星球本体
          ctx.fillStyle = planet.color
          ctx.fillRect(planetX, planetY, planetSize, planetSize)

          // 星球高光
          ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
          ctx.fillRect(planetX + 2, planetY + 2, planetSize * 0.4, planetSize * 0.4)

          // 选中效果
          if (selectedPlanet?.id === planet.id) {
            ctx.strokeStyle = '#2979ff'
            ctx.lineWidth = 2
            ctx.strokeRect(planetX - 4, planetY - 4, planetSize + 8, planetSize + 8)
          }
        }
      })
    }

    const resizeCanvas = () => {
      // 获取父容器的实际尺寸
      const parentElement = canvas.parentElement
      if (parentElement) {
        const rect = parentElement.getBoundingClientRect()
        canvas.width = rect.width
        canvas.height = rect.height
        drawStarfield()
      }
    }

    // 初始化和监听窗口变化
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // 使用 ResizeObserver 监听父容器大小变化
    const resizeObserver = new ResizeObserver(resizeCanvas)
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement)
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      resizeObserver.disconnect()
    }
  }, [zoom, pan, selectedPlanet])

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

    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect)
      return

    const clickX = e.clientX - rect.left
    const clickY = e.clientY - rect.top

    const clickedPlanet = mockPlanets.find((planet) => {
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
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect)
      return

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

  return (
    <div className="min-h-screen bg-space-void text-ui-text-primary font-pixel flex flex-col">
      {/* 顶部导航栏 */}
      <header className="border-b-2 border-ui-border bg-space-deep px-4 py-2 flex-shrink-0">
        <div className="flex items-center justify-between max-w-full h-10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white p-1 rounded-md">
              <Image
                src="/galaxy.svg"
                alt="Galaxy"
                width={24}
                height={24}
                className="animate-pixel-pulse"
                style={{ imageRendering: 'pixelated' }}
              />
              <h1 className="text-lg font-pixel-display text-stellar-blue">
                GALAXY
              </h1>
            </div>
          </div>

          {/* 导航按钮 */}
          <nav className="flex items-center gap-2">
            {isLoggedIn
              ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsLoggedIn(false)}
                      className="px-2 py-1 bg-ui-surface border-2 border-ui-border text-ui-text-primary text-xs hover:border-stellar-purple transition-colors"
                    >
                      退出
                    </button>
                  </div>
                )
              : (
                  <button
                    onClick={() => setIsLoggedIn(true)}
                    className="px-2 py-1 bg-ui-surface border-2 border-ui-border text-ui-text-primary text-xs hover:border-stellar-purple transition-colors"
                  >
                    登录
                  </button>
                )}

            <button className="px-2 py-1 bg-stellar-orange border-2 border-stellar-orange text-white text-xs hover:bg-stellar-yellow hover:border-stellar-yellow transition-colors">
              排行榜
            </button>
          </nav>
        </div>
      </header>

      {/* 主要宇宙画布区域 */}
      <main className="flex-1 relative overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={handleCanvasClick}
          onWheel={handleWheel}
          style={{ imageRendering: 'pixelated' }}
        />

        {/* 浮动信息面板 */}
        {selectedPlanet && (
          <div className="absolute top-4 left-4 bg-ui-surface border-2 border-ui-border p-4 max-w-sm animate-pixel-slide-down">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg text-stellar-blue">{selectedPlanet.name}</h3>
              <button
                onClick={() => setSelectedPlanet(null)}
                className="text-ui-text-muted hover:text-ui-text-primary text-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-ui-text-secondary">创建者:</span>
                <span className="text-ui-text-primary">{selectedPlanet.author}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-ui-text-secondary">评分:</span>
                <div className="flex items-center gap-2">
                  <span className="text-stellar-green">
                    👍
                    {selectedPlanet.likes}
                  </span>
                  <span className="text-stellar-red">
                    👎
                    {selectedPlanet.dislikes}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 mt-3">
                {isLoggedIn
                  ? (
                      <>
                        <button className="px-3 py-1 bg-stellar-green border-2 border-stellar-green text-white text-xs hover:bg-stellar-cyan hover:border-stellar-cyan transition-colors">
                          👍 点赞
                        </button>
                        <button className="px-3 py-1 bg-stellar-red border-2 border-stellar-red text-white text-xs hover:bg-stellar-pink hover:border-stellar-pink transition-colors">
                          👎 踩
                        </button>
                      </>
                    )
                  : (
                      <div className="text-xs text-ui-text-muted">登录后可评分</div>
                    )}
              </div>
            </div>
          </div>
        )}

        {/* 在线统计（右上角） */}
        <div className="absolute top-4 right-4 bg-ui-surface border-2 border-ui-border p-3 animate-pixel-fade-in">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-stellar-green animate-pixel-pulse"></div>
            <span className="text-ui-text-secondary">在线:</span>
            <span className="text-stellar-green">{onlineCount}</span>
          </div>
        </div>
      </main>

      {/* 底部控制栏 */}
      <footer className="border-t-2 border-ui-border bg-space-deep px-4 py-2 flex-shrink-0">
        <div className="flex items-center justify-between max-w-full h-10">
          {/* 缩放控制 */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleZoomOut}
              className="px-2 py-1 bg-ui-surface border-2 border-ui-border text-ui-text-primary hover:border-stellar-blue transition-colors text-xs"
              title="缩小"
            >
              🔍-
            </button>

            <div className="px-2 py-1 bg-space-medium border border-ui-border text-ui-text-secondary text-xs min-w-12 text-center">
              {Math.round(zoom * 100)}
              %
            </div>

            <button
              onClick={handleZoomIn}
              className="px-2 py-1 bg-ui-surface border-2 border-ui-border text-ui-text-primary hover:border-stellar-blue transition-colors text-xs"
              title="放大"
            >
              🔍+
            </button>

            <button
              onClick={handleResetView}
              className="px-2 py-1 bg-ui-surface border-2 border-ui-border text-ui-text-primary hover:border-stellar-purple transition-colors text-xs"
            >
              重置
            </button>
          </div>

          {/* 中央操作区 */}
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 bg-stellar-green border-2 border-stellar-green text-white hover:bg-stellar-cyan hover:border-stellar-cyan transition-colors text-xs">
              🎨 创建星球
            </button>

            {isLoggedIn && (
              <button className="px-2 py-1 bg-stellar-purple border-2 border-stellar-purple text-white hover:bg-stellar-blue hover:border-stellar-blue transition-colors text-xs">
                🌍 我的星球
              </button>
            )}
          </div>

          {/* 位置信息 */}
          <div className="text-xs text-ui-text-muted hidden sm:block w-40 text-right">
            位置: (
            {Math.round(-pan.x)}
            ,
            {' '}
            {Math.round(-pan.y)}
            )
          </div>
        </div>
      </footer>
    </div>
  )
}
