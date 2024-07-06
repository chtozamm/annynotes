import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ringbearer: ["Ringbearer"],
      },
      colors: {
        primary: "#ffb220",
        secondary: "#fffbf7",
        // Birthday theme:
        //   primary: "#f9a8d4",
        //   secondary: "#fdf2f8",
      },
    },
  },
  plugins: [],
};

export default config;
