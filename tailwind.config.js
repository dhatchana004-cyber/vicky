/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkNavy: '#0a0f25',
        midnight: '#050814',
        roseGold: '#b76e79',
        neonPink: '#ff2a6d',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        cursive: ['Great Vibes', 'cursive'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2.5s infinite alternate ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%': { transform: 'scale(0.98)', textShadow: '0 0 10px #ff2a6d, 0 0 20px #ff2a6d' },
          '100%': { transform: 'scale(1.02)', textShadow: '0 0 15px #ff2a6d, 0 0 30px #ffb3c6' },
        }
      }
    },
  },
  plugins: [],
}
