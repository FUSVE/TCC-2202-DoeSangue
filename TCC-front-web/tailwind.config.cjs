/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.17)",
        "background-gray": "#f4f7fa",
        "primary": "#3A9C7F",
      },
    },
  },
  plugins: [],
}
