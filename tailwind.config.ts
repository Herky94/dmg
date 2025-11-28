import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-lexend-deca)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        "lexend-deca": [
          "var(--font-lexend-deca)",
          "Lexend Deca",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
      },
      keyframes: {
        "hero-zoom": {
          "0%": {
            transform: "scale(1) translateX(0px)",
          },
          "100%": {
            transform: "scale(1.1) translateX(20px)",
          },
        },
      },
      animation: {
        "hero-zoom": "hero-zoom 20s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};

export default config;
