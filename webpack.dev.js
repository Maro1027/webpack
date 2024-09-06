const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  watch: true,
  // devtool: "eval-cheap-module-source-map", // ソースマップ出力
  devServer: {
    static: path.join(__dirname, 'dist'),
    open: true,
    port: 3000,
  },
});
