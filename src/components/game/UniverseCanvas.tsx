'use client'

import type { MouseEventHandler } from 'react'
import type { Planet } from '@/types'
import { useEffect, useRef } from 'react'

interface UniverseCanvasProps {
  zoom: number
  pan: { x: number, y: number }
  selectedPlanet: Planet | null
  planets: Planet[]
  isDragging?: boolean
  onMouseDown: MouseEventHandler<HTMLCanvasElement>
  onMouseMove: MouseEventHandler<HTMLCanvasElement>
  onMouseUp: () => void
  onClick: MouseEventHandler<HTMLCanvasElement>
  onWheel: (e: React.WheelEvent) => void
}

export function UniverseCanvas({
  zoom,
  pan,
  selectedPlanet,
  planets,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onClick,
  onWheel,
}: UniverseCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
      planets.forEach((planet) => {
        const planetX = (planet.x + pan.x) * zoom
        const planetY = (planet.y + pan.y) * zoom
        const planetSize = planet.size * zoom

        if (planetX > -planetSize && planetX < canvas.width + planetSize
          && planetY > -planetSize && planetY < canvas.height + planetSize) {
          // 星球阴影
          ctx.fillStyle = '#000000'
          ctx.fillRect(planetX + 2, planetY + 2, planetSize, planetSize)

          // 星球本体 (临时使用默认颜色，后续可根据imageUrl加载图片)
          ctx.fillStyle = '#4a90e2'
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
  }, [zoom, pan, selectedPlanet, planets])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onClick={onClick}
      onWheel={onWheel}
      style={{ imageRendering: 'pixelated' }}
    />
  )
}
