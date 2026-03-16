import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Instrument Serif', 'serif'],
        mono: ['GeistMono', 'monospace'],
      },
      colors: {
        gold: {
          DEFAULT: '#C9922A',
          light:   '#F5DFA0',
          dim:     '#7A5618',
          bg:      '#FDF6E7',
        },
        ink: {
          DEFAULT: '#1A1410',
          2:       '#3D3228',
          3:       '#7A6E64',
          4:       '#B8AFA8',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          2:       '#FAF8F5',
          3:       '#F3EFE9',
        },
        border: {
          DEFAULT: '#EAE4DC',
          2:       '#D9D0C5',
        },
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
      },
      boxShadow: {
        sm: '0 1px 3px rgba(26,20,16,0.06), 0 1px 2px rgba(26,20,16,0.04)',
        md: '0 4px 16px rgba(26,20,16,0.08), 0 2px 6px rgba(26,20,16,0.05)',
        lg: '0 12px 40px rgba(26,20,16,0.10), 0 4px 12px rgba(26,20,16,0.06)',
      },
      backgroundImage: {
        'celebration': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9922A' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}

export default config
