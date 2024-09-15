/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#051e06',
        'background': '#f9fdf9',
        'primary': '#7da6e9',
        'secondary': '#3bcb3f',
        'accent': '#6f5ae3',
       },
       backgroundImage: {
        'gradient-primary': 'linear-gradient(90deg, #3bcb3f, #7da6e9, #6f5ae3)',
      }
    },
  },
  plugins: [],
};
