/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#005566',
        },
      },
      fontFamily: {
        'cd-med': ['cool-medium', 'sans-serif'],
        'cd-light': ['cool-light', 'sans-serif'],
        'cd-extended': ['cool-extended', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
