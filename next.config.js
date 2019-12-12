module.exports = {
  env: {
    baseUrl: process.env.NODE_ENV === "development" ? 'http://localhost:3000' : 'https://personel-blog.herokuapp.com'
  },
  modules: [
    '@nuxtjs/axios',
  ],
  webpack: config => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader"
    });
    return config;
  }
};