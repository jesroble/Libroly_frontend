/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'coral': {
          500: '#FF6B6B',
          600: '#FF5252',
        },
        'navy': {
          900: '#1A237E',
        },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      },
    },
  },
  plugins: [],
}