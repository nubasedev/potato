import HtmlWebpackPlugin from 'html-webpack-plugin'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import webpack from 'webpack'
const __dirname = dirname(fileURLToPath(import.meta.url))
export default {
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, '../demo/app.tsx'),
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/static/',
  },
  devServer: {
    port: 4000,
    open: true,
    hot: true,
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss'],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'demo/index.html',
      hash: true, // Cache busting
      filename: '../dist/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.(scss)$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[path][name]__[local]',
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
}
