import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Galaxy Pixel Art Color Palette
      colors: {
        // Deep Space Colors
        space: {
          void: 'var(--space-void)',
          deep: 'var(--space-deep)',
          medium: 'var(--space-medium)',
          light: 'var(--space-light)',
        },
        // Stellar Colors
        stellar: {
          purple: 'var(--stellar-purple)',
          blue: 'var(--stellar-blue)',
          cyan: 'var(--stellar-cyan)',
          green: 'var(--stellar-green)',
          yellow: 'var(--stellar-yellow)',
          orange: 'var(--stellar-orange)',
          red: 'var(--stellar-red)',
          pink: 'var(--stellar-pink)',
        },
        // UI Colors
        ui: {
          text: {
            primary: 'var(--ui-text-primary)',
            secondary: 'var(--ui-text-secondary)',
            muted: 'var(--ui-text-muted)',
          },
          border: 'var(--ui-border)',
          surface: {
            DEFAULT: 'var(--ui-surface)',
            hover: 'var(--ui-surface-hover)',
          },
        },
        // Status Colors
        status: {
          success: 'var(--status-success)',
          warning: 'var(--status-warning)',
          error: 'var(--status-error)',
          info: 'var(--status-info)',
        },
        // Pixel Specific Colors
        pixel: {
          shadow: 'var(--pixel-shadow)',
          highlight: 'var(--pixel-highlight)',
          border: {
            dark: 'var(--pixel-border-dark)',
            light: 'var(--pixel-border-light)',
          },
        },
      },

      // Typography - Pixel Perfect Fonts
      fontFamily: {
        'pixel': 'var(--font-pixel-primary)',
        'pixel-secondary': 'var(--font-pixel-secondary)',
        'pixel-display': 'var(--font-pixel-display)',
      },

      // Spacing System (8px base grid)
      spacing: {
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
        7: 'var(--space-7)',
        8: 'var(--space-8)',
        9: 'var(--space-9)',
      },

      // Border Radius (Pixel-friendly)
      borderRadius: {
        pixel: 'var(--radius-pixel)',
        small: 'var(--radius-small)',
        medium: 'var(--radius-medium)',
        large: 'var(--radius-large)',
      },

      // Animation Durations
      transitionDuration: {
        fast: 'var(--duration-fast)',
        normal: 'var(--duration-normal)',
        slow: 'var(--duration-slow)',
      },

      // Box Shadows (Pixel Art Style)
      boxShadow: {
        'pixel-sm': 'var(--shadow-pixel-sm)',
        'pixel-md': 'var(--shadow-pixel-md)',
        'pixel-lg': 'var(--shadow-pixel-lg)',
      },

      // Z-Index Scale
      zIndex: {
        background: 'var(--z-background)',
        base: 'var(--z-base)',
        overlay: 'var(--z-overlay)',
        modal: 'var(--z-modal)',
        tooltip: 'var(--z-tooltip)',
      },

      // Custom Animations for Pixel Art
      animation: {
        'pixel-pulse': 'pixel-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pixel-bounce': 'pixel-bounce 1s infinite',
        'pixel-fade-in': 'pixel-fade-in 0.3s ease-out',
        'pixel-slide-up': 'pixel-slide-up 0.3s ease-out',
        'pixel-slide-down': 'pixel-slide-down 0.3s ease-out',
        'pixel-slide-left': 'pixel-slide-left 0.3s ease-out',
        'pixel-slide-right': 'pixel-slide-right 0.3s ease-out',
      },

      // Keyframes for Pixel Art Animations
      keyframes: {
        'pixel-pulse': {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.7',
            transform: 'scale(1.05)',
          },
        },
        'pixel-bounce': {
          '0%, 100%': {
            'transform': 'translateY(0)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            'transform': 'translateY(-8px)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        'pixel-fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pixel-slide-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(8px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'pixel-slide-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-8px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'pixel-slide-left': {
          '0%': {
            opacity: '0',
            transform: 'translateX(8px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'pixel-slide-right': {
          '0%': {
            opacity: '0',
            transform: 'translateX(-8px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
      },

      // Responsive Design Breakpoints for Pixel Art
      screens: {
        'pixel-sm': '480px', // 手机横屏
        'pixel-md': '640px', // 平板竖屏
        'pixel-lg': '768px', // 平板横屏
        'pixel-xl': '1024px', // 桌面小屏
        'pixel-2xl': '1280px', // 桌面大屏
      },
    },
  },
  plugins: [],
}

export default config
