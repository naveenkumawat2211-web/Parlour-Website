/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: { forest: "#173d2c", leaf: "#2f6849", rose: "#b52e58", cream: "#fbf7ef", gold: "#c69a43" },
      fontFamily: { display: ["Georgia", "serif"] },
      boxShadow: { soft: "0 18px 50px rgba(31, 54, 39, .10)" }
    }
  },
  plugins: []
};