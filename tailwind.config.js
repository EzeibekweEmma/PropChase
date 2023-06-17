/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    minHeight: {
      startingH: "80vh",
    },
    extend: {
      colors: {
        bgc: "#ffffff",
        lbgc: "#cbd5e1",
        tc: "#001a33",
        ltc: "#64748b",
      },
    },
  },
  plugins: [],
};
