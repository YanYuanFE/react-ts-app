import webpack, { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";

const config: Configuration = {
    context: path.resolve(__dirname, "./"),
    entry: {
        app: "./index.tsx",
        vendor: ["react", "react-dom"]
    },
    output: {
        filename: "[name].[hash].js",
        path: path.resolve('./dist')
    },
    devServer: {
        port: 4200,
        inline: true
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        modules: ["src", "node_modules"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loaders: ["babel-loader", "ts-loader"],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "React TypeScript App",
            template: "./index.html"
        }),
        new webpack.HotModuleReplacementPlugin({})
    ]
}

export default config;