import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import HappyPack from "happypack";
import path from "path";
import webpack = require("webpack");

const config: Configuration = {
    context: path.resolve(__dirname, "../"),
    entry: {
        app: "./src/index.tsx",
        vendor: ["react", "react-dom"]
    },
    output: {
        filename: "[name].[hash].js",
        path: path.resolve(process.cwd(), "dist")
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        modules: ["node_modules", path.resolve(__dirname, "src")]
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            // {
            //     test: /\.tsx?$/,
            //     loaders: ["happypack/loader?id=babel"],
            //     exclude: /node_modules/
            // }
        ]
    },
    plugins: [
        // new HappyPack({
        //     id: "babel",
        //     loaders: ["babel-loader"],
        //     threads: 4
        // }),
        new HtmlWebpackPlugin({
            title: "React TypeScript App",
            template: "./index.html"
        })
    ]
}

export default config;