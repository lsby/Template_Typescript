var path = require('path')
var { VueLoaderPlugin } = require('vue-loader')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var EventHooksPlugin = require('event-hooks-webpack-plugin')
var { PromiseTask } = require('event-hooks-webpack-plugin/lib/tasks')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
var { merge } = require('webpack-merge')

var 配置 = {
  entry: path.resolve(__dirname, '../src/Web.ts'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist/web'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          esModule: true,
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      filename: 'index.html',
    }),
    new EventHooksPlugin({
      run: new PromiseTask(async () => {
        console.log('=====start=====')
      }),
      watchRun: new PromiseTask(async () => {
        console.log('=====start=====')
      }),
      done: new PromiseTask(async () => {
        setTimeout(() => {
          console.log('=====end=====')
        }, 0)
      }),
    }),
  ],
}
if (process.env.use_analyzer) {
  配置 = merge(配置, {
    plugins: [new BundleAnalyzerPlugin()],
  })
}
module.exports = 配置
