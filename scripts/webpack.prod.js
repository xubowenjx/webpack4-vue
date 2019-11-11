let webpackMerge = require("webpack-merge");
let base = require("./webpack.base");
let { CleanWebpackPlugin } = require("clean-webpack-plugin");
let webpack = require("webpack");

module.exports = webpackMerge(base, {
  mode: "production",
  //devtool: "cheap-source-map",
  optimization: {
    namedChunks: true,
    splitChunks: {
      chunks: "all",
      name: "common",
      cacheGroups: {
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial" // 只打包初始时依赖的第三方
        },
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"production"'
    })
  ],
  //外部扩展
  externals: {
    vue: "Vue"
  }
});
