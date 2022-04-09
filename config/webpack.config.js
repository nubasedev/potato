const webpack = require('webpack')
const path = require('path')
const createStyledComponentsTransformer =
  require('typescript-plugin-styled-components').default
const styledComponentsTransformer = createStyledComponentsTransformer()
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/index.tsx'),
  output: {
    path: path.resolve(__dirname, '../lib/umd'),
    filename: 'index.js',
    library: 'mde',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
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
        test: /\.ts(x?)/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              configFile: 'config/tsconfig.umd.json',
              getCustomTransformers: () => ({
                before: [styledComponentsTransformer],
              }),
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  stats: {
    colors: true,
  },
  devtool: 'hidden-source-map',
}
