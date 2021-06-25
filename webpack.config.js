var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './index.js',
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
  },
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true
  },
  plugins:[
    new HtmlWebpackPlugin({
        filename: './index.html',
        template: './index.html'
    }),
    new CopyWebpackPlugin({patterns: [
        { from: "images", to: "images" }
      ],})

  ],
  module: {
    rules: [
		{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			use: 'babel-loader'
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: './images/',
        },
      { test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src') }
    ]
  }
}