/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tactical: {
          bg: '#080C14',
          card: '#0F172A',
          cardLight: '#1E293B',
          border: '#1E293B',
          borderLight: '#334155',
          accent: '#06B6D4',
          accentGlow: '#0891B2',
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444',
          muted: '#64748B',
          text: '#F1F5F9',
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      }
    },
  },
  plugins: [],
}
