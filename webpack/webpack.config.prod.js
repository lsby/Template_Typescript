var base = require('./webpack.config.base.js')
var { CleanWebpackPlugin } = require('clean-webpack-plugin')
var { DefinePlugin } = require('webpack')

module.exports = {
  ...base,
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new DefinePlugin({
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    ...base.plugins,
  ],
}
