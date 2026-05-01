/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        slideCardUp: {
          '0%': {opacity: '0',transform: 'translateY(30px)' },
          '100%': {opacity: '1', transform: 'translateY(0)'}
        },
        slidefCardDown: {
          '0%': {opacity: '1', transform: 'translateY(0)'},
          '100%': {opacity: '0', transform: 'translateY(30px)'}
        }

      },
      animation: {
        slideCardUp: 'slideCardUp 0.3s ease-out forwards',
        fadeCardDown: 'slideCardDown 0.3s ease-out forwards',
      },
      colors: {
        spotifyGreen: "var(--accent-main)",
        primaryText: "var(--text-main)",
        mutedText: "var(--text-muted)",
        disabledText: "var(--text-disabled)",
        siteBackgroud: "var(--bg-app)",
        cardBackground: "var(--bg-card)",
        emerald: "var(--color-emerald)",
        emeraldDark: "var(--color-emerald-hover)",
        hover: "var(--bg-hover)",
        border: "var(--border-default)",
        buttonBg: "var(--button-background)",
      }
      
    },
  },
  plugins: [],
}

