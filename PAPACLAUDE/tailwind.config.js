/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0D0D12",
        accent: "#C9A84C",
        ivory: "#FAF8F5",
        slate: "#2A2A35",
        "primary-light": "#1A1A22",
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
