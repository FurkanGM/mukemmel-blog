const withSass = require('@zeit/next-sass');
const withCSS = require("@zeit/next-css");
module.exports = withSass(withCSS({
  env: {
    baseUrl: process.env.NODE_ENV === "development" ? 'http://localhost:3000' : 'https://personel-blog.herokuapp.com'
  },
  modules: [
    '@nuxtjs/axios',
    '@zeit/next-css',
    '@zeit/next-sass'
  ]
}));