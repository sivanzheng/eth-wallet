const dotenv = require('dotenv')
const webpack = require('webpack')
const path = require('path')
const autoprefixer = require('autoprefixer')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devConfig = require('./webpack.dev.config.js')
const proConfig = require('./webpack.pro.config.js')

let evnConfig = null

if (process.env.NODE_ENV === 'production') {
    evnConfig = dotenv.config({ path: path.resolve(__dirname, '../.env.production') })
} else {
    evnConfig = dotenv.config({ path: path.resolve(__dirname, '../.env.development') })
}

const config = {
    mode: 'production',
    entry: path.resolve(__dirname, '../src/index.tsx'),
    output: {
        path: path.resolve(__dirname, '../build'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: 'asset',
            },
            {
                test: /\.less$/i,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [autoprefixer],
                            },
                        },
                    },
                    'less-loader',
                ],
            },
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/i,
                include: path.resolve(__dirname, '../src'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.tsx?$/,
                use: [{
                    loader:
                    'ts-loader',
                    options: {
                        compilerOptions: { noEmit: false },
                    },
                }],
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'), // 输入index.html
            // favicon: path.resolve(__dirname, '../public/favicon.ico'), // favicon图标
        }),
        new webpack.DefinePlugin({
            process: {
                env: JSON.stringify(evnConfig.parsed),
            },
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'),
            public: path.resolve(__dirname, '../public'),
        },
        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
    },
}

module.exports = (env, argv) => {
    if (argv.mode === 'production') {
        return merge(config, proConfig)
    }

    return merge(config, devConfig)
}
