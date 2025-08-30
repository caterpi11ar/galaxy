'use client'

import dynamic from 'next/dynamic'

// 动态导入 UniverseCanvas，禁用 SSR
const UniverseCanvas = dynamic(
  () => import('./UniverseCanvas').then(mod => ({ default: mod.UniverseCanvas })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center w-full h-full min-h-[600px] bg-space-void border-2 border-ui-border">
        <div className="text-ui-text-primary font-pixel">
          正在加载宇宙画布...
        </div>
      </div>
    ),
  },
)

interface ClientOnlyCanvasProps {
  width?: number
  height?: number
  className?: string
}

export function ClientOnlyCanvas(props: ClientOnlyCanvasProps) {
  return <UniverseCanvas {...props} />
}
