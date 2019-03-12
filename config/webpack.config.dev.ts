import webpack, { Configuration } from "webpack";
import merge from "webpack-merge";
import commonConfig from "./webpack.config.common";

const config: Configuration = merge(commonConfig, {
    mode: "development",
    devServer: {
        port: 8082,
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