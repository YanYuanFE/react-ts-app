import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import ESLintPlugin from "eslint-webpack-plugin";

const isDevelopment = process.env.NODE_ENV === "development";

const config: Configuration = {
  context: path.resolve(__dirname, "../"),
  entry: {
    app: "./src/index.tsx",
    vendor: ["react", "react-dom"]
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(process.cwd(), "dist")
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    modules: ["node_modules", path.resolve(__dirname, "src")],
    alias: {
      "@": path.resolve(__dirname, "../src"),
      lodash$: "lodash-es",
    },
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            plugins: [isDevelopment && require.resolve("react-refresh/babel")].filter(Boolean)
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "images/[name].[ext]",
        },
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "React TypeScript App",
      template: "./public/index.html",
      favicon: "./public/favicon.ico"
    }),
    new ESLintPlugin({
      fix: true,
      lintDirtyModulesOnly: true
    })
  ]
};

export default config;
