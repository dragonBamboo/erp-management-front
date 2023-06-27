const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  configureWebpack: {
    devtool: 'source-map'
  },
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8081',//后端接口地址
        changeOrigin: true,//是否允许跨越
        // pathRewrite: {
        //   '^/api': '/api'//重写,
        // }
        ws: true,
      }
    }
  }
})
