const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinizerPlugin = require("css-minimizer-webpack-plugin");
const path = require("path");
const config = {
  entry: {
    index: {
      import: "./src/index.js",
      dependOn: ["react-vendor", "test"]
    },
    "react-vendor": {
      import: ["react"]
      //   import: ["react", "redux"]
    },
    test: {
      import: "./src/test.js",
      filename: "app.js"
    }
  },
  output: {
    path: path.resolve(__dirname, "build"),
    // publicPath: "https://a.b.c/assets/"
    // filename: "test_demo.js",
    chunkFilename: "asset_[id].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"] // MiniCssExtractPlugin是将css抽出文件的，会和style-loader冲突
        // use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.txt$/,
        use: "raw-loader"
      }
    ]
  },
  optimization: {
    minimizer: [new CssMinizerPlugin()]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html")
    })
    // new MiniCssExtractPlugin({
    //   filename: "[name].css",
    //   chunkFilename: "[name].css"
    // })
  ],
  devtool: "source-map",
  devServer: {
    client: {
      overlay: false
    },
    compress: true,
    hot: "only", // 设置编译出错，改正不会刷新浏览器
    open: false // 是否打开新的浏览器tab
  }
};
module.exports = (env, argv) => {
  console.log(env, argv);
  if (argv.mode === "development") {
    // config.output.filename = "dev_demo.js";
  } else if (argv.mode === "production") {
    // config.output.filename = "prod_demo.js";
  }
  return config;
};
