/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cinzel', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // Dark souls inspired color palette
        'ember': {
          '50': '#fff7ed',
          '100': '#ffedd5',
          '200': '#ffd7a8',
          '300': '#ffb86b',
          '400': '#fb923c',
          '500': '#f97316',
          '600': '#ea580c',
          DEFAULT: '#c2410c',
          '800': '#9a3412',
          '900': '#7c2d12',
        },
        'ash': {
          '50': '#f8fafc',
          '100': '#f1f5f9',
          '200': '#e2e8f0',
          '300': '#cbd5e1',
          '400': '#94a3b8',
          DEFAULT: '#64748b',
          '600': '#475569',
          '700': '#334155',
          '800': '#1e293b',
          '900': '#0f172a',
        },
        'blood': {
          '50': '#fef2f2',
          DEFAULT: '#991b1b',
          '900': '#7f1d1d',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
      },
      backgroundImage: {
        'noise': "url('/noise.svg')",
        'texture': "url('/texture.svg')",
      },
      keyframes: {
        'ember-pulse': {
          '0%, 100%': {
            opacity: 1,
            transform: 'scale(1)',
          },
          '50%': {
            opacity: 0.9,
            transform: 'scale(1.05)',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        'ember-flicker': {
          '0%, 100%': {
            opacity: 1,
          },
          '50%': {
            opacity: 0.8,
          },
        },
      },
      animation: {
        'ember-pulse': 'ember-pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'ember-flicker': 'ember-flicker 8s ease-in-out infinite',
      },
      boxShadow: {
        'ember': '0 0 15px rgba(194, 65, 12, 0.5)',
        'ember-lg': '0 0 30px rgba(194, 65, 12, 0.5)',
      },
    },
  },
  plugins: [],
}