import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FBF3EF",
        surface: "#FFFFFF",
        ink: "#2B1B1F",
        wine: {
          DEFAULT: "#6E2439",
          dark: "#4A1626",
          light: "#8C3450",
        },
        gold: {
          DEFAULT: "#C6A15B",
          light: "#E3CD9C",
        },
        line: "#E8D8D2",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        ticket: "6px",
      },
    },
  },
  plugins: [],
};

export default config;
