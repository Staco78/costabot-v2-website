const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPLugin = require("copy-webpack-plugin");

const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/renderer.tsx",
    target: "web",
    resolve: {
        alias: {
            ["@"]: path.resolve(__dirname, "src"),
        },
        extensions: [".tsx", ".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                include: /src/,
                use: [{ loader: "ts-loader" }],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new CopyPLugin({
            patterns: [{ from: path.resolve(__dirname, "src", "assets"), to: path.resolve(__dirname, "dist", "assets") }],
        }),
    ],
    output: {
        path: __dirname + "/dist",
        filename: "renderer.js",
    },
};
