/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0F1629',
          800: '#151f3a',
          700: '#1e2d4f',
        },
        violet: {
          DEFAULT: '#7C3AED',
          light: '#C4B5FD',
          dark: '#5b21b6',
        },
        amber: { DEFAULT: '#F59E0B' },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
