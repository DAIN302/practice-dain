import plugin from "tailwindcss/plugin";

export default plugin(function ({ addUtilities }) {
  addUtilities({
    ".auto-grow": {
      "grid-area": "1/1/2/2",
      overflow: "hidden",
      wordBreak: "break-all",
    },
  });
});
