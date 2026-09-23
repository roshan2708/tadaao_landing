/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pure monochrome palette - zero neon/glow colors
        mono: {
          950: '#000000',
          900: '#0a0a0a',
          800: '#141414',
          700: '#262626',
          600: '#404040',
          500: '#737373',
          400: '#a3a3a3',
          300: '#d4d4d4',
          200: '#e5e5e5',
          100: '#f5f5f5',
          50: '#fafafa',
          white: '#ffffff',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      animation: {
        'beam-pulse': 'beamPulse 4s ease-in-out infinite',
        'wireframe-float': 'wireframeFloat 8s ease-in-out infinite',
        'stream-flow': 'streamFlow 2s linear infinite',
      },
      keyframes: {
        beamPulse: {
          '0%, 100%': { opacity: '0.9', transform: 'scaleX(1)' },
          '50%': { opacity: '0.65', transform: 'scaleX(0.97)' },
        },
        wireframeFloat: {
          '0%, 100%': { transform: 'translateY(0px) rotateX(12deg) rotateY(-8deg)' },
          '50%': { transform: 'translateY(-8px) rotateX(15deg) rotateY(-5deg)' },
        },
        streamFlow: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        }
      }
    },
  },
  plugins: [],
}
