let path = require('path');
let webpack = require('webpack');


const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

let createWebpackConfiguration = () => {
    let config = {};
    config.entry = './src/index.module.js';

    config.output = {
        path: path.resolve(__dirname, 'docs'),
        // Output path from the view of the page
        // Uses webpack-dev-server in development
        publicPath: '/',
        // Filename for entry points
        // Only adds hash in build mode
        filename: '[name].bundle.js',
        // Filename for non-entry points
        // Only adds hash in build mode
        chunkFilename: '[name].bundle.js'
    };

    /**
     * Module rules
     */
    config.module = {
        rules: []
    };

    // javascript
    let javaScriptRule = {
        test: /\.js$/,
        exclude: path.resolve(__dirname, "node_modules")
    };
    // processed by webpack in reversed order
    let javasScriptLoaders = [];
    // ng-annotation: for proper dependency injection in AngularJs application
    javasScriptLoaders.push({loader: 'ng-annotate-loader'});
    // babel es6->es5
    javasScriptLoaders.push({
        loader: 'babel-loader',
        options: {
            presets: ['env']
        },
    });
    javasScriptLoaders.push({
        loader: 'angularjs-template-loader'
    });

    // // ES-lint pushed last to be executed first
    // javasScriptLoaders.push({
    //     loader: "eslint-loader",
    //     options: {
    //         emitWarning: true,
    //     }
    // });

    // javasScriptLoaders.push({
    //     loader : './test-loader.js'
    // });
    // use array of defined js loaders
    javaScriptRule.use = javasScriptLoaders;

    let cssLoader = ['style-loader', 'css-loader', 'sass-loader'];
    let cssRule = {
        test: /\.(s*)css$/,
        use: cssLoader,
    };

    // html
    let htmlRule = {
        test: /\.html$/,
        use: ['raw-loader']
    };

    config.module.rules = [javaScriptRule, cssRule, htmlRule];

    config.plugins = [];

    let htmlWebpackPlugin = new HtmlWebpackPlugin({
        template: './src/index.html',
        favicon: './src/assets/images/favicon.ico',
        inject: 'body',
        // chunks: ['vendor', 'app'],
        // chunksSortMode: 'manual'
    });
    config.plugins.push(htmlWebpackPlugin);

    //css
    config.plugins.push(
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css',
            chunkFilename: '[id].css',
        })
    );
    // config.plugins.push(ExtractCSS);

    let copyAssets = new CopyWebpackPlugin([
        {from: 'src/assets', to: 'assets'},
    ]);
    config.plugins.push(copyAssets);

    config.optimization= {
        // We no not want to minimize our code.
        minimize: false,
    };

    config.devServer = {
        overlay: true,
        // hot: true,
        port: 8011,
        host: '0.0.0.0'
    };

    return config;
};
const config = createWebpackConfiguration();
module.exports = config;