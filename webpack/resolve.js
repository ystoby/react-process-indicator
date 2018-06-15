
// 'use strict';

const path = require('path'),
      vendor_path = path.resolve(__dirname, '../src/vendor');

module.exports = {
    alias: {
        /**
         * Plugins( PS: some plugins may be installed by npm, please check package.json!!! )
         */
        'split-text': path.resolve(vendor_path, 'SplitText.min.js')
        ,'jquery-loader': path.resolve(vendor_path, 'jquery.html5Loader.min.js')
    },

    extensions: ['.js', '.styl', '.css', '.jpg', '.gif', '.png'],

    modules: [
        path.resolve('./src/fonts'),
        path.resolve('./src/styles'),
        path.resolve('./src/modules'),
        path.resolve('./src/images'),
        path.resolve('./node_modules')
    ]
};