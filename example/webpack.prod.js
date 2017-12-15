const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: './index.js',
    vendor: ['md5', 'superagent', 'nimupload']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[chunkHash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['es2015', {module: false}]]
          }
        }
      }
    ]
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    //清除bundle文件夹
    new CleanWebpackPlugin(['dist']),
    // 自动生成dist的html
    new HtmlWebpackPlugin({
      template: './index.html', // 源模板文件
      // chunksSortMode: "dependency"
    }),
    // 单独打包外部依赖库。mannifest防止修改原文件后vendor的hash变化
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
  ],
  resolve: {
     // 现在你import文件的时候可以直接使用import Func from './file'，不用再使用import Func from './file.js'
     extensions: ['.js', '.json', '.coffee']
  }
}
