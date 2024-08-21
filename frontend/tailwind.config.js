/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontSize: {
        fluid_font: "clamp(1.5rem,1.0774rem + 3.7936vw,5.625rem)",
        fluid_font0_1: "clamp(1.5rem, 0.7rem + 2.5vw, 2.5rem)",
      },
    },
  },
  plugins: [],
};
