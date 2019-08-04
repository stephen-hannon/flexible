/* eslint-env node */
const merge = require('webpack-merge');
const WorkboxPlugin = require('workbox-webpack-plugin');
const common = require('./webpack.common.js')(false);

module.exports = merge(common, {
	mode: 'production',
	devtool: 'source-map',
	plugins: [
		new WorkboxPlugin.GenerateSW({
			offlineGoogleAnalytics: true,
		}),
	],
});
