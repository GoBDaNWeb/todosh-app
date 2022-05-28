module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Ubuntu', 'sans-serif']
      },
      backgroundImage: {
        'team-bg': "url('/team-image.png')",
      },
    },
  },
  plugins: [],
}
