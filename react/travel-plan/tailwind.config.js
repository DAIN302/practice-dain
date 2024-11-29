/** @type {import('tailwindcss').Config} */
import colors from './client/tailwind/colors';

const px0_200 = Array.from({ length: 201 }, (_, i) => `${i}px`);
const px0_20 = px0_200.slice(0, 21);

export default {
  content: ['client/index.html', 'client/src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      spacing: px0_200,
      borderRadius: px0_20,
      borderWidth: px0_20,
      fontSize: px0_200,
    },
    colors,
  },
  plugins: [],
};
