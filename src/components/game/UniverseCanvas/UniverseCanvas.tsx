'use client'

import type Konva from 'konva'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Layer, Rect, Stage } from 'react-konva'
import { useDeviceType, useGestures } from '@/hooks/useGestures'
import { useUniverseCanvas } from '@/hooks/useUniverseCanvas'

import { DebugGrid } from './DebugGrid'
import { Nebulae } from './Nebulae'
import { PlanetComponent } from './PlanetComponent'
import { PlanetInfoPanel } from './PlanetInfoPanel'
// 导入子组件
import { StarField } from './StarField'
import { SystemPanel } from './SystemPanel'
import { UniverseLoadingScreen } from './UniverseLoadingScreen'
import { ZoomControls } from './ZoomControls'

interface UniverseCanvasProps {
  width?: number
  height?: number
  className?: string
}

/**
 * 基于 React Konva 的宇宙画布组件
 * 不使用 document 事件监听器，所有交互都在 Stage 内部处理
 */
export function UniverseCanvas({
  width = 800,
  height = 600,
  className = '',
}: UniverseCanvasProps) {
  const stageRef = useRef<Konva.Stage>(null)
  const lastPointerPos = useRef({ x: 0, y: 0 })

  // 初始化状态
  const [isInitialized, setIsInitialized] = useState(false)

  const {
    viewport,
    planets,
    selectedPlanet,
    isDragging,
    setViewport,
    setSelectedPlanet,
    setIsDragging,
    getPlanetAtPoint,
    zoomIn,
    zoomOut,
    resetViewport,
    getSelectedPlanet,
  } = useUniverseCanvas()

  // 动画时间状态，用于闪烁效果
  const [animationTime, setAnimationTime] = useState(0)
  // 悬停状态
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null)

  // 设备类型检测
  const { hasTouch } = useDeviceType()

  // 初始化和动画循环
  useEffect(() => {
    // 延迟一小段时间来模拟初始化过程，让用户能看到加载界面
    const initTimeout = setTimeout(() => {
      setIsInitialized(true)
    }, 1500) // 1.5秒后显示画布

    let animationFrame: number
    const animate = () => {
      setAnimationTime(Date.now())
      animationFrame = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      clearTimeout(initTimeout)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  // Stage 事件处理 - 统一处理所有输入
  const handleStagePointerDown = useCallback((e: Konva.KonvaEventObject<PointerEvent>) => {
    const stage = e.target.getStage()
    if (!stage)
      return

    // 获取 Konva Stage 内的相对坐标
    const pos = stage.getPointerPosition()
    if (!pos)
      return

    // 将 Stage 坐标转换为世界坐标
    const worldPos = {
      x: (pos.x - viewport.x) / viewport.scale,
      y: (pos.y - viewport.y) / viewport.scale,
    }

    // 检测点击的星球
    const clickedPlanet = getPlanetAtPoint(worldPos.x, worldPos.y)

    if (clickedPlanet) {
      setSelectedPlanet(clickedPlanet.id)
    }
    else {
      setSelectedPlanet(null)
      setIsDragging(true)
      lastPointerPos.current = { x: e.evt.clientX, y: e.evt.clientY }
    }
  }, [viewport, getPlanetAtPoint, setSelectedPlanet, setIsDragging])

  const handleStagePointerMove = useCallback((e: Konva.KonvaEventObject<PointerEvent>) => {
    // 移动端由手势库处理，桌面端继续使用原逻辑
    if (!isDragging || hasTouch)
      return

    e.evt.preventDefault()

    const deltaX = e.evt.clientX - lastPointerPos.current.x
    const deltaY = e.evt.clientY - lastPointerPos.current.y

    // 桌面端也添加阻尼效果
    const dampening = 0.7

    setViewport(prev => ({
      ...prev,
      x: prev.x + deltaX * dampening,
      y: prev.y + deltaY * dampening,
    }))

    lastPointerPos.current = { x: e.evt.clientX, y: e.evt.clientY }
  }, [isDragging, setViewport, hasTouch])

  // 处理鼠标移动（悬停检测）
  const handleStageMouseMove = useCallback((e: Konva.KonvaEventObject<MouseEvent>) => {
    if (isDragging)
      return

    const stage = e.target.getStage()
    if (!stage)
      return

    const pos = stage.getPointerPosition()
    if (!pos)
      return

    const worldPos = {
      x: (pos.x - viewport.x) / viewport.scale,
      y: (pos.y - viewport.y) / viewport.scale,
    }

    const hoveredPlanet = getPlanetAtPoint(worldPos.x, worldPos.y)
    setHoveredPlanet(hoveredPlanet ? hoveredPlanet.id : null)
  }, [isDragging, viewport, getPlanetAtPoint])

  const handleStagePointerUp = useCallback((e: Konva.KonvaEventObject<PointerEvent>) => {
    e.evt.preventDefault()
    setIsDragging(false)
  }, [setIsDragging])

  const handleStageWheel = useCallback((e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault()

    const stage = e.target.getStage()
    if (!stage)
      return

    const pos = stage.getPointerPosition()
    if (!pos)
      return

    // 计算世界坐标中鼠标位置
    const worldPos = {
      x: (pos.x - viewport.x) / viewport.scale,
      y: (pos.y - viewport.y) / viewport.scale,
    }

    const scaleFactor = e.evt.deltaY > 0 ? 0.9 : 1.1
    const newScale = Math.max(0.1, Math.min(5, viewport.scale * scaleFactor))

    const newX = pos.x - worldPos.x * newScale
    const newY = pos.y - worldPos.y * newScale

    setViewport({
      x: newX,
      y: newY,
      scale: newScale,
    })
  }, [viewport, setViewport])

  // 记录上次的偏移量，用于计算增量
  const lastOffsetRef = useRef<[number, number]>([0, 0])

  // 手势绑定配置
  const gestureBinds = useGestures({
    onDrag: ({ offset, down, velocity, first }) => {
      // 只在移动端使用手势库
      if (!hasTouch)
        return

      if (!down) {
        setIsDragging(false)
        lastOffsetRef.current = [0, 0]
        return
      }

      if (first) {
        setIsDragging(true)
        lastOffsetRef.current = offset
        return
      }

      // 只有在拖拽状态下才处理
      if (isDragging) {
        const [currentX, currentY] = offset
        const [lastX, lastY] = lastOffsetRef.current

        // 计算增量移动
        const deltaX = currentX - lastX
        const deltaY = currentY - lastY

        // 根据速度调整移动距离，避免过于敏感
        const maxVelocity = 5
        const velocityMagnitude = Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1])
        const velocityFactor = Math.min(velocityMagnitude, maxVelocity) / maxVelocity
        const dampening = 0.5 + (0.3 * (1 - velocityFactor)) // 速度越快，阻尼越小

        setViewport(prev => ({
          ...prev,
          x: prev.x + deltaX * dampening,
          y: prev.y + deltaY * dampening,
        }))

        // 更新上次偏移量
        lastOffsetRef.current = offset
      }
    },
    onPinch: ({ scale, origin }) => {
      const [originX, originY] = origin

      // 计算缩放中心点的世界坐标
      const worldPos = {
        x: (originX - viewport.x) / viewport.scale,
        y: (originY - viewport.y) / viewport.scale,
      }

      const newScale = Math.max(0.1, Math.min(5, scale))
      const newX = originX - worldPos.x * newScale
      const newY = originY - worldPos.y * newScale

      setViewport({
        x: newX,
        y: newY,
        scale: newScale,
      })
    },
    onWheel: ({ delta }) => {
      const [, deltaY] = delta
      const scaleFactor = deltaY > 0 ? 0.9 : 1.1

      // 获取鼠标位置作为缩放中心
      const centerX = width / 2
      const centerY = height / 2

      const worldPos = {
        x: (centerX - viewport.x) / viewport.scale,
        y: (centerY - viewport.y) / viewport.scale,
      }

      const newScale = Math.max(0.1, Math.min(5, viewport.scale * scaleFactor))
      const newX = centerX - worldPos.x * newScale
      const newY = centerY - worldPos.y * newScale

      setViewport({
        x: newX,
        y: newY,
        scale: newScale,
      })
    },
    disabled: !isInitialized,
    sensitivity: hasTouch ? 0.6 : 0.8, // 移动端更低的灵敏度
  })

  // 如果还未初始化完成，显示加载界面
  if (!isInitialized) {
    return <UniverseLoadingScreen />
  }

  return (
    <div className={`relative ${className}`} {...gestureBinds()}>
      <Stage
        ref={stageRef}
        width={width}
        height={height}
        scaleX={viewport.scale}
        scaleY={viewport.scale}
        x={viewport.x}
        y={viewport.y}
        onPointerDown={handleStagePointerDown}
        onPointerMove={handleStagePointerMove}
        onPointerUp={handleStagePointerUp}
        {...(!hasTouch && { onMouseMove: handleStageMouseMove })}
        {...(!hasTouch && { onWheel: handleStageWheel })}
        className={`
          ${hasTouch ? 'touch-manipulation' : 'cursor-grab active:cursor-grabbing'} 
          border-2 border-ui-border bg-space-void
        `}
        style={{
          imageRendering: 'pixelated', // 保持像素风格
          touchAction: hasTouch ? 'none' : 'auto', // 禁用移动端默认触摸行为
        }}
      >
        {/* 背景层 */}
        <Layer>
          {/* 太空背景 */}
          <Rect
            x={-viewport.x / viewport.scale - width}
            y={-viewport.y / viewport.scale - height}
            width={(width * 3) / viewport.scale}
            height={(height * 3) / viewport.scale}
            fillLinearGradientStartPoint={{ x: 0, y: 0 }}
            fillLinearGradientEndPoint={{ x: 0, y: height / viewport.scale }}
            fillLinearGradientColorStops={[
              0,
              '#1a1a2e',
              0.5,
              '#16213e',
              1,
              '#0a0a0a',
            ]}
          />

          {/* 星云背景 */}
          <Nebulae width={width} height={height} viewport={viewport} />

          {/* 星空背景 */}
          <StarField width={width} height={height} viewport={viewport} animationTime={animationTime} />

          {/* 调试网格 */}
          <DebugGrid width={width} height={height} viewport={viewport} />
        </Layer>

        {/* 星球层 */}
        <Layer>
          {planets.map(planet => (
            <PlanetComponent
              key={planet.id}
              planet={planet}
              selectedPlanet={selectedPlanet}
              hoveredPlanet={hoveredPlanet}
              viewportScale={viewport.scale}
              animationTime={animationTime}
            />
          ))}
        </Layer>
      </Stage>

      {/* UI 组件层 */}
      <SystemPanel
        viewport={viewport}
        planets={planets}
        selectedPlanet={selectedPlanet}
        getSelectedPlanet={getSelectedPlanet}
      />

      <ZoomControls
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        resetViewport={resetViewport}
      />

      <PlanetInfoPanel
        selectedPlanet={selectedPlanet}
        getSelectedPlanet={getSelectedPlanet}
      />
    </div>
  )
}
