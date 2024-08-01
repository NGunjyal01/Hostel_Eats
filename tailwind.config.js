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
      },
      animation: {
        slideInFromRight: 'slideInFromRight 0.3s ease-out',
        slideOutToRight: 'slideOutToRight 0.3s ease-out',
      },
    },
  },
  plugins: [],
}