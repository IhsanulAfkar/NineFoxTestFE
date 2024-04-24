/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        'primary': '#3366FF',
        'white-50': '#FAFBFF',
        'neutral-75': '#F3F5F8',
        'customNeutral': '#777C88',
        'danger': '#D14343',
        'green-40': '#4FBEAB',
        'customGray': '#B0B4C5'
      },
    },
  },
  plugins: [],
}

