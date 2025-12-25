/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,jsx}",        // ✅ THIS IS THE FIX

  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
