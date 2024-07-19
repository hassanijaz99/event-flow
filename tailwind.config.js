/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        veilBlack: '0px 0px 32px 0px #0000001F',
      },
      transitionProperty: {
        colors: 'color',
      },
      colors: {
        mintyGreen: '#89FF9F',
        lemonChiffon: '#F0FDEC',
        neonGreen: '#70FE8C',
        mintWhisper: '#EDFDEB',
        forestGreen: '#009700',
        darkGreenTranslucent: '#006514D5',
        deepTealTranslucent: '#040E0082',
        blackOlive: '#1D211C',
        deepForestGreen: '#040F0047',
        veryDarkGreen: '#020A00A0',
        darkForestGreen: '#00200010',
        forestNight: '#050F0078',
        lightMintGreen: '#F6FEF4B0',
        lightGrayTransparent: '#F4F5F312',
        lightLimeGreen: '#EBFDE766',
        pastelGreenTransparent: '#F2FBF122',
        darkGreenTransparent: '#00970016',
        slateGray: '#60655F',
        neonGreenTransparent: '#70FE8C1B',
        lightGray: '#AFB5AD',
        lightGray2: '#ECEEEC',
        validatonBorder: '#D2000571',
      },
      borderRadius: {
        megaRound: '48px',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        popin: ['Poppins', 'sans-serif'],
        openSans: ['Open Sans', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
