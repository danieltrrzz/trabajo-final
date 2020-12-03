const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
  // entry: './src/main.js',
  entry: {
    app: "./src/main.js",
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "",
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
        // use: ['style-loader', 'css-loader'],
        // use: [
        //   'style-loader',
        //   {
        //     loader: 'css-loader',
        //     options: {
        //       modules: true,
        //     },
        //   },
        // ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "./assets/[name][ext]",
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new HtmlWebpackPlugin({
      filename: "login.html",
      template: "./src/login.html",
    }),
  ],
  devServer: {
    proxy: {
      "/api": "http://127.0.0.1:3000",
    },
  },
};
