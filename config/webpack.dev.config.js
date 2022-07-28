const path = require('path')

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    output: {
        filename: 'static/js/[name].js',
    },
    devServer: {
        port: '8888',
        hot: true,
        compress: true,
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, 'public'),
        },
    },
}
