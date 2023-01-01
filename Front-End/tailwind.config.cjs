/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
     "./index.html",
     "./src/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
      extend: {
         fontFamily: {
           montserrat: ["Montserrat", "sans-serif"],
           nunito: ["Nunito", "sans-serif"],
           roboto: ["Roboto", "sans-serif"],
         },
         animation: {
          wiggle: 'wiggle 1s ease-in-out infinite',
        }
       },
   },
   plugins: [],
 }