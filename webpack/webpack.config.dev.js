var base = require('./webpack.config.base.js')
var { DefinePlugin } = require('webpack')
var { merge } = require('webpack-merge')

module.exports = merge(base, {
  watch: true,
  devtool: 'source-map',
  mode: 'development',
  plugins: [
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: true,
    }),
  ],
})
