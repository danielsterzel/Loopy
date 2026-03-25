/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        spotifyGreen: "var(--accent-main)",
        primaryText: "var(--text-main)",
        mutedText: "var(--text-muted)",
        disabledText: "var(--text-disabled)",
        siteBackgroud: "var(--bg-app)",
        cardBackground: "var(--bg-card)",
        elevatedBackground: "var(--bg-hover)",
        borderSubtle: "var(--border-default)"
      }
      
    },
  },
  plugins: [],
}

