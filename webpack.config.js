const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const outputPath = path.resolve(__dirname, './dist');

const webpackConfig = {
    entry: {
        app: [
            'react-hot-loader/patch',
            path.resolve(__dirname, './src/index.js')
        ]
    },
    output: {
        filename: '[name].js',
        path: outputPath
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: ['/node_modules/', '/dist/'],
                use: 'babel-loader'
            },
            {
                test: /\.jsx$/,
                exclude: ['/node_modules/', '/dist/'],
                use: 'babel-loader'
            },
            {
                test: /\.scss$/,
                exclude: ['/node_modules/', '/dist/'],
                use: [
                	'style-loader', 
                	{
                	    loader: 'css-loader',
                        options: { sourceMap: true }
			        },
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: true, config: { path: 'postcss.config.js' } }
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }]
            },
            {
                test: /\.(gif|png|jpg|jpeg|svg)$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, './src/assets/'),
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }
            }
        ]
    },
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/assets/index.html'),
            filename: 'index.html',
            path: outputPath
        }),
        new CopyWebpackPlugin([
            // { from: path.join(__dirname, './src') + '/assets/images', to: `assets/images` },
            { from: path.join(__dirname, './src') + '/static' },
        ]),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        port: 8080,
        historyApiFallback: true,
        inline: true,
        hot: true,
        host: '0.0.0.0'
    }
}

module.exports = webpackConfig;