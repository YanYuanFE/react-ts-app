import webpack from "webpack";
import { Configuration } from "webpack-dev-server";
import merge from "webpack-merge";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import SpeedMeasurePlugin from "speed-measure-webpack-plugin";
import commonConfig, { resolve } from "./webpack.config.common";

const smp = new SpeedMeasurePlugin();

const config = merge(commonConfig, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename], // 当构建依赖的config文件（通过 require 依赖）内容发生变化时，缓存失效
    },
  },
  devServer: {
    port: 8080,
    compress: true,
    hot: true,
    dev: {
      // writeToDisk: true,
      publicPath: resolve("./dist"),
    },
    static: false,
    // static: {
    //   staticOptions: {
    //     contentBase: resolve("./dist"),
    //   },
    //   directory: resolve("./dist/static"),
    // },
    setupExitSignals: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
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

// export default smp.wrap(config);

export default config;
