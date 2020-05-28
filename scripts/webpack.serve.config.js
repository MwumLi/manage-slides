const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const { loadHtml, APP_NAME } = require('./helper')
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.config');
const notifier = require('node-notifier');
const path = require('path');
const ICON = path.join(__dirname, 'icon.png');
const findPort = require("webpack-dev-server/lib/utils/findPort");

module.exports = async function (env, argv) {
  const port = await findPort();
  const curConfig = {
    plugins: [
      new CleanWebpackPlugin(),
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [`Project is running at http://localhost:${port}/`],
          clearConsole: true
        },
        onErrors: (severity, errors) => {
          if (severity !== 'error') {
            return;
          }
          const error = errors[0];
          notifier.notify({
            title: `${APP_NAME}: build error`,
            message: severity + ': ' + error.name,
            subtitle: error.file || '',
            icon: ICON
          });
        }
      }),
    ],
    devServer: {
      port,
      quiet: true,
      before: function (app, server) {
        app.get('*', function (req, res, next) {
          const isHtmlReq = req.url.indexOf('.') < 0 || req.url.endsWith('.html');
          if (!isHtmlReq) {
            next();
            return;
          }
          console.log(`Visit -- ${req.url}`);
          // 重写 html
          const content = loadHtml(req.url);
          res.setHeader('Content-Type', 'text/html; charset=UTF-8')
          res.end(content);
        });
      }
    }
  };
  return webpackMerge(commonConfig, curConfig);
}
