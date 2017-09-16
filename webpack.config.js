const webpack = require('webpack'),
    path = require('path'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    autoprefixer = require('autoprefixer'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    ENV = process.env.NODE_ENV || 'dev',
    standardPlugins = [
        new CleanWebpackPlugin(['public/*']),
        new ExtractTextPlugin({filename: '[name].css', allChunks: true}),
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js', minChunks: Infinity}),
        new HtmlWebpackPlugin({
            title: 'react-webpack-template',
            template: 'app/client/index.ejs',
            filename: 'index.html',
            inject: 'body',
            hash: true
        }),
        new CopyWebpackPlugin([{
            from: 'app/client/shared/img',
            to: 'shared/img'
        }])
    ],
    prodPlugins = [
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            sourceMap: true
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ],
    plugins = ENV === 'production' ? standardPlugins.concat(prodPlugins) : standardPlugins,
    esLoaders = [
        {
            loader: 'babel-loader',
            options: {
                presets: [
                    ['es2015', {
                        modules: false
                    }],
                    'react',
                    'stage-2'
                ]
            }
        }
    ],
    jsLoaders = [
        {
            loader: 'preprocess-loader'
        }
    ].concat(esLoaders).concat([
        {
            loader: 'eslint-loader',
            options: {
                configFile: './app/client/.eslintrc.json'
            }
        }
    ]),
    cssLoaders = [
        {
            loader: 'style-loader'
        },
        {
            loader: 'css-loader',
            options: {
                sourceMap: true,
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]___[hash:base64:5]'
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                plugins: [autoprefixer()]
            }
        }
    ],
    sassLoaders = cssLoaders.concat([
        {
            loader: 'sass-loader',
            options: {
                data: '@import "shared/assets/variables.scss";',
                includePaths: [path.resolve(__dirname, './app/client')]
            }
        }
    ]);

module.exports = {
    entry: {
        app: path.join(__dirname, 'app/client/bootstrap.jsx'),
        vendor: ['react', 'react-dom']
    },
    context: __dirname,
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name]' + (ENV === 'prod' ? '.min' : '') + '.js'
    },
    resolve: {
        extensions: ['.scss', '.css', '.js', '.jsx', '.json'],
        modules: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'app/client/modules')
        ]
    },
    module: {
        rules: [
            {
                test: /(\.js|\.jsx)$/,
                exclude: [/app\/server/, /node_modules/, /bower_components/],
                use: jsLoaders
            },
            {
                test: /(\.scss)$/,
                use: ENV === 'dev' ? sassLoaders : ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: sassLoaders.slice(1)
                })
            },
            {
                test: /(\.css)$/,
                use: ENV === 'dev' ? cssLoaders : ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: cssLoaders.slice(1)
                })
            },
            {
                test: /\.(ttf|eot|jpe?g|png|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'shared/img/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins
};