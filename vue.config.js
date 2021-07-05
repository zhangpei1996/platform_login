'use strict'
const path = require('path');
const name = '统一登录';
const port = 9527;

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: process.env.NODE_ENV === 'development' ? true : false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
        'views': resolve('src/views'),
        'components': resolve('src/components')
      }
    }
  },
  chainWebpack (config) {
    config
      .when(process.env.NODE_ENV !== 'development', 
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime`必须与 runtimeChunk 名称相同，默认是 `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // 只打包最初依赖的第三方
                },
                elementUI: {
                  name: 'chunk-antDesignVue', // 将 elementUI 分割成单个包
                  priority: 20, // 重量需要大于 libs 和 app，否则将被打包成 libs 或 app
                  test: /[\\/]node_modules[\\/]_?ant-design-vue(.*)/ // 为了适应 CNPM
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // 可以自定义规则
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
        }
      )
  },
}
