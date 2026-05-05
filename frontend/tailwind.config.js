/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Refined warm rose-gold accent (premium / cinematic / professional)
        accent: {
          DEFAULT: '#d4a574',
          dark: '#a87d4f',
          light: '#e8c598',
          deep: '#8c6239',
        },
        // Cool secondary for tasteful contrast pops
        secondary: {
          DEFAULT: '#7dd3c0',
          dark: '#3fa896',
          light: '#a9e5d6',
        },
        // Deep ink scale (premium near-black with subtle blue undertone)
        ink: {
          950: '#06070a',
          900: '#0b0c10',
          800: '#13141a',
          700: '#1c1d25',
          600: '#262833',
          500: '#363846',
        },
        cream: {
          DEFAULT: '#f5e6d3',
          muted: '#cbb89f',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', '"Montserrat"', 'sans-serif'],
        head: ['"Montserrat"', 'sans-serif'],
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: 0.6 },
          '100%': { transform: 'scale(1.6)', opacity: 0 },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: 0.55 },
          '50%': { opacity: 1 },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s ease-out both',
        'pulse-ring': 'pulse-ring 1.6s cubic-bezier(0.4,0,0.2,1) infinite',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
      },
      backgroundImage: {
        'radial-glow':
          'radial-gradient(circle at 20% 20%, rgba(212,165,116,0.16), transparent 55%), radial-gradient(circle at 80% 0%, rgba(125,211,192,0.08), transparent 50%)',
        'cinematic-fade':
          'linear-gradient(180deg, rgba(11,12,16,0) 0%, rgba(11,12,16,0.7) 70%, #0b0c10 100%)',
        'gold-shimmer':
          'linear-gradient(110deg, #d4a574 0%, #f5e6d3 45%, #d4a574 90%)',
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(212,165,116,0.55)',
        'glow-lg': '0 0 80px -10px rgba(212,165,116,0.6)',
        'glow-teal': '0 0 60px -10px rgba(125,211,192,0.4)',
      },
    },
  },
  plugins: [],
};
