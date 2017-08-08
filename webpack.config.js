var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: ['bootstrap-loader', './src/index.js'],
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
        new webpack.ProvidePlugin({
            jQuery: 'jquery'
        })
    ],
};