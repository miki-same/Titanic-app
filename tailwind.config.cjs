/** @type {import('tailwindcss').Config} */
module.exports = {
  //purgeにしたらちゃんとtailwindが動いた
  //contentだと動かない　なぜ？
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}
