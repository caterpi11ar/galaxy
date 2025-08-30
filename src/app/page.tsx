'use client'

import { GameHeader } from '@/components/game/GameHeader'

export default function UniverseView() {
  return (
    <div className="min-h-screen bg-space-void text-ui-text-primary font-pixel flex flex-col">
      <GameHeader />
    </div>
  )
}
