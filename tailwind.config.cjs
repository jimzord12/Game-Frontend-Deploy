/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
    // '/src/**/**/*.{js,jsx}',
    // './src/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        siteblack: '#131519',
        siteDimBlack: '#191d23',
        siteViolet: '#7f46f0',
        siteWhite: '#9eacc7',
      },
      // Probbly enables the className= bg-saiman, in Battle.jsx
      backgroundImage: {
        // astral: "url('/src/assets/background/astral.jpg')",
        // saiman: "url('/src/assets/background/saiman.jpg')",
        // town: "url('/src/myAssets/maps/TownDemoMap.png')",
        town: "url('/public/maps/TownDemoMap.png')", // PixelArtTown!
        energy: "url('/src/myAssets/maps/bigImg.jpg')",
        islandMap: "url('')",
        worldMap: "url('')",
        heroImg: "url('/src/assets/background/hero-img.jpg')",
        landing: "url('/src/assets/background/landing.jpg')",
      },
      fontFamily: {
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
