/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        'md': '0 35px 35px rgba(255, 255, 255, 1)'
      }
    },
    screens: {
      'mobile': '390px',

      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1536px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  },
  daisyui: {
    themes: ["dark"],
  },
  plugins: [require('daisyui')],
}