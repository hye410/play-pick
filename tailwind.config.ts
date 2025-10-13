/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#A970FF",
        "disabled-primary": "#7a5ba9",
        secondary: "#8C8C8C",
        black: "#262627",
        "disabled-black": "#555555",
        white: "#F2F2F2",
        error: "#D32F2F",
      },
    },
  },
  plugins: [],
};
