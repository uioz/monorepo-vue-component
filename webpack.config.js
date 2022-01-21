const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require('webpack').container;
const path = require("path");

module.exports = function (_, args) {
  const DEV_MODE = args.mode === "development";

  const plugins = [
    DEV_MODE ? new HtmlWebpackPlugin({
      template: "./public/index.html",
    }) : undefined,
    DEV_MODE ? undefined : new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new ModuleFederationPlugin({
      name:'MonorepoVueComponent',
      filename: `remoteEntry.js`,
      exposes: {
        './app': './src/app',
        './main': './src/index'
      },
    }),
    new VueLoaderPlugin(),
  ].filter(item => item !== undefined)

  return {
    context: __dirname,
    resolve: {
      extensions: [".vue", ".js", ".mjs"],
    },
    output: {
      publicPath: "auto",
      path: path.join(__dirname, "dist"),
      chunkFilename: "[name].chunk.js",
      filename: "[name].js",
      clean: true,
      library: DEV_MODE ? undefined : {
        type: 'commonjs'
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/i,
          include: /[\\/]src[\\/]/i,
          loader: "vue-loader",
        },
        {
          test: /\.css$/,
          use: [
            DEV_MODE ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
          ],
        },
      ],
    },
    devServer: {
      port: 3001,
      historyApiFallback: true,
      hot: true,
      compress: false,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
    },
    // make output more readable
    devtool: DEV_MODE ? false : undefined,
    optimization: {
      minimize: DEV_MODE ? false : undefined,
    },
    externals: DEV_MODE
      ? undefined
      : {
        vue: {
          root: "Vue",
          commonjs: "vue",
          commonjs2: "vue",
        },
      },
    plugins
  }
}
