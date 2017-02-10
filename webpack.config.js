const webpack = require('webpack');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const PORT = {
        DEV: 8081
    },
    env = process.env.ENV,
    port = PORT.DEV;


let standardPlugins = [
    new CleanWebpackPlugin(['public/*']),
    new ExtractTextPlugin('[name].css', {allChunks: true}),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', Infinity),
    new HtmlWebpackPlugin({
        title: 'Work Cost Calculator',
        template: 'app/client/index.ejs',
        inject: 'body',
        baseUrl: `${process.env.BASE_URL || ''}/`,
        hash: true
    }),
];

let devPlugins = [
    new OpenBrowserPlugin({
        url: `http://localhost:${port}`
    })
];

let plugins = env === 'prod' ? standardPlugins.concat([]) : standardPlugins.concat(devPlugins);

module.exports = {
    entry: {
        app: path.join(__dirname, 'app/client/app.jsx'),
        vendor: path.join(__dirname, 'app/client/vendor.js')
    },
    context: __dirname,
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].js',
        publicPath: '/'
    },
    watch: true,
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true,
        outputPath: path.resolve(__dirname, '/'),
        publicPath: path.resolve(__dirname, '/'),
        port
    },
    resolve: {
        extensions: ['', '.scss', '.css', '.js', '.jsx', '.json'],
        modulesDirectories: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'app/client/modules')
        ]
    },
    postcss: [autoprefixer()],
    /*  sassLoader: {
     data: '@import "shared/assets/toolbox-theme.scss";',
     includePaths: [path.resolve(__dirname, './app/client')]
     },*/
    module: {
        loaders: [
            {
                test: /(\.js|\.jsx)$/,
                exclude: [/app\/server/, /app\/data/, /node_modules/, /bower_components/],
                loader: 'babel-loader?presets[]=es2015,presets[]=react,presets[]=react-hmre'
            },
            /*   {
             test: /\.less$/,
             exclude: /(node_modules|bower_components)/,
             loader: ExtractTextPlugin.extract('style', 'style-loader!css-loader!less-loader')
             },*/
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass')
            },
            {
                test: /\.(ttf|eot|jpe?g|png|gif|svg)$/i,
                loader: 'file-loader?name=icons/[name].[ext]'
            }
        ]
    },
    plugins
};