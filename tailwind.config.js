module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      translate: {
        screen: "100vw",
      },
      fontSize: {
        13: ["0.8125rem", "1.125rem"],
        15: ["0.9375rem", "1.375rem"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
