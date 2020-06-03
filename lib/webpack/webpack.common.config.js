const {
  getEntries,
  IS_PROD,
  getOutputFilename,
} = require('./helper')
const { SLIDE_DIRECTORY, SLIDE_ROUTE } = require('./constant');
const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: getEntries,
  output: {
    filename: (pathData) => getOutputFilename(pathData.chunk.name, 'js', IS_PROD),
    publicPath: "/", // 影响开发时的访问和构建结果中的引用
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      IS_PROD ? {
        test: /\.css$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader"
        ]
      } : {
        test: /\.css$/,
        loader: 'style-loader!css-loader!less-loader'
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
            outputPath: (url, resourcePath, context) => {
              // `resourcePath` is original absolute path to asset
              // `context` is directory where stored asset (`rootContext`) or `context` option
              // To get relative path you can use
              const relativePath = path.relative(context, resourcePath);
              let outputPath;
              if (relativePath.startsWith(SLIDE_DIRECTORY)) {
                outputPath = relativePath
                  .replace(SLIDE_DIRECTORY, SLIDE_ROUTE);
              } else {
                outputPath = `assets/images/${url}`;
              }

              return outputPath;
            },
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
}