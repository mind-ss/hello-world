/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'noto-sans-kr': ['Noto Sans KR', 'sans-serif'],
        'pretendard': ['Pretendard', 'sans-serif'],
        'black-han-sans': ['Black Han Sans', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'bebas-neue': ['Bebas Neue', 'cursive'],
        'roboto': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
