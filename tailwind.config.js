const colors = require('tailwindcss/colors');

module.exports = {
   purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
   darkMode: false, // or 'media' or 'class'
   theme: {
      colors: {
         gray: colors.trueGray,
         cyan: colors.cyan,
         teal: colors.teal,
         indigo: colors.indigo
      },
      fontFamily: {
         sans: ['Nunito', 'sans-serif'],
         code: ['Fira Code', 'monospace']
      }
   },
   variants: {
      extend: {}
   },
   plugins: [
      require('@tailwindcss/forms')
      // ...
   ]
};
