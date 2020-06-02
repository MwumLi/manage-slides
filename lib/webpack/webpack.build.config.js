const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { DEST } = require('./paths');
const { MAIN_ENTRY_NAME } = require('./constant');
const {
  getHtmlWebpackPlugins,
  getOutputFilename,
  getAppScript,
} = require('./helper')
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.config');
const InjectPlugin = require('webpack-inject-plugin').default
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        moduleFilename: ({
          name
        }) => {
          return getOutputFilename(name, 'css', true)
        }
      })
    ],
  };
  
  return webpackMerge(commonConfig, curConfig);
}
