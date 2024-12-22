/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EB5576",
        "primary-dim": "#E08894",
        secondary: "#FEBBC4",
        extra: "#FFF7FC",
      },
    },
  },
  plugins: [],
};
