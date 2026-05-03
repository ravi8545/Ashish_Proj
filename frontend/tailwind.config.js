/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#f59e0b',
          dark: '#d97706',
          light: '#fbbf24',
        },
        ink: {
          900: '#08090b',
          800: '#0d0f12',
          700: '#14171c',
          600: '#1c2027',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: 0.6 },
          '100%': { transform: 'scale(1.6)', opacity: 0 },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s ease-out both',
        'pulse-ring': 'pulse-ring 1.6s cubic-bezier(0.4,0,0.2,1) infinite',
      },
      backgroundImage: {
        'radial-glow':
          'radial-gradient(circle at 20% 20%, rgba(245,158,11,0.18), transparent 55%), radial-gradient(circle at 80% 0%, rgba(245,158,11,0.08), transparent 50%)',
      },
    },
  },
  plugins: [],
};
