import { Configuration } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import merge from "webpack-merge";
import commonConfig from "./webpack.config.common";

const vendorGroups: { [k: string]: RegExp } = {
  polyfill: /babel|core-js/,
  charts: /charts|antv/,
  core: /react|unstated|router|immer|axios|antd｜ahooks/,
  styling: /polished|emotion/,
  utils: /lodash|moment/,
};

const prodConfig: Configuration = {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
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
              },
            },
          },
        ],
      },
    ],
  },
  optimization: {
    chunkIds: "named",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module: any) {
            let packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1].replace("@", "");

            for (const groupKey in vendorGroups) {
              if (vendorGroups[groupKey].test(packageName)) {
                packageName = groupKey;
                break;
              }
            }
            return `vendor~${packageName}`;
          },
        },
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true,
        },
      },
    },
    minimize: true,
    minimizer: [
      new TerserPlugin(),
    ] as any[],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
      chunkFilename: "css/[id].[contenthash].css",
      ignoreOrder: true,
    }),
  ],
};

const config: Configuration = merge(commonConfig, prodConfig);

export default config;
