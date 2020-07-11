'use strict';

const path = require('path');

module.exports = {
    entry: {
        "index": path.resolve('./src/webapp/public/js/index.js'),
        "mode": path.resolve('./src/webapp/public/js/mode.js'),
        "board": path.resolve('./src/webapp/public/js/board.js'),
        "admin": path.resolve('./src/webapp/public/js/admin.js')
    },

    output: {
        filename: '[name].js',
        path: path.resolve('./src/webapp/public/build/js')
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: 'babel-loader'
            }
        ]
    }
};