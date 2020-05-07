module.exports = {
  transpileDependencies: [
    "vuetify"
  ],
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        pathReqrite: {"^/api": "/api"},
        changeOrigin: true,
        secure: false
      }
    }
  }
}