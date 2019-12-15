const withSass = require('@zeit/next-sass');
const withCSS = require("@zeit/next-css");
module.exports = withSass(withCSS({
  env: {
    baseUrl: process.env.NODE_ENV === "development" ? 'http://localhost:3000' : 'http://www.furkangezek.com.tr'
  },
  modules: [
    '@nuxtjs/axios',
    '@zeit/next-css',
    '@zeit/next-sass'
  ]
}));