/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Heebo', 'sans-serif']
    },
    extend: {
      spacing: {
        250: '250px'
      }
    }
  },
  plugins: []
};
