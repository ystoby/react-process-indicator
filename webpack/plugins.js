
// 'use strict';

const config = require('../config')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')


module.exports = {
    plugins: [
        new UglifyJSPlugin({
            uglifyOptions:{
                // warnings: false,
                // ie8: false,
                compress: {
                    warnings: false
                }
            }
        })

        /**
         * CommonChunksPlugin will now extract all the common modules from vendor and node_modules
         */
        ,new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'bundle/[name].js',
            minChunks: function (module) {
                var isNpmPlugin = module.context && module.context.indexOf('node_modules') !== -1;
                var isVendorPlugin = module.context && module.context.indexOf('vendor') !== -1;
                return isNpmPlugin || isVendorPlugin;
            }
        })

        ,new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
        })

        // Extract css file for every entry files
        ,new ExtractTextPlugin('bundle/[name].css')

        // Generate HTML file to 'output' folder, each of html need a plugin
        ,new htmlWebpackPlugin({
            inject: false,
            filename: 'index.html',
            template: path.resolve(__dirname, '../src/htmlTemplates/app.ejs'),
            _entry: 'home.index',  // 用于多页判断
            page: config.page1
        })
        ,new htmlWebpackPlugin({
            inject: false,
            filename: 'about/index.html',
            template: path.resolve(__dirname, '../src/htmlTemplates/app.ejs'),
            _entry: 'about.index',  // 用于多页判断
            page: config.page2
        })

        // Automatically loaded modules when identifier is used as free variable in a module
        ,new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom',
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
            '_': 'lodash',
            'PropTypes': 'prop-types'
        })

        // Copy static files to 'config.output' folder
        ,new copyWebpackPlugin([
            {
                from: 'favicon.png',
                to: ''
            }
        ])
    ]
}