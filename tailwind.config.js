/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f6f7f9',
          100: '#eceef3',
          200: '#d5dbe4',
          300: '#b1bdcd',
          400: '#879bb1',
          500: '#0a2540',
          600: '#536b85',
          700: '#41546b',
          800: '#344356',
          900: '#2b3646',
          950: '#1d2430',
        },
        gold: {
          50: '#fbfaf4',
          100: '#f5f0db',
          200: '#ebdcb2',
          300: '#dec07e',
          400: '#d0a250',
          500: '#c58d3c',
          600: '#a76d2c',
          700: '#875124',
          800: '#6d3f20',
          900: '#59321c',
          950: '#33190e',
        },
        charcoal: {
          DEFAULT: '#121212',
          light: '#1e1e1e',
          dark: '#0d0d0d',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
