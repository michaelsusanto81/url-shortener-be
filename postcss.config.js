const cssnano = require('cssnano')

console.log(`Compiling CSS with mode: ${process.env.NODE_ENV}`);

module.exports = (ctx) => ({
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    ctx.env === 'production'
      ? cssnano({ preset: 'default' })
      : null,
  ]
})