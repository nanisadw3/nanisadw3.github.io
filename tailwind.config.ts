import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#020205", 
        foreground: "#f8fafc",
        primary: {
          DEFAULT: "#8b5cf6", // Violet
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#22d3ee", // Cyan
          foreground: "#000000",
        },
      },
      animation: {
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'brutalist-grid': "linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
};
export default config;
