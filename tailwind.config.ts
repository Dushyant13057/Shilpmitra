import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        "surface-soft": "var(--surface-soft)",
        "dark-section": "var(--dark-section)",
        "warm-border": "var(--border)",
        shilp: {
          orange: {
            50: "#FFF5EC", // Very soft peach / pale orange
            100: "#FFEDD5",
            200: "#FED7AA",
            300: "#FDBA74",
            400: "#FB923C",
            500: "#E86C1F", // Primary ShilpMitra orange
            600: "#D35811",
            700: "#B4440C",
            800: "#923610",
            900: "#772C10",
          },
          cream: {
            50: "#FFFEFC",
            100: "#FDFBF7", // Primary app background
            200: "#FBF7F0",
            300: "#F7F1E5",
            400: "#EDE4D3",
            500: "#DFD2BC",
          },
          charcoal: {
            900: "#1A1513", // Primary heading
            800: "#2B231F",
            700: "#3D342F",
            600: "#5A4E47",
            500: "#786C65",
            400: "#A2968E",
            300: "#CBC3BC",
          },
          terracotta: {
            DEFAULT: "#C85A27",
            dark: "#A34114",
            light: "#FBECE4",
          },
          gold: {
            DEFAULT: "#D49E35",
            light: "#FEF7E8",
          }
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "sans-serif"],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px -2px rgba(130, 80, 50, 0.06), 0 1px 4px -1px rgba(130, 80, 50, 0.04)',
        'warm': '0 8px 24px -4px rgba(130, 80, 50, 0.08), 0 4px 12px -2px rgba(130, 80, 50, 0.04)',
        'warm-lg': '0 16px 36px -6px rgba(130, 80, 50, 0.12), 0 6px 16px -3px rgba(130, 80, 50, 0.06)',
        'warm-glow': '0 0 25px 3px rgba(232, 108, 31, 0.18)',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};

export default config;
