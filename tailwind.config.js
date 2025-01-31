/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Garante que Tailwind analise os arquivos da pasta src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
