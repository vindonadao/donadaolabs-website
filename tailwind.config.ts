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
        ink: '#070709',
        charcoal: '#0e0e12',
        surface: '#15151a',
        offwhite: '#f0f0f5',
        accent: {
          DEFAULT: '#00F57A',
          bright: '#7CFFB2',
          deep: '#056B30',
          darker: '#034421',
        },
        purple: {
          DEFAULT: '#7B6BFF',
          deep: '#6E5BFF',
        },
        stone: {
          950: '#111114',
          900: '#18181b',
          800: '#27272a',
          700: '#3f3f46',
          600: '#52525b',
          500: '#71717a',
          400: '#a1a1aa',
          300: '#d4d4d8',
          200: '#e4e4e7',
          100: '#f4f4f5',
        },
      },
      fontFamily: {
        display: ['var(--font-inter-tight)', 'Inter Tight', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'SF Mono', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
        'brand-tight': '-0.025em',
        'brand-normal': '-0.005em',
        'brand-wide': '0.05em',
        widest: '0.15em',
      },
      borderRadius: {
        'brand-md': '8px',
        'brand-lg': '12px',
        'brand-xl': '16px',
      },
      boxShadow: {
        glow: '0 0 60px rgba(0, 245, 122, 0.32)',
        'glow-strong': '0 0 100px rgba(0, 245, 122, 0.55)',
        'glow-cursor': '0 0 12px rgba(0, 245, 122, 0.9), 0 0 24px rgba(0, 245, 122, 0.6)',
        card: '0 0 0 1px rgba(255, 255, 255, 0.06), 0 8px 32px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 0 0 1px #00F57A, 0 16px 48px rgba(0, 245, 122, 0.2)',
        'card-hover-purple': '0 0 0 1px #7B6BFF, 0 16px 48px rgba(123, 107, 255, 0.22)',
      },
      backgroundImage: {
        'gradient-green': 'linear-gradient(135deg, #00F57A 0%, #056B30 100%)',
        'gradient-green-text': 'linear-gradient(120deg, #00F57A 0%, #056B30 100%)',
        'gradient-mesh':
          'radial-gradient(circle at 70% 20%, rgba(0, 245, 122, 0.14) 0%, transparent 40%), radial-gradient(circle at 20% 80%, rgba(5, 107, 48, 0.10) 0%, transparent 45%)',
        'grid-faint':
          'linear-gradient(rgba(0, 245, 122, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 245, 122, 0.06) 1px, transparent 1px)',
      },
      keyframes: {
        'dl-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
        'dl-blink': {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        'dl-tick': {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'dl-pulse': 'dl-pulse 1.6s ease-in-out infinite',
        'dl-blink': 'dl-blink 1s steps(2) infinite',
        'dl-tick': 'dl-tick 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
