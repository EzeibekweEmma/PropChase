/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    minHeight: {
      startingH :'80vh',
    },
    extend: {
      colors: {
        bgc: "#ffffff",
        tc: "#001a33",
      },
    },
  },
  plugins: [],
};
