/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          s1: '#121620',
          s2: '#181F30',
          s3: '#222B40',
        },
        saffron: {
          DEFAULT: '#ff9933',
          dim: 'rgba(255, 153, 51, 0.08)',
          border: 'rgba(255, 153, 51, 0.25)',
        },
        gold: {
          DEFAULT: '#F5C842',
          dim: 'rgba(245, 200, 66, 0.08)',
          border: 'rgba(245, 200, 66, 0.25)',
        },
        text: {
          DEFAULT: '#F0F4FA',
          muted: '#8F9CAE',
        },
        border: 'rgba(255, 255, 255, 0.06)',
        greenL: '#2ECC71',
        redL: '#FF4757',
      },
      borderRadius: {
        'lg': '16px',
        'md': '12px',
      }
    },
  },
  plugins: [],
}
