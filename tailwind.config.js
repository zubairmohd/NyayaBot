/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B35', // Orange
          dark: '#E34F16',
        },
        secondary: {
          DEFAULT: '#4C5B5C', // Slate gray
          light: '#717F80',
        },
        accent: {
          DEFAULT: '#1A659E', // Deep blue
          light: '#2A95E5',
        },
        background: '#F7F9FC',
        darkBg: '#02044A',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};