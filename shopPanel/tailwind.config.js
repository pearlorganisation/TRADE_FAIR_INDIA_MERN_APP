/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      'poppins': ['Poppins', 'sans-serif'],   
      'overPass': ['Overpass Mono', 'sans-serif'],    
    },
    extend: {
      fontSize: {
        resp: "clamp(1.5rem,1.0774rem + 3.7936vw,5.625rem)",
      },
    },
  },
  plugins: [],
};
