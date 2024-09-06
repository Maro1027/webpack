const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // エントリーポイント
  entry: {
    app: './src/assets/js/app.js',
    another: './src/assets/js/another.js',
  },
  // 出力先
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: 'assets/js/[name].[contenthash].js',
    // chunkFilename: 'assets/js/[name].[contenthash].js',
    filename: 'assets/js/[name].js',
    chunkFilename: 'assets/js/[name].js',
  },
  optimization: {
    // jqueryなどのプラグインを別ファイルで管理するための設定
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
        },
        vendorsModules: {
          test: /src[\\/]assets[\\/]js[\\/]modules/,
          name: 'vendor-modules',
          minSize: 0,
          minChunks: 2,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['autoprefixer']],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        generator: {
          filename: `./assets/image/[name].[contenthash][ext]`,
        },
        type: 'asset/resource',
        loader: 'image-webpack-loader',
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      //テンプレートに使用するhtmlファイルを指定
      template: './src/index.html',
      chunks: ['app'],
    }),
    new HtmlWebpackPlugin({
      filename: 'another.html',
      template: './src/another.html',
      chunks: ['another'],
    }),
    new ESLintPlugin(),
    new MiniCssExtractPlugin({
      filename: './assets/css/[name].[contenthash].css',
    }),
  ],
  resolve: {
    alias: {
      '@image': path.resolve(__dirname, './src/assets/images/'),
    },
  },
};
