/* eslint-env node */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (devMode) => ({
	entry: [
		'./src/js/index.js',
		'./src/scss/style.scss',
	],
	output: {
		filename: devMode ? '[name].js' : '[name].[contenthash].js',
		path: path.resolve(__dirname, '../dist'),
	},
	module: {
		rules: [{
			test: /\.scss$/,
			use: [{
				loader: MiniCssExtractPlugin.loader,
			}, {
				loader: 'css-loader',
			}, {
				loader: 'postcss-loader',
			}, {
				loader: 'sass-loader',
				options: {
					implementation: require('sass'),
					outputStyle: devMode ? 'expanded' : 'compressed',
				},
			}],
		}, {
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
		}, {
			test: /\.vue$/,
			loader: 'vue-loader',
		}],
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
		},
	},
	optimization: {
		moduleIds: 'hashed',
		splitChunks: {
			chunks: 'all',
		},
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			minify: !devMode && {
				collapseWhitespace: true,
				customAttrCollapse: /:class/,
				minifyJS: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
			},
		}),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: devMode ? '[name].css' : '[name].[hash].css',
			chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
		}),
		new VueLoaderPlugin(),
		new CopyPlugin([
			{
				from: './static',
			},
		]),
	],
});
