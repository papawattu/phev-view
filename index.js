var express = require("express");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config");

var app = express();
var compiler = webpack(webpackConfig);

app.use(express.static('html'))
app.use(express.static('dist'))

app.use(webpackDevMiddleware(compiler, {
  publicPath: "/" // Same as `output.publicPath` in most cases.
}));

app.get('/', function (req, res) {
  res.redirect('/html/index.html')
})
app.listen(3000, function () {
  console.log("Listening on port 3000!");
});