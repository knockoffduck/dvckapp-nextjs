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
      // => @media (min-width: 390px) { ... }
      'sm': '400px',
      // => @media (min-width: 400px) { ... }

      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    daisyui: {
      themes: ["dark"],
    },
  },
  plugins: [require('daisyui')],
}