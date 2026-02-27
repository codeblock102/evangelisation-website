/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2D6A4F", // Forest green
        secondary: "#F5F0E8", // Warm beige
        accent: "#C9A84C", // Soft gold
        background: "#FAFAF7", // Off-white
        text: "#1C1C1C", // Dark charcoal
        "primary-light": "#3D7A5F",
        "primary-dark": "#1D4A2F",
        "accent-light": "#E0C274",
        "accent-dark": "#A98A20",
      },
      fontFamily: {
        sans: ['"Inter"', "sans-serif"],
        serif: ['"Playfair Display"', "serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
