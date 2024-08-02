/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideInFromRight: {
          '0%': { transform: 'translateX(100%)', opacity: '1' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOutToRight: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '1' },
        },
        shake: {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
          '75%': { transform: 'rotate(-5deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
      },
      animation: {
        slideInFromRight: 'slideInFromRight 0.3s ease-out',
        slideOutToRight: 'slideOutToRight 0.3s ease-out',
        shake: 'shake 0.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}