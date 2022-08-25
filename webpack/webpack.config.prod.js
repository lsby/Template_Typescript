var base = require('./webpack.config.base.js')
var { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  ...base,
  mode: 'production',
  plugins: [new CleanWebpackPlugin(), ...base.plugins],
}
