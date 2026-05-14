/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        card: "var(--card)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        input: {
          background: "var(--input-background)",
        },
        muted: {
          foreground: "var(--muted-foreground)",
        },
        neon: {
          cyan: "var(--neon-cyan)",
          purple: "var(--neon-purple)",
          emerald: "var(--neon-emerald)",
        },
      },
    },
  },
  plugins: [],
}