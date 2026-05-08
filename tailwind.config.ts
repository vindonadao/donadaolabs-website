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
        ink: '#050505',
        charcoal: '#0e0e10',
        offwhite: '#fafafa',
        accent: {
          DEFAULT: '#6e5bff',
          bright: '#8b7bff',
          deep: '#4b3dd9',
          darker: '#2e20a6',
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
        'brand-md': '10px',
        'brand-lg': '16px',
        'brand-xl': '24px',
      },
      boxShadow: {
        glow: '0 0 60px rgba(110, 91, 255, 0.45)',
        'glow-strong': '0 0 100px rgba(110, 91, 255, 0.7)',
        card: '0 0 0 1px rgba(255, 255, 255, 0.06), 0 8px 32px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 0 0 1px #6e5bff, 0 16px 48px rgba(110, 91, 255, 0.3)',
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(135deg, #6e5bff 0%, #4b3dd9 100%)',
        'gradient-mesh':
          'radial-gradient(circle at 20% 0%, rgba(110, 91, 255, 0.25) 0%, transparent 40%), radial-gradient(circle at 80% 30%, rgba(180, 91, 255, 0.15) 0%, transparent 40%), radial-gradient(circle at 50% 100%, rgba(75, 61, 217, 0.18) 0%, transparent 50%)',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.3)' },
        },
      },
      animation: {
        'brand-pulse': 'pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
