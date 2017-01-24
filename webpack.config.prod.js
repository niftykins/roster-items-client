/* eslint no-var:0 */

var webpack = require('webpack');

var base = require('./webpack.config');

base.plugins = [
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.optimize.DedupePlugin(),
	new webpack.optimize.UglifyJsPlugin(),
	new webpack.optimize.AggressiveMergingPlugin(),

	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify('production')
		}
	})
];

base.entry = ['./src/index'];
base.devtool = 'cheap-module-source-map';

module.exports = base;
