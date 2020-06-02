const {
  getEntries,
  IS_PROD,
  getOutputFilename
} = require('./helper')

module.exports = {
  entry: getEntries,
  output: {
    filename: (pathData) => getOutputFilename(pathData.chunk.name, IS_PROD),
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
  }
}