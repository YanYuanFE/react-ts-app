import webpack from "webpack";
import { Configuration } from "webpack-dev-server";
import merge from "webpack-merge";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import commonConfig, { resolve } from "./webpack.config.common";

const config = merge(commonConfig, {
  mode: "development",
  devServer: {
    port: 8080,
    compress: true,
    hot: true,
    dev: {
      publicPath: "./",
    },
    static: {
      directory: resolve("./dist"),
    },
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                strictMath: false,
                noIeCompat: true,
                javascriptEnabled: true,
                // modifyVars: theme,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin({}), new ReactRefreshWebpackPlugin({ overlay: false })],
} as Configuration);

export default config;
