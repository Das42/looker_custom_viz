var path = require('path')

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var webpackConfig = {
  mode: 'production',
  entry: {
    singleValueViz: './src/visualizations/single_value_viz.js',
    hello_world: './src/visualizations/hello_world.js',
    hello_world_react: './src/visualizations/hello_world_react.js',
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist"),
    library: "[name]",
    libraryTarget: "umd"
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [
    new UglifyJSPlugin()
  ],
  module: {
    rules: [
      { test: /\.js$/, loader: "babel-loader" },
      { test: /\.ts$/, loader: "ts-loader" },
      { test: /\.css$/, loader: [ 'to-string-loader', 'css-loader' ] }
    ]
  },
  stats: {
    warningsFilter: /export.*liquidfillgauge.*was not found/
  },
  devServer: {
      https: true
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  devtool: 'eval',
  watch: true
}

module.exports = webpackConfig