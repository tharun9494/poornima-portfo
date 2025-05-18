/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'rgb(var(--color-primary), 0.05)',
          100: 'rgb(var(--color-primary), 0.1)',
          200: 'rgb(var(--color-primary), 0.2)',
          300: 'rgb(var(--color-primary), 0.3)',
          400: 'rgb(var(--color-primary), 0.4)',
          500: 'rgb(var(--color-primary), 0.6)',
          600: 'rgb(var(--color-primary), 0.7)',
          700: 'rgb(var(--color-primary), 0.8)',
          800: 'rgb(var(--color-primary), 0.9)',
          900: 'rgb(var(--color-primary), 1)',
        },
        secondary: {
          50: 'rgb(var(--color-secondary), 0.05)',
          100: 'rgb(var(--color-secondary), 0.1)',
          200: 'rgb(var(--color-secondary), 0.2)',
          300: 'rgb(var(--color-secondary), 0.3)',
          400: 'rgb(var(--color-secondary), 0.4)',
          500: 'rgb(var(--color-secondary), 0.6)',
          600: 'rgb(var(--color-secondary), 0.7)',
          700: 'rgb(var(--color-secondary), 0.8)',
          800: 'rgb(var(--color-secondary), 0.9)',
          900: 'rgb(var(--color-secondary), 1)',
        },
        accent: {
          50: 'rgb(var(--color-accent), 0.05)',
          100: 'rgb(var(--color-accent), 0.1)',
          200: 'rgb(var(--color-accent), 0.2)',
          300: 'rgb(var(--color-accent), 0.3)',
          400: 'rgb(var(--color-accent), 0.4)',
          500: 'rgb(var(--color-accent), 0.6)',
          600: 'rgb(var(--color-accent), 0.7)',
          700: 'rgb(var(--color-accent), 0.8)',
          800: 'rgb(var(--color-accent), 0.9)',
          900: 'rgb(var(--color-accent), 1)',
        },
        success: {
          50: 'rgb(var(--color-success), 0.05)',
          100: 'rgb(var(--color-success), 0.1)',
          500: 'rgb(var(--color-success), 0.6)',
          600: 'rgb(var(--color-success), 0.7)',
        },
        warning: {
          50: 'rgb(var(--color-warning), 0.05)',
          100: 'rgb(var(--color-warning), 0.1)',
          500: 'rgb(var(--color-warning), 0.6)',
          600: 'rgb(var(--color-warning), 0.7)',
        },
        error: {
          50: 'rgb(var(--color-error), 0.05)',
          100: 'rgb(var(--color-error), 0.1)',
          500: 'rgb(var(--color-error), 0.6)',
          600: 'rgb(var(--color-error), 0.7)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
    },
  },
  plugins: [],
};