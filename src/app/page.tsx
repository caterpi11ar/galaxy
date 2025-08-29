'use client'

import { useState } from 'react'
import { LoginModal } from '@/components/auth'
import { GameHeader } from '@/components/game/GameHeader'

export default function UniverseView() {
  const [showLoginModal, setShowLoginModal] = useState(false)

  return (
    <div className="min-h-screen bg-space-void text-ui-text-primary font-pixel flex flex-col">
      <GameHeader />
      {/* 登录弹窗 */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  )
}
