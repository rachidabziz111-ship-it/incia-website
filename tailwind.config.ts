import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#f0f9f6',
          600: '#1A7F6B',
          700: '#156b5a',
          900: '#0a3b33', // هادا لي كان ناقص
        },
        gold: {
          300: '#f3d382', // وهادا حتى هو
          500: '#C8A95F',
        },
      },
    },
  },
  plugins: [],
};
export default config;