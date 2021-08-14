const HtmlWebpackPlugin = require("html-webpack-plugin");

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
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
    output: {
        path: __dirname + "/dist",
        filename: "renderer.js",
    },
};
