const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { DEST } = require('./paths');
const { MAIN_ENTRY_NAME } = require('./constant');
const {
  getHtmlWebpackPlugins,
  getAppScript,
} = require('./helper')
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.config');
const InjectPlugin = require('webpack-inject-plugin').default

module.exports = async function (env, argv) {
  const curConfig = {
    mode: "production",
    output: {
      path: DEST,
    },
    plugins: [
      new CleanWebpackPlugin(),
      ...getHtmlWebpackPlugins(),
      new InjectPlugin(() => getAppScript(), {
        entryName: MAIN_ENTRY_NAME
      }),
    ],
  };
  return webpackMerge(commonConfig, curConfig);
}
