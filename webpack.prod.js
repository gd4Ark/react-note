const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    mode : "production",
    entry : {
        app : './src/index.js',
    },
    module : {
        rules : [
            {
                test : /\.(js|jsx)$/,
                use : {
                    loader: "babel-loader",
                    options: {
                        presets : ['env','react','stage-3'],
                    }
                }
            },
            {
                test : /\.css$/,
                use : [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins : [
        new cleanWebpackPlugin(['dist']),
        new htmlWebpackPlugin({
            template : './index.html', // 生成html文件以template为模板
            env : 'prod',
        }),
        new webpack.NamedModulesPlugin(),
    ],
    output : {
        path : path.resolve(__dirname,'dist'),
        filename : 'js/[name].bundle.js',
    }
};