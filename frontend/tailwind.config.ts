import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /** Saffron / vermilion: primary actions. Use 700+ behind white text for contrast. */
        brand: {
          50: '#fff4ed',
          100: '#ffe6d5',
          200: '#fecbaa',
          300: '#fda674',
          400: '#fb743c',
          500: '#f94f16',
          600: '#ea350c',
          700: '#c2250c',
          800: '#9a2012',
          900: '#7c1d12',
          950: '#430b07',
        },
        /** Temple gold: accents and highlights. */
        gold: {
          50: '#fbf7eb',
          100: '#f6ebc9',
          200: '#edd58f',
          300: '#e3ba55',
          400: '#dba235',
          500: '#c98a24',
          600: '#ad6c1c',
          700: '#8b5019',
          800: '#73411b',
          900: '#62371b',
          950: '#391b0b',
        },
        /** Deep night-sky indigo: headings and dark sections. */
        ink: {
          50: '#f3f4fb',
          100: '#e5e7f6',
          200: '#cdd1ee',
          300: '#a8afe0',
          400: '#7d86cf',
          500: '#5c63c1',
          600: '#4849b3',
          700: '#3e3d9f',
          800: '#2f2e74',
          900: '#211f52',
          950: '#12112e',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
        display: ['var(--font-display)', ...defaultTheme.fontFamily.serif],
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(0.5rem)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
