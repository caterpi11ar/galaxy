'use client'

import { useState } from 'react'
import { LoginModal } from '@/components/auth'

export default function AuthDemoPage() {
  const [showLoginModal, setShowLoginModal] = useState(false)

  return (
    <div className="min-h-screen bg-space-void p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-pixel-display text-ui-text-primary mb-4">
            🌌 Galaxy 认证系统演示
          </h1>
          <p className="text-ui-text-secondary">
            这是登录弹窗组件的演示页面，展示像素风格的认证界面
          </p>
        </header>

        <div className="grid gap-8">
          {/* 登录按钮演示 */}
          <section className="bg-ui-surface border-2 border-ui-border p-8">
            <h2 className="text-2xl font-pixel-display text-ui-text-primary mb-6">
              登录弹窗演示
            </h2>

            <div className="space-y-4">
              <p className="text-ui-text-secondary">
                点击下方按钮打开登录弹窗，体验像素风格的认证界面
              </p>

              <button
                onClick={() => setShowLoginModal(true)}
                className="
                  px-8 py-4 bg-stellar-blue border-2 border-stellar-blue
                  text-ui-text-primary font-pixel font-bold
                  hover:bg-stellar-blue/80 hover:shadow-pixel-md
                  transition-all duration-normal
                  transform hover:translate-x-1 hover:translate-y-1
                "
              >
                🚀 打开登录弹窗
              </button>
            </div>
          </section>

          {/* 功能特性展示 */}
          <section className="bg-ui-surface border-2 border-ui-border p-8">
            <h2 className="text-2xl font-pixel-display text-ui-text-primary mb-6">
              组件特性
            </h2>

            <div className="grid pixel-md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-pixel text-stellar-cyan">
                  🎨 视觉特性
                </h3>
                <ul className="text-ui-text-secondary text-sm space-y-2 font-pixel">
                  <li>• 像素完美的边框和阴影</li>
                  <li>• 深空主题色彩搭配</li>
                  <li>• 等宽字体保证对齐</li>
                  <li>• 响应式设计适配移动端</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-pixel text-stellar-green">
                  ⚡ 交互特性
                </h3>
                <ul className="text-ui-text-secondary text-sm space-y-2 font-pixel">
                  <li>• 悬停动画效果</li>
                  <li>• 平滑的进入/退出动画</li>
                  <li>• ESC 键快速关闭</li>
                  <li>• 点击背景关闭</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-pixel text-stellar-orange">
                  🔐 登录选项
                </h3>
                <ul className="text-ui-text-secondary text-sm space-y-2 font-pixel">
                  <li>• 微信二维码登录</li>
                  <li>• Google 账号登录</li>
                  <li>• GitHub 账号登录</li>
                  <li>• 游客模式支持</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-pixel text-stellar-purple">
                  🛠️ 技术实现
                </h3>
                <ul className="text-ui-text-secondary text-sm space-y-2 font-pixel">
                  <li>• TypeScript 类型安全</li>
                  <li>• Tailwind CSS 样式</li>
                  <li>• React Hooks 状态管理</li>
                  <li>• 可访问性支持</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 使用说明 */}
          <section className="bg-ui-surface border-2 border-ui-border p-8">
            <h2 className="text-2xl font-pixel-display text-ui-text-primary mb-6">
              使用方法
            </h2>

            <div className="bg-space-deep p-4 border border-ui-border overflow-x-auto">
              <pre className="text-stellar-green font-pixel text-xs">
                {`import { LoginModal } from '@/components/auth'

function MyComponent() {
  const [showLogin, setShowLogin] = useState(false)
  
  return (
    <>
      <button onClick={() => setShowLogin(true)}>
        登录
      </button>
      
      <LoginModal 
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
      />
    </>
  )
}`}
              </pre>
            </div>
          </section>
        </div>

        {/* 装饰性星空背景 */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-stellar-blue animate-pixel-pulse" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-stellar-cyan animate-pixel-pulse" />
          <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-stellar-purple animate-pixel-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-stellar-pink animate-pixel-pulse" />
        </div>
      </div>

      {/* 登录弹窗 */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  )
}
