const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const {
  DEST,
  ROOT,
  ENTRIES,
  HTML_WEBPACK_PLUGIN_CONFIGS,
  IS_PROD,
  MANITESTS,
} = require('./helper')
const findPort = require("webpack-dev-server/lib/utils/findPort");
const { DefinePlugin } = require('webpack');
const pkg = require(`${ROOT}/package.json`);
const InjectPlugin = require('webpack-inject-plugin').default

module.exports = async function (env, argv) {
  const port = await findPort();
  return {
    entry: ENTRIES,
    output: {
      path: DEST,
      filename: "[name]/index.[hash:8].js",
      publicPath: "/", // 影响开发时的访问和构建结果中的引用
    },
    plugins: [
      new CleanWebpackPlugin(),
      ...HTML_WEBPACK_PLUGIN_CONFIGS.map(conf => new HtmlWebpackPlugin(conf)),
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [`Project is running at http://localhost:${port}/`],
          clearConsole: true
        }
      }),
      new DefinePlugin({
        APP_NAME: JSON.stringify(pkg.app.name),
      }),
      new InjectPlugin(() => {
        const manifest = JSON.stringify(MANITESTS);
        return `window.MANITESTS = JSON.parse('${manifest}');`
      }, {
        entryName: 'main'
      }),
    ],
    module: {
      rules: [{
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: 'babel-loader'
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        },
        {
          test: /\.less$/,
          loader: 'style-loader!css-loader!less-loader'
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)(\?.*$|$)/,
          use: {
            loader: "file-loader",
            options: {
              name: "[name]-[hash].[ext]",
              outputPath: "assets/images"
            }
          }
        },
        {
          test: /\.(woff|woff2|ttf|eot)(\?.*$|$)/,
          use: {
            loader: "file-loader",
            options: {
              name: "[name]-[hash].[ext]",
              outputPath: "assets/fonts"
            }
          }
        },
      ]
    },
    devServer: {
      port,
      proxy: { // proxy URLs to backend development server
        '/': {
          bypass: (req, res) => {
            console.log('Visit - ', req.url);
          },
        },
        contentBase: DEST,
        historyApiFallback: true,
        overlay: true
      }
    }
  };
}
