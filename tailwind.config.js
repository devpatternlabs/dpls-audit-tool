/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#070b13",
          card: "#0d131f",
          border: "#1e293b",
          emerald: "#10b981",
          sky: "#38bdf8",
        },
      },
    },
  },
  plugins: [],
};
