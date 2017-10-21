const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: './client/index.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + "/public/assets",
    },
    module: {
        rules: [
            {
                test: /\.(json)$/,
                exclude: /(node_modules)/,
                loader: 'json-loader'
            },
            {
                test: /\.(css|less)$/,
                exclude: /(node_modules)/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react']
                    }
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css')
    ]
}