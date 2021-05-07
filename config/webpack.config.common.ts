import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import ESLintPlugin from "eslint-webpack-plugin";

const isDevelopment = process.env.NODE_ENV === "development";

export function resolve(dir: string) {
  return path.join(__dirname, "..", dir);
}

const config: Configuration = {
  context: resolve("./"),
  entry: resolve("./src/index.tsx"),
  output: {
    filename: "js/[name].[contenthash].js",
    chunkFilename: "js/[name].bundle.js",
    path: resolve("../dist"),
    publicPath: "./",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    modules: ["node_modules", resolve("./src")],
    alias: {
      "@": resolve("./src"),
      lodash$: "lodash-es",
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            plugins: [isDevelopment && require.resolve("react-refresh/babel")].filter(Boolean),
          },
        },
        exclude: /node_modules/,
      },
      // {
      //   test: /\.(j|t)sx?$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: {
      //     // `.swcrc` can be used to configure swc
      //     loader: "swc-loader",
      //   },
      // },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "images/[name].[ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      title: "React TypeScript App",
      template: resolve("./public/index.html"),
      favicon: resolve("./public/favicon.ico"),
    }),
    new ESLintPlugin({
      fix: true,
      lintDirtyModulesOnly: true,
    }),
  ],
};

export default config;
