const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const createWebpackConfiguration = () => {
    const config = {};
    config.entry = './src/app/index.module.js';

    config.output = {
        path: path.resolve(__dirname, 'dist'),
        // Output path from the view of the page
        // Uses webpack-dev-server in development
        publicPath: '/',
        // Filename for entry points
        // Only adds hash in build mode
        filename: 'scripts/[name].bundle.js',
        // Filename for non-entry points
        // Only adds hash in build mode
        chunkFilename: '[name].bundle.js',
        sourceMapFilename: "[name].js.map"
    };

    /**
     * Module rules
     */
    config.module = {
        rules: []
    };

    // javascript
    const javaScriptRule = {
        test: /\.js$/,
        exclude: path.resolve(__dirname, "node_modules")
    };
    // processed by webpack in reversed order
    const javasScriptLoaders = [];
    // babel es6->es5
    javasScriptLoaders.push({
        loader: 'babel-loader',
    });
    javasScriptLoaders.push({
        loader: "eslint-loader",
        options: {
            emitWarning: true,
        }
    });
    // use array of defined js loaders
    javaScriptRule.use = javasScriptLoaders;

    const cssRule = {
        test: /\.(s*)css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
    };

    // html
    const htmlRule = {
        test: /\.html$/,
        use: ['html-loader']
    };

    config.module.rules = [javaScriptRule, cssRule, htmlRule];

    config.plugins = [];

    const htmlWebpackPlugin = new HtmlWebpackPlugin({
        template: './src/index.html',
        favicon: './src/assets/images/favicon.ico',
        inject: 'body',
    });
    config.plugins.push(htmlWebpackPlugin);

    //css
    config.plugins.push(
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css',
            chunkFilename: '[id].css',
        })
    );

    const copyAssets = new CopyWebpackPlugin([
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
    config.devtool = 'source-map';
    
    return config;
};
module.exports = createWebpackConfiguration();
