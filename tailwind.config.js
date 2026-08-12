/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f5f6f7',
          100: '#e7eaec',
          200: '#cfd4d9',
          300: '#aab2bb',
          400: '#7c8794',
          500: '#5b6673',
          600: '#46505c',
          700: '#383f49',
          800: '#262b32',
          900: '#171a1f',
          950: '#0c0e12',
        },
        brand: {
          50: '#eef9f4',
          100: '#d4f0e3',
          200: '#abe0c9',
          300: '#73c9a8',
          400: '#3fae87',
          500: '#1f926d',
          600: '#147558',
          700: '#115e47',
          800: '#104a39',
          900: '#0d3d30',
        },
        accent: {
          50: '#fef6e9',
          100: '#fce5c4',
          200: '#f9cb88',
          300: '#f5ab4b',
          400: '#f2901f',
          500: '#d9760c',
          600: '#b35c08',
          700: '#8f4608',
          800: '#72390e',
          900: '#5e300f',
        },
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        '8xl': '88rem',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
