let path = require('path');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

let webpackConfig = {
    entry: {
        myCustomViz: './src/visualizations/my-custom-viz.ts',
        singleValueViz: './src/visualizations/single_value_viz.ts'
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist'),
        library: '[name]',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.ts', '.js', '.scss', '.css']
    },
    plugins: [
        new UglifyJSPlugin()
    ],
    module: {
        rules: [
            { test: /\.js$/, loader: "babel-loader" },
            { test: /\.ts$/, loader: 'ts-loader' },
            { test: /\.css$/, loader: [ 'to-string-loader', 'css-loader' ] },
            { test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            }
        ]
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000      
    }, 
    devServer: {
        contentBase: false,
        compress: true,
        port: 3443,
        https: true
    },
    devtool: 'eval',
    watch: true
};

module.exports = webpackConfig;