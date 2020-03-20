import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// import path from 'path';
import paths from './paths';
// import rules from './rules';

// const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [paths.entryPath],
    // module: {
    //     rules
    // },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: paths.templatePath,
            minify: {
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                preserveLineBreaks: true,
                minifyURLs: true,
                removeComments: true,
                removeAttributeQuotes: true
            }
        })
    // new ExtractTextPlugin('[name]-[hash].min.css', { allChunks: true })
    ]
};
