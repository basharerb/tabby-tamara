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
        tabby: {
          green: '#3BFF92',
          dark: '#00D68F',
        },
        tamara: {
          purple: '#9E00FF',
          orange: '#FF5C00',
          pink: '#FF007A',
        }
      }
    },
  },
  plugins: [],
}
