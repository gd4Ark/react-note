const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    mode : "development",
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
                        plugins : ["react-hot-loader/babel"],
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
    devtool : 'cheap-module-eval-source-map',
    devServer: {
         contentBase : './dist',
         host : 'localhost',
         port : '8888',
         open : true, // 启动服务时浏览器自动运行项目
         hot : true, // 开启热更新
         inline : true, // 必须
         noInfo: true,
         overlay: { // 页面显示警告和错误
            warnings: true,
            errors: true
         },
         watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
         },
    },
    plugins : [
        new cleanWebpackPlugin(['dist']),
        new htmlWebpackPlugin({
            template : './index.html', // 生成html文件以template为模板
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    output : {
        path : path.resolve(__dirname,'dist'),
        filename : 'js/[name].bundle.js',
    }
};