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
        bg3: "#131515",
        emerald: "#19C879",
        emeraldDark: "#16B870",
        cyan: "#06EFEF",
        cyanGlow: "#60FBFB",
        minCream: "#F0F7F4",
        hotRose: "#D30C7B",
        pearlAqua: "#AAEFDF",
        frozenWater: "#CFFCFF",
        elevatedBackground: "var(--bg-hover)",
        borderSubtle: "var(--border-default)",
        nicePurple: "#E627F8",
        niceYellow: "#FFD166"
      }
      
    },
  },
  plugins: [],
}

