/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        blue: "#007DFF",
      },
      spacing: {
        250: "250px",
      },
    },
  },
  plugins: [],
};
