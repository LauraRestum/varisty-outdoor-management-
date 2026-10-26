import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Varsity Outdoor Services brand palette
        forest: {
          DEFAULT: '#183A2E',
          dark: '#10291F',
          light: '#24503F',
        },
        olive: {
          DEFAULT: '#556B3F',
          light: '#8AA062',
        },
        sand: {
          DEFAULT: '#D9C9AB',
          light: '#F4EFE6',
        },
        cream: '#FAF8F3',
        charcoal: '#1F1F1F',
        gold: {
          DEFAULT: '#B8995B',
          dark: '#A0824A',
          light: '#D2B987',
        },
        // Legacy tokens used by the dashboard / portal / quote form,
        // retuned to the brand palette
        brand: {
          green: '#B8995B',
          'green-dark': '#A0824A',
          'green-light': '#D2B987',
        },
        dark: {
          bg: '#10291F',
          card: '#183A2E',
          border: '#2B5646',
          muted: '#356452',
        },
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        display: ['var(--font-saira)', 'system-ui', 'sans-serif'],
        condensed: ['var(--font-saira)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'pulse-green': 'pulseGreen 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        pulseGreen: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(184, 153, 91, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(184, 153, 91, 0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
