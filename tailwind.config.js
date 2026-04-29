/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './client/**/*.tsx'],
  theme: {
    extend: {
      keyframes: {
        'spin-slow': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
      },
      animation: {
        'spin-slow': 'spin-slow 3s linear infinite',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
