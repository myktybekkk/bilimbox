import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f4ff',
          100: '#ece9ff',
          200: '#d9d2ff',
          300: '#bcaeff',
          400: '#9a80ff',
          500: '#7848ff',
          600: '#6931f0',
          700: '#5723cb',
          800: '#481da6',
          900: '#3d1c83'
        }
      }
    }
  },
  plugins: []
};

export default config;
