import webpack from 'webpack';

import paths from './paths';
import rules from './rules';
import resolve from './webpack.config.resolve';

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    output: {
        filename: '[name].js',
        path: paths.outputPath,
        chunkFilename: '[name].js',
        publicPath: '/'
    },
    module: {
        rules: rules('dev')
    },
    resolve,
    performance: {
        hints: 'warning',
        maxAssetSize: 450000,
        maxEntrypointSize: 8500000,
        assetFilter: assetFilename => {
            return (
                assetFilename.endsWith('.css') ||
        assetFilename.endsWith('.js') ||
        assetFilename.endsWith('.scss')
            );
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    devServer: {
        contentBase: paths.outputPath,
        compress: true,
        hot: true,
        historyApiFallback: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Method': '*',
            'Access-Control-Allow-Headers': '*'
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NamedChunksPlugin()
    ]
};
