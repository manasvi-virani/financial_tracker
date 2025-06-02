// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Tailwind will scan these files
  ],
  theme: {
    extend: {
      colors: {
        primary700: 'var(--color-primary700)',
        primary800: 'var(--color-primary800)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
      },
    },
  },
  plugins: [],
};
