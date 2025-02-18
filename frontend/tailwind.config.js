/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // colors: {
      //   background: "#faf8f4",
      //   primary:"rgb(139 92 246)",
      //   secondary: "rgb(236 72 153)",
      //   text: {
      //     DEFAULT: "#1e1e14",
      //   },
      // },
      colors: {
        background: "#fdf6e3", // A soft beige for a warm, inviting background
        primary: "#2a9d8f", // A deep teal for primary elements
        secondary: "#e76f51", // A muted coral for accents
        text: {
          DEFAULT: "#264653", // A dark slate for strong contrast and readability
        },
      },
      animation: {
        "pulse-vertical": "pulse-vertical 2s ease-in-out infinite",
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
      },
      
    },
  },
  plugins: [],
};
