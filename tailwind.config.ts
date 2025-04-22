import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "600px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563eb", // azul moderno
          dark: "#1e40af",
          light: "#3b82f6",
        },
        secondary: {
          DEFAULT: "#64748b", // slate moderno
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        mono: ["Fira Code", "ui-monospace"],
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.6s ease-out",
        scaleIn: "scaleIn 0.3s ease-in-out",
      },
      transitionProperty: {
        spacing: "margin, padding",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};

export default config;