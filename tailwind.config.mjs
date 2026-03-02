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
      typography: {
        cyberpunk: {
          css: {
            '--tw-prose-body': '#E0E0E0',
            '--tw-prose-headings': '#00FFFF',
            '--tw-prose-links': '#00FFFF',
            '--tw-prose-bold': '#FFB000',
            '--tw-prose-counters': 'rgba(57, 255, 20, 0.5)',
            '--tw-prose-bullets': 'rgba(57, 255, 20, 0.5)',
            '--tw-prose-hr': 'rgba(57, 255, 20, 0.2)',
            '--tw-prose-quotes': '#7A7A8A',
            '--tw-prose-quote-borders': '#FFB000',
            '--tw-prose-code': '#39FF14',
            '--tw-prose-pre-code': '#39FF14',
            '--tw-prose-pre-bg': '#0A0A0F',
            '--tw-prose-th-borders': 'rgba(57, 255, 20, 0.3)',
            '--tw-prose-td-borders': 'rgba(57, 255, 20, 0.15)',
            'maxWidth': 'none',
            'fontFamily': "'JetBrains Mono', 'Fira Code', monospace",
            'lineHeight': '1.75',
            'a': {
              'textDecoration': 'underline',
              'textUnderlineOffset': '2px',
              '&:hover': {
                'color': '#39FF14',
              },
            },
            'strong': {
              'fontWeight': '600',
            },
            'em': {
              'color': '#FF00FF',
            },
            'h2': {
              'color': '#00FFFF',
              'fontWeight': '700',
              'paddingBottom': '0.5rem',
              'borderBottom': '1px solid rgba(57, 255, 20, 0.15)',
            },
            'h3': {
              'color': '#FFB000',
              'fontWeight': '600',
            },
            'h4': {
              'color': '#E0E0E0',
              'fontWeight': '600',
            },
            'blockquote': {
              'fontStyle': 'italic',
              'borderLeftWidth': '3px',
            },
            'code': {
              'backgroundColor': 'rgba(57, 255, 20, 0.08)',
              'padding': '0.15rem 0.4rem',
              'fontWeight': '400',
              'fontSize': '0.875em',
            },
            'code::before': {
              'content': '""',
            },
            'code::after': {
              'content': '""',
            },
            'pre': {
              'border': '1px solid rgba(57, 255, 20, 0.2)',
              'fontSize': '0.875rem',
              'lineHeight': '1.6',
            },
            'pre code': {
              'backgroundColor': 'transparent',
              'padding': '0',
              'fontSize': 'inherit',
            },
            'ul': {
              'listStyleType': 'none',
              'paddingLeft': '1.5rem',
            },
            'ul > li': {
              'position': 'relative',
              'paddingLeft': '1rem',
            },
            'ul > li::before': {
              'content': '">"',
              'position': 'absolute',
              'left': '0',
              'color': 'rgba(57, 255, 20, 0.5)',
            },
            'ol > li::marker': {
              'color': 'rgba(57, 255, 20, 0.5)',
            },
            'img': {
              'border': '1px solid rgba(57, 255, 20, 0.2)',
            },
            'table': {
              'fontSize': '0.875rem',
            },
            'thead th': {
              'color': '#00FFFF',
              'fontWeight': '600',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
