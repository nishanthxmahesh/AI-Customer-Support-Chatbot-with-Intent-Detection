export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: '#0A0B0F',
        panel: '#13151C',
        sidebar: '#0D0F16',
        lime: '#A3E635',
        cyan: '#22D3EE',
        danger: '#F43F5E',
        amber: '#FBBF24',
      },
      fontFamily: {
        display: ['Clash Display', 'Inter', 'sans-serif'],
        data: ['DM Mono', 'Geist Mono', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 32px rgba(163, 230, 53, 0.18)',
        cyan: '0 0 28px rgba(34, 211, 238, 0.18)',
      },
    },
  },
  plugins: [],
}
