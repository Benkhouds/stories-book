const colors = require('tailwindcss/colors')
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      container:{
        center:true
      },
      boxShadow: {
        link: '0 -4px 0 0 rgba(178, 245, 234, .7) inset',
      },
      colors:{
        'gray-blue': colors.blueGray,
        rose: colors.rose,
        violet:colors.violet
      }
    },
  },
  variants: {
      extend: {
        display: ['before', 'after'],
        textColor: ['before', 'after'],
        fontSize: ['before', 'after'],
        backgroundColor: ['before', 'after'],
        position:['before', 'after'],
        margin: ['before', 'after'],
      }

  },
  plugins: [
    require('tailwindcss-pseudo-selectors'),
  ],
}
