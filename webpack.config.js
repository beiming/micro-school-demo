var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');


module.exports = {
    // devtool: 'cheap-module-eval-source-map',
    devtool: 'eval-source-map',
    entry: {
        vendor: ['./bower_components/angular/angular.js',
            './bower_components/angular-ui-router/release/angular-ui-router.js'],
        main: './src/js/index.js'
    },
    output: {
        path: './www',
        filename: './js/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules|bower_components/,
                loader: 'babel',
            }, {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', ['css', 'postcss', 'sass'])
            }, {
                test: /\.font.(js|json)$/,
                loader: ExtractTextPlugin.extract('style', ['css', 'fontgen'])
                //loader: ExtractTextPlugin.extract('style', 'css!fontgen?embed&types=woff,eot,ttf')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('./css/main.css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }

        })
        // new webpack.NoErrorsPlugin(),
        // new TransferWebpackPlugin([
        //     {from: 'www'}
        // ], path.resolve(__dirname,"src"))
    ],
    postcss: function () {
        return [autoprefixer];
    }
};
