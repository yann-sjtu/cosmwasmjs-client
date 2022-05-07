const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve("stream-browserify"),
      path: require.resolve("path-browserify")
    },
  },
  mode: "development",
  entry: {
    main: "./src/signClient.js",
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    port: 8888,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      chunks: ["main"],
    }),
  ],
};
