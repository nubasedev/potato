const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: ['./demo/client.tsx'],
  output: {
    filename: 'bundle-prod.js',
    path: path.resolve(__dirname, 'docs'),
    publicPath: '/react-mde/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            configFileName: 'tsconfig.demo.prod.json',
          },
        },
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [new ExtractTextPlugin('bundle.css')],
}
