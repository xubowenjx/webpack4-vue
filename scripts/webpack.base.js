const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const HappyPack = require("happypack");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");

const os = require("os");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
function resolve(_path) {
  return path.resolve(__dirname, _path);
}
module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "index.js",
    chunkFilename: "[name].[hash:8].bundle.js",
    path: resolve("../dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          },
          {
            loader: "happypack/loader?id=happyBabel"
          }
        ]
      },
      {
        test: /\.vue$/,
        use: ["vue-loader"]
      },

      {
        test: /\.(css|less)$/,
        use: [
          // MiniCssExtractPlugin.loader,
          process.env.NODE_ENV !== "production"
            ? "vue-style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new HappyPack({
      //用id来标识 happypack处理类文件
      id: "happyBabel",
      //如何处理 用法和loader 的配置一样
      loaders: [
        {
          loader: "babel-loader?cacheDirectory=true"
        }
      ],
      //共享进程池
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: false
    }),
    //new webpack.HashedModuleIdsPlugin(),
    new htmlWebpackPlugin({
      title: "hello",
      inject: true,
      template: "public/index.html"
    }),
    new VueLoaderPlugin()
  ],
  resolve: {
    alias: {
      "@": resolve("../src")
    }
  }
};
