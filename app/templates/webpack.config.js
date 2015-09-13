var webpack = require('webpack'),
	path = require('path'),
	ExtractTextPlugin = require("extract-text-webpack-plugin");

var CSSExtractor = new ExtractTextPlugin("css","build/css/[name]-style.css");

module.exports = {
  entry: {
    main: ["webpack/hot/dev-server","./src/app/main"]
  },
  output: {
    path: "./public",
    filename: "build/js/[name].bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/,                       loader: 'babel', exclude: [path.resolve(__dirname, 'node_modules')] },
    	{ test: /\.css$/,                      loader: CSSExtractor.extract("style", "css-loader") },
      { test: /\.scss$/,                     loader: CSSExtractor.extract( "css?sourceMap!sass?sourceMap") },
      { test: /\.less$/,                     loader: CSSExtractor.extract( "css?sourceMap!less?sourceMap") },
      { test: /\.ts$/,                       loader: "ts"}
    ]
  },
  resolve : {
        extensions: ['', '.js','.ts']
  },
  devServer:{
        contentBase: "./public",
        headers: { "X-Custom-Header": "yes" },
        stats: { colors: true },
        noInfo: false, 
        hot: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        debug: true
  },
  plugins:[
  	CSSExtractor,
  	new webpack.HotModuleReplacementPlugin()
  ]
};