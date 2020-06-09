const path = require("path");
// 导入每次删除文件夹的插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src/cli.ts"),
  output: {
    path: path.join(__dirname, "./lib"),
    filename: "index.js",
    libraryTarget: "commonjs2", //发布组件专用
  },
  mode: "production",
  target: "node",
  // node: { fs: "empty" },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        include: path.resolve(__dirname, "./bin"),
        loader: "babel-loader",
        exclude: /node_modules|templates/,
      },
      {
        test: /.tsx?/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "./tsconfig.json"),
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  optimization: { minimize: true },
  plugins: [
    // 插件
    new CleanWebpackPlugin(),
  ],
  externals: {
    react: "react",
    "react-dom": "ReactDOM",
    "react-router-dom": "ReactRouterDOM",
  },
};
