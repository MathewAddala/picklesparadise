import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        terracotta: {
          DEFAULT: '#D36B53',
          dark: '#B55039',
          light: '#FAF2EE',
        },
        cream: {
          DEFAULT: '#FAF6F0',
          dark: '#F5EDE3',
        },
        beige: {
          DEFAULT: '#F5EDE3',
          dark: '#EADECF',
        },
        'text-dark': '#3A322F',
        'text-light': '#7E726E',
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
