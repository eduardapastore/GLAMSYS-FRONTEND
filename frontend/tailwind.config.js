/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}", // <-- Muito importante se sua pasta components estiver fora de src!
  ],
  theme: {
    extend: {},
  },
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}