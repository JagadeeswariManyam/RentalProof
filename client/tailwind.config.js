/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        proptech: {
          dark: '#090d16',
          slate: '#0f172a',
          card: '#131c2e',
          light: '#f8fafc',
          surface: '#ffffff',
        },
        evidence: {
          50: '#ecfeff',
          400: '#22d3ee',
          500: '#06b6d4',
          950: '#083344',
        },
        compare: {
          50: '#f5f3ff',
          400: '#a78bfa',
          500: '#8b5cf6',
          950: '#2e1065',
        },
        maint: {
          50: '#fffbeb',
          400: '#fbbf24',
          500: '#f59e0b',
          950: '#451a03',
        },
        deposit: {
          50: '#ecfdf5',
          400: '#34d399',
          500: '#10b981',
          950: '#022c22',
        },
        ai: {
          50: '#fdf4ff',
          400: '#e879f9',
          500: '#d946ef',
          950: '#4a044e',
        }
      },
    },
  },
  plugins: [],
};
