let webpackMerge = require("webpack-merge");
let base = require("./webpack.base");
let path = require("path");
let webpack = require("webpack");

module.exports = webpackMerge(base, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080,
    hot: true,
    open: true //默认打开浏览器
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"development"'
    })
  ]
});
