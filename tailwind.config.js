module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/client/**/*.{js,ts,jsx,tsx}',
    './src/server/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
