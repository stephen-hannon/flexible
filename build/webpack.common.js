/* eslint-env node */
const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// const devMode = false; //process.env.NODE_ENV !== 'production';
// console.log(process.env.NODE_ENV);

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, '../dist')
	},
	// module: {
	// 	rules: [{
	// 		test: /\.scss$/,
	// 		use: [{
	// 			loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
	// 		}, {
	// 			loader: 'css-loader'
	// 		}, {
	// 			loader: 'sass-loader',
	// 			options: {
	// 				implementation: require('sass'),
	// 				outputStyle: devMode ? 'expanded' : 'compressed'
	// 			}
	// 		}]
	// 	}]
	// },
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		}
	},
	// plugins: [
	// 	new MiniCssExtractPlugin({
	// 		// Options similar to the same options in webpackOptions.output
	// 		// both options are optional
	// 		filename: '[name].css',
	// 		chunkFilename: '[id].css'
	// 	})
	// ]
};
