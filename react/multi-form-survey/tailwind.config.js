/** @type {import('tailwindcss').Config} */
import colors from "./tailwind/colors";
import utilities from "./tailwind/utilities";

const px0_201 = Array.from({ length: 201 }, (_, i) => `${i}px`);
const px0_21 = Array.from({ length: 21 }, (_, i) => `${i}px`);

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "820px",
    },
    extend: {
      spacing: { ...px0_201 },
      borderWidth: { ...px0_21 },
      borderRadius: { ...px0_21 },
      fontSize: { ...px0_201 },
      colors,
    },
  },
  plugins: [utilities],
};
