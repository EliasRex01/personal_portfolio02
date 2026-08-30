/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // ------------------------------------------------------------------
      // DESIGN TOKENS
      // Centralizing colors/fonts here means every component references
      // `bg-surface`, `text-violet`, `font-display` etc. instead of raw
      // hex codes — change the palette once, it updates everywhere.
      // ------------------------------------------------------------------
      colors: {
        bg: '#08080c',
        'bg-alt': '#0e0e15',
        surface: '#14141d',
        'surface-2': '#1b1b26',
        border: 'rgba(255,255,255,0.08)',
        text: '#f1f1f4',
        'text-dim': '#9797a6',
        'text-faint': '#5c5c6b',
        violet: '#8b5cf6',
        cyan: '#22d3ee',
        gold: '#f5c451',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-violet': '0 0 40px -10px rgba(139,92,246,0.5)',
        'glow-cyan': '0 0 40px -10px rgba(34,211,238,0.5)',
        'glow-gold': '0 0 40px -6px rgba(245,196,81,0.5)',
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(100deg, #8b5cf6, #22d3ee)',
        'gradient-gold': 'linear-gradient(100deg, #f5c451, #f7d878)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(245,196,81,0.5)' },
          '50%': { boxShadow: '0 0 28px 4px rgba(245,196,81,0.5)' },
        },
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
