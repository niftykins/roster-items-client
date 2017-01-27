/* eslint no-var:0 */

var path = require('path');
var webpack = require('webpack');
var nib = require('nib');

var dotenv = require('dotenv');
dotenv.config();

module.exports = {
	devtool: 'eval-source-map',

	resolve: {
		root: path.join(__dirname, 'src'),
		extensions: ['', '.js', '.jsx']
	},

	entry: [
		'webpack-hot-middleware/client?reload=true',
		'./src/index'
	],

	output: {
		path: path.join(__dirname, 'assets'),
		filename: 'bundle.js',
		publicPath: '/assets/'
	},

	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),

		new webpack.DefinePlugin({
			'process.env.HTTP_API_URL': JSON.stringify(process.env.HTTP_API_URL),
			'process.env.WS_API_URL': JSON.stringify(process.env.WS_API_URL),
			'process.env.NODE_ENV': JSON.stringify('development')
		})
	],

	module: {
		loaders: [
			{
				test: /\.js$/,
				loaders: ['babel'],
				exclude: /node_modules/,
				include: path.join(__dirname, 'src')
			},

			{
				test: /\.styl$/,
				exclude: /node_modules/,
				loader: 'style!css!stylus'
			},

			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				exclude: /node_modules/,
				include: path.join(__dirname, 'src', 'images'),
				loader: 'file?name=[path][name].[ext]'
			}
		]
	},

	stylus: {
		use: [nib()],
		import: ['~nib/lib/nib/index.styl']
	}
};
