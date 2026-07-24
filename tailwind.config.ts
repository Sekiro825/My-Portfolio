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
        "glow-crimson": "0 0 30px -6px var(--accent-crimson), 0 0 60px -20px rgba(229,9,20,0.4)",
        "glow-electric": "0 0 30px -6px var(--accent-electric), 0 0 60px -20px rgba(0,179,255,0.4)",
        "glow-gold": "0 0 30px -6px var(--accent-gold), 0 0 60px -20px rgba(245,197,66,0.4)",
        "ring-crimson": "0 0 0 3px var(--accent-crimson), 0 0 20px rgba(229,9,20,0.5)",
        "ring-electric": "0 0 0 2px var(--accent-electric), 0 0 16px rgba(0,179,255,0.4)",
        "ring-gold": "0 0 0 2px var(--accent-gold), 0 0 16px rgba(245,197,66,0.4)",
        "inset-glass": "inset 0 1px 0 rgba(255,255,255,0.06)",
      },
      backgroundImage: {
        glass: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
        "crimson-rim": "linear-gradient(135deg, var(--accent-crimson), rgba(229,9,20,0.4))",
        "tech-grid": "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
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
