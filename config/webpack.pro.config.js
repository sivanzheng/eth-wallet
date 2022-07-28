const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    output: {
        filename: 'static/js/[name].[contenthash:8].js',
        publicPath: './',
    },
    optimization: {
        minimizer: [
            new CssMinimizerWebpackPlugin(),
        ],
    },
}
