const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const jsLoaders = [{
    loader: 'babel-loader'
}];

const commonStylesLoader = [{
    loader: 'style-loader'
}, {
    loader: 'css-loader',
    options: {
        modules: true,
        autoprefixer: true,
        importLoaders: 1,
        localIdentName: '[name]__[local]'
    }
}];

const postCssloader = {
    loader: 'postcss-loader',
    options: {
        plugins: [autoprefixer()]
    },

};

const cssLoaders = [...commonStylesLoader, postCssloader];

const sassLoaders = [
    ...commonStylesLoader, {
        loader: 'sass-loader',
        options: {
            data: '@import "shared/styles/scss/variables.scss";',
            includePaths: [path.resolve(__dirname, './app/client')]
        }
    }
];

const plugins = [
    new HtmlWebpackPlugin({
        title: 'react-webpack-template',
        template: 'app/client/index.ejs',
        filename: 'index.html',
        inject: 'body',
        hash: true
    }),
    new CleanWebpackPlugin(['public/*'])
];

module.exports = {
    mode: 'development',
    entry: {
        app: path.join(__dirname, 'app/client/bootstrap.jsx'),
        vendor: ['react', 'react-dom', 'prop-types']
    },
    context: __dirname,
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        extensions: ['.scss', '.css', '.js', '.jsx', '.json', '.png'],
        modules: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'app/client/modules')
        ]
    },
    module: {
        rules: [{
            test: /(\.js|\.jsx)$/,
            exclude: [/app\/server/, /node_modules/, /bower_components/],
            use: jsLoaders
        }, {
            test: /\.css$/,
            exclude: [/node_modules/, /bower_components/],
            use: cssLoaders
        }, {
            test: /\.scss$/,
            exclude: [/node_modules/, /bower_components/],
            use: sassLoaders
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images/'
                }
            }]
        }]
    },
    plugins
};