import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        "accent-light": "var(--accent-light)",
        gold: "var(--gold)",
        "gold-light": "var(--gold-light)",
      },
      boxShadow: {
        colored: "0 25px 50px -12px rgba(13, 148, 136, 0.25)",
        gold: "0 25px 50px -12px rgba(217, 119, 6, 0.2)",
        soft: "0 4px 24px -4px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
