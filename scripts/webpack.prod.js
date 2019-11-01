let webpackMerge = require("webpack-merge");
let base = require("./webpack.base");
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let webpack = require("webpack");
let { CleanWebpackPlugin } = require("clean-webpack-plugin");
let path = require("path");

module.exports = webpackMerge(base, {
  mode: "production",
  devtool: "cheap-source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"production"'
    }),
    new ExtractTextPlugin({
      filename: "build.min.css",
      allChunks: true
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial" // 只打包初始时依赖的第三方
        }
      }
    }
  },
  //外部扩展
  externals: {
    // vue: "Vue"
  }
});
