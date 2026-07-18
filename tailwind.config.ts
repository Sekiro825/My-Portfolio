import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cinematic dark palette driven by CSS variables so users can theme later.
        ink: {
          900: "var(--ink-900)",
          800: "var(--ink-800)",
          700: "var(--ink-700)",
          600: "var(--ink-600)",
        },
        accent: {
          crimson: "var(--accent-crimson)",
          electric: "var(--accent-electric)",
          gold: "var(--accent-gold)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px -10px var(--accent-crimson), 0 0 80px -30px var(--accent-electric)",
        card: "0 18px 50px -20px rgba(0,0,0,0.9)",
      },
      keyframes: {
        scan: {
          "0%, 100%": { transform: "translateY(-100%)" },
          "50%": { transform: "translateY(100vh)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "8%": { opacity: "0.6" },
          "9%": { opacity: "1" },
          "12%": { opacity: "0.85" },
          "13%": { opacity: "1" },
          "20%": { opacity: "0.95" },
          "21%": { opacity: "1" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        scan: "scan 7s linear infinite",
        flicker: "flicker 6s infinite",
        floaty: "floaty 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
