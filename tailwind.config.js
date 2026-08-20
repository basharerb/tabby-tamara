/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cairo', 'Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        rakeez: {
          amber: '#f59e0b',
          emerald: '#10b981',
          gold: '#d97706',
        }
      }
    },
  },
  plugins: [],
}
