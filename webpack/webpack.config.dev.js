var base = require('./webpack.config.base.js')

module.exports = {
  ...base,
  watch: true,
  devtool: 'source-map',
  mode: 'development',
}
