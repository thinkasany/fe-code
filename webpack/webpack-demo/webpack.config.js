const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinizerPlugin = require("css-minimizer-webpack-plugin");
const { CSPPlugin } = require("./plugin/test-plugin");

const path = require("path");
const config = {
  entry: {
    index: {
      import: "./src/index.js"
      //   dependOn: ["react-vendor", "test"]
    }
    // "react-vendor": {
    //   import: ["react"]
    //   //   import: ["react", "redux"]
    // },
    // test: {
    //   import: "./src/test.js",
    //   filename: "app.js"
    // }
  },
  output: {
    path: path.resolve(__dirname, "build"),
    // publicPath: "https://a.b.c/assets/"
    filename: "test_demo.js",
    chunkFilename: "asset_[id].js"
  },
  resolveLoader: {
    alias: {
      loader1: path.resolve(__dirname, "./loader/loader1")
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"] // MiniCssExtractPlugin是将css抽出文件的，会和style-loader冲突
        // use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
    // 自定义loader
    // rules: [
    //   {
    //     test: /\.css$/,
    //     use: [
    //       {
    //         loader: "loader1",
    //         options: {
    //           attributes: {
    //             name: "loader1"
    //           }
    //         }
    //       },
    //       "css-loader"
    //     ]
    //   }
    // ]
  },
  optimization: {
    // minimizer: [new CssMinizerPlugin()]
  },
  plugins: [
    new CSPPlugin({
      "default-src": ["self", "www.a.com"]
    })
  ],
  devtool: "source-map",
  devServer: {
    client: {
      overlay: false
    },
    compress: true,
    hot: "only", // 设置编译出错，改正不会刷新浏览器
    open: false, // 是否打开新的浏览器tab
    proxy: {
      "/api/*": {
        target: "http://localhost:3000/",
        pathRewrite: {
          "^/api": ""
        },
        bypass: (req, res, proxyOptions) => {
          if (req.url.indexOf("test2") !== -1) {
            return "/";
          }
        }
      }
    },
    // secure:false, // 设置只有https才能访问，一般不用
    static: {
      directory: path.resolve(__dirname, "assets"),
      publicPath: "/static"
    }
  }
};
module.exports = (env, argv) => {
  console.log(env, argv);
  if (argv.mode === "development") {
    config.output.filename = "dev_demo.js";
  } else if (argv.mode === "production") {
    config.output.filename = "prod_demo.js";
  }
  return config;
};
