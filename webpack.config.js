var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

var DIST_DIR = path.resolve(__dirname, "public");
var SRC_DIR = path.resolve(__dirname, "src");

var commonPlugins = [
	new webpack.ProvidePlugin({
		jQuery: 'jquery',
		$: 'jquery',
		jquery: 'jquery'
	})
]

var config = {
	context: SRC_DIR,
	// devtool: debug ? "inline-sourcemap" : false,
	//entry: "./js/client.js",
	entry: {
		editor: SRC_DIR + "/editor.js",
	},
	// entry: SRC_DIR + "/app/index.js",
	module:
	{
		rules: [
			{
            test: /\.scss$/,
            use: [
					{
						loader: "style-loader" // creates style nodes from JS strings
					}, {
						loader: "css-loader" // translates CSS into CommonJS
					}, {
						loader: "sass-loader", // compiles Sass to CSS

					}
				],
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			},
			{
				test: /\.jsx?$/,
				include: SRC_DIR,
				// exclude: (node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-2'],
					plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
				}
			},
			{
				test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
				loader: 'url-loader',
				options: {
				limit: 10000
				}
			},

			{
				test: /\.svg$/,
				loader: 'raw-loader'
			}
		]
	},
	output: {
		path: DIST_DIR + "/js/app",
		filename: "[name].js",
		publicPath: "/js/app"
	},
	plugins: debug ? [...commonPlugins	] : [
		
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
		...commonPlugins
	],
}

module.exports = config;

// module.exports = {
// 	context: path.join(__dirname, "public"),
// 	// devtool: debug ? "inline-sourcemap" : false,
// 	//entry: "./js/client.js",
// 	entry: SRC_DIR + "/app/index.js",
// module: {
//     rules: [
//       {
//         test: /\.css$/,
//         use: [
//           { loader: 'style-loader' },
//           {
//             loader: 'css-loader',
//             options: {
//               modules: true
//             }
//           }
//         ]
//       }
//     ]
//   },
// 	output: {
// 		path: DIST_DIR + "/js/app",
// 		filename: "bundle.js",
// 		publicPath: "/js/app"
// 	},
// };
