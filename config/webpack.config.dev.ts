import webpack, { Configuration } from "webpack";
import merge from "webpack-merge";
import path from "path";
import commonConfig from "./webpack.config.common";

const config: Configuration = merge(commonConfig, {
    mode: "development",
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 8080,
        inline: true
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                loaders: ["style-loader", "css-loader", "less-loader"]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin({})
    ]
});

export default config;