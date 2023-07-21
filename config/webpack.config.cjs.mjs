import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path, { dirname } from 'path'
import TerserPlugin from 'terser-webpack-plugin'
import { fileURLToPath } from 'url'
import webpack from 'webpack'
const __dirname = dirname(fileURLToPath(import.meta.url))
/**
 * @type {webpack.Configuration}
 */
export default {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/index.ts'),
  output: {
    path: path.resolve(__dirname, '../lib/cjs'),
    filename: 'index.js',
    library: {
      type: 'commonjs2',
    },
    // library: 'mde',
    // libraryTarget: 'cjs',
    // globalObject: 'this',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss'],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          toplevel: true,
          mangle: true,
          compress: true,
          ecma: 2016,
          module: true,
          sourceMap: false,
          format: {
            ascii_only: true,
            comments: false,
          },
        },
      }),
    ],
  },
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
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
  devtool: 'hidden-source-map',
}
