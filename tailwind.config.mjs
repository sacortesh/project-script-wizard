/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        neon: {
          green: '#39FF14',
          cyan: '#00FFFF',
          magenta: '#FF00FF',
          amber: '#FFB000',
        },
        bg: {
          dark: '#0A0A0F',
          surface: '#12121A',
          card: '#1A1A2E',
        },
        text: {
          primary: '#E0E0E0',
          muted: '#7A7A8A',
        },
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "'Fira Code'", 'monospace'],
      },
      borderRadius: {
        none: '0',
        DEFAULT: '0',
        sm: '0',
        md: '0',
        lg: '0',
        xl: '0',
        '2xl': '0',
        '3xl': '0',
        full: '0',
      },
    },
  },
  plugins: [],
};
