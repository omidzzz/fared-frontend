import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chakra: {
          root: "#C0392B",
          sacral: "#E67E22",
          solar: "#F1C40F",
          heart: "#27AE60",
          throat: "#2980B9",
          third: "#8E44AD",
          crown: "#9B59B6",
        },
        cosmic: {
          dark: "#0A0A1A",
          indigo: "#0D0D2B",
          gold: "#FECB7D",
          "gold-deep": "#C9A84C",
          "gold-light": "#E8C97A",
          sand: "#F5EDE2",
        },
        teal: {
          glass: "rgba(20, 80, 90, 0.6)",
        },
        card: {
          bg: "rgba(8, 18, 32, 0.85)",
        },
        crystal: {
          blue: "#7EC8E3",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
        farsi: ["Vazirmatn", "sans-serif"],
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Jost', 'sans-serif'],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        particleRise: {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(-100vh)", opacity: "0" },
        },
        chakraSpin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "chakra-spin": "chakraSpin 20s linear infinite",
        "particle-rise": "particleRise 8s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease forwards",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("tailwindcss-rtl")],
};

export default config;
