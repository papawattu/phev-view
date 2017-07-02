var path = require('path');

module.exports = {
  entry: './lib/index.js',
    output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: 'public'
  },
  devServer: {
    contentBase: "./public",
    hot: true,
    port: 3000,
    historyApiFallback: true

},
};