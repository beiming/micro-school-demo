var webpack = require('webpack');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');
var path = require('path');

const TEST = false;

config = {
    entry: {
        vendor: ['./bower_components/angular/angular.js',
            './bower_components/angular-ui-router/release/angular-ui-router.js',
            './bower_components/fetch/fetch.js',
            './bower_components/Swiper/dist/js/swiper.min.js',
            ],
        main: ['babel-polyfill', './src/js/index.js']
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
        new TransferWebpackPlugin(
            [{from: './src/data/', to: './data'}], path.resolve(__dirname)),
        // new webpack.NoErrorsPlugin(),

    ],
    postcss: function () {
        return [autoprefixer];
    }
};

if (TEST) {
    config.devtool = 'inline-source-map';
} else {
    // config.devtool = 'eval';
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }

        })
    );
}

module.exports = config;