import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import paths from './paths';

function rules(env) {
    return [
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        },
        {
            test: /\.eot(\?v=\d+.\d+.\d+)?$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: paths.fontsFolder
                    }
                }
            ]
        },
        {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff',
                        name: '[name].[ext]',
                        outputPath: paths.fontsFolder
                    }
                }
            ]
        },
        {
            test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/octet-stream',
                        name: '[name].[ext]',
                        outputPath: paths.fontsFolder
                    }
                }
            ]
        },
        {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, // considering svg as image
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'image/svg+xml',
                        name: '[name].[ext]',
                        outputPath: paths.imagesFolder
                    }
                }
            ]
        },
        {
            test: /\.(jpe?g|png|gif|ico)$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: paths.imagesFolder
                    }
                }
            ]
        },
        {
            test: /\.s[ca]ss$/,
            use: [
                env === 'dev' ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader'
            ]
        },
        {
            test: /\.css$/,
            use: [
                env === 'dev' ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader'
            ]
        }
    ];
}
module.exports = rules;
