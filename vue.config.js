const path = require('path')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/site/elite-house/'
    : '/',

  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: [
            path.resolve(__dirname, './src/assets/styles/imports.sass'),
          ]
        })
        .end()
    })
    config.module
      .rule("fonts")
      .test(/\.(ttf|otf|eot|woff|woff2)$/)
      .use("file-loader")
        .loader("file-loader")
        .tap(options => {
          options = {
            // limit: 10000,
            name: '/fonts/[name].[ext]',
          }
          return options
        })
        .end()
    config.module
      .rule("images")
      .test( /\.(png|jpe?g|gif)$/i)
      .use("file-loader")
        .loader("file-loader")
        .tap(options => {
          options = {
            // limit: 10000,
            name: '/images/[name].[ext]',
          }
          return options
        })
        .end()
  }
}