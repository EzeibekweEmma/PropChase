/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    minHeight: {
      startingH :'80vh',
    },
    width:{
      normalW: "80vw",
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
