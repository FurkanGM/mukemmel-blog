module.exports = {
  env: {
    baseUrl: process.env.BASE_URL || 'https://personel-blog.herokuapp.com'
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