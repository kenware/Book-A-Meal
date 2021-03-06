const path = require('path');
const webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');


module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'client/dist')
  },
  context: __dirname,
  resolve: {
    extensions: ['.js', '.jsx', '.json', '*']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015', 'env']
          }
        },
      ],
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    },
    {
      test: /\.(jpe?g|png|jpg|gif|svg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            context: process.cwd(),
            name: 'image/[name].[ext]'
          }
        }
      ]
    }]
  },
  plugins: [
    new LiveReloadPlugin({ appendScriptTag: true })

  ]
};
