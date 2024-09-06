const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false, // ライブラリのライセンスコメントなどの出力設定
        terserOptions: {
          compress: {
            drop_console: true, // console.log の出力設定
          },
        },
      }),
      // CSS最適化
      new CssMinimizerPlugin(),
    ],
  },
});
