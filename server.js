/* eslint no-var:0 prefer-arrow-callback:0 */
/* eslint import/no-extraneous-dependencies:0 */

var path = require('path');
var express = require('express');

var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');


var app = express();
var port = 3000;

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
	publicPath: config.output.publicPath,
	noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

app.use(function serve(req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, function listen(error) {
	if (error) console.error(error);
	else console.info('==> Listening on port %s.', port);
});
