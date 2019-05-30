/* eslint-env node */
const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, '../dist')
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		}
	}
};
