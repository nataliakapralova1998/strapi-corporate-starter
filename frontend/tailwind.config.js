/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        garamond: ["var(--font-eb-garamond)"],
        manrope: ['var(--font-manrope)', 'sans-serif'],
      },
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        text: {
          DEFAULT: "rgb(var(--text) / <alpha-value>)",
        },
        muted: "rgb(var(--muted) / <alpha-value>)",
      },
      animation: {
        "pulse-vertical": "pulse-vertical 2s ease-in-out infinite",
        "slide-in": "slide-in 0.8s ease-out forwards",
      },
      keyframes: {
        "pulse-vertical": {
          "0%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-5px)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        "slide-in": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(1%)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
