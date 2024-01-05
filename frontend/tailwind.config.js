/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontSize: {
        fluid_font: "clamp(1.5rem,1.0774rem + 3.7936vw,5.625rem)",
      },
    },
  },
  plugins: [],
}

