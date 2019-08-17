/* eslint-env node */
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js')(true);

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.join(__dirname, '../dist'),
	},
});
