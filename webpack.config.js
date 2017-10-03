var path = require('path');
var webpack = require('webpack');

const PROD = process.env.NODE_ENV === 'production'
const DEV = process.env.NODE_ENV === 'development'

module.exports = {
    entry: ['./src/index.js'],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        hot: true,
        port: 3000,
        historyApiFallback: true,
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
            }
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.PRODUCTION': JSON.stringify(PROD),
            'process.env.DEVELOPMENT': JSON.stringify(DEV),
        }),
    ],
};