/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        frek : ["Fredoka"],
        pro : ["Protest Guerrilla"],
        anta : ["Anta"],
        roboto : ["Roboto"],
        Nunito : ["Nunito"]
        // sans : ["Open Sans", "sans-serif"]
      }
    },
    
  },
  plugins: [],
}