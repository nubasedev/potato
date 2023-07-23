import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path, { dirname } from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
const __dirname = dirname(fileURLToPath(import.meta.url));
/**
 * @type {webpack.Configuration}
 */
export default {
  mode: 'production',
  experiments: {
    outputModule: true,
  },
  entry: path.resolve(__dirname, '../src/index.ts'),
  output: {
    module: true,
    path: path.resolve(__dirname, '../lib/esm'),
    filename: 'index.js',
    library: {
      type: 'module',
    },
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss'],
    alias: {
      '@src': path.resolve(__dirname, '../src'), // Create an alias for the 'src' directory
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../src/**/*.scss'),
          to: ({ context, absoluteFilename }) => {
            const relativePath = path.relative(context, absoluteFilename);
            return `styles/${relativePath}`; // Copy scss files to the output directory preserving the directory structure
          },
        },
      ],
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
              configFile: './tsconfig.esm.json',
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
          MiniCssExtractPlugin.loader,
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
};
