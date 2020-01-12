'use strict';

const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');
const pkgJson = require('../package.json');
const webpackConfig = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin-hash');
const tsImportPluginFactory = require('ts-import-plugin');
const UUID = require('uuid');

module.exports = (type) => {
  const isDev = type === 'dev'; // dev 环境
  const isBuild = type === 'dist'; // build 环境
  // css-loader
  const cssLoaders = [{
      loader: require.resolve('css-loader')
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        plugins: [require('autoprefixer'), require('postcss-discard-comments')]
      }
    }
  ];
  // less-loader
  const lessLoaders = [{
    loader: require.resolve('less-loader'),
    options: {
      modifyVars: {},
      javascriptEnabled: true
    }
  }];
  // css压缩
  const miniCssLoader = {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../../'
    }
  };

  return {
    mode: type === 'dev' ? 'development' : 'production',
    devtool: {
      dev: 'inline-source-map',
      // dll: false,
      // test: false,
      dist: false
    } [type],
    resolve: {
      alias: {},
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.html', '.scss', '.less', '.css']
    },
    entry: {
      [pkgJson.name]: _.compact([
        isDev && 'react-hot-loader/patch',
        isDev && `webpack-hot-middleware/client?http://127.0.0.1:${webpackConfig.port}`,
        isDev && 'webpack/hot/only-dev-server',
        './src/index.tsx'
      ])
    },
    output: {
      publicPath: isBuild ? './' : '/',
      filename: isBuild ?
        `bundle/${pkgJson.version}/[name].[hash:8].js` : `bundle/${pkgJson.version}/[name].js`,
      chunkFilename: isBuild ?
        `bundle/${pkgJson.version}/module.[name].[hash:8].js` : `bundle/${pkgJson.version}/module.[name].js`,
      path: path.join(webpackConfig.webpack.path.build),
    },
    externals: {
      // react: 'React',
      // 'react-dom': 'ReactDOM',
      // axios: 'axios',
      // lodash: '_',
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 3000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name(module) {
          let uuid = UUID.v1()
            .toString()
            .split('-');
          return 'vendors.' + uuid[0];
        },
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10
          },
          common: {
            chunks: 'initial',
            name: 'common',
            minSize: 0,
            priority: 2
          },
          styles: {
            name: 'styles',
            test: /\.scss|less|css$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    plugins: _.compact([
      isDev && new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        title: pkgJson.title,
        filename: 'index.html',
        template: 'src/template/index.html',
        inject: true
      }),
      isBuild &&
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: require('postcss-safe-parser'),
          discardComments: {
            removeAll: true
          }
        }
      }),
      new MiniCssExtractPlugin({
        filename: `bundle/${pkgJson.version}/[name].css`,
        chunkFilename: `bundle/${pkgJson.version}/[name].[contenthash:12].css`
      }),
      new CopyWebpackPlugin([{
          from: webpackConfig.webpack.path.src + '/favicon.ico',
          to: ''
        },
        {
          from: webpackConfig.webpack.path.src + '/assets/',
          to: 'assets/'
        }
      ]),
      new webpack.DefinePlugin({
        'process.env': {
          version: `"${pkgJson.version}"`
        }
      }),
    ]),
    module: {
      rules: _.compact([{
          test: /\.(tsx?|jsx?)$/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            getCustomTransformers: () => ({
              before: [
                tsImportPluginFactory([{
                  libraryName: 'antd',
                  style: false,
                  libraryDirectory: 'lib'
                }])
              ]
            }),
            compilerOptions: {
              module: 'es2015'
            }
          },
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [miniCssLoader, ...cssLoaders]
        },
        {
          test: /\.less$/,
          use: [miniCssLoader, ...cssLoaders, ...lessLoaders]
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: ['url-loader?limit=1&name=img/[name].min.[ext]'],
          include: path.resolve(webpackConfig.webpack.path.src)
        },
        {
          test: /\.(eot|ttf|woff)$/i,
          loaders: ['url-loader?name=font/[name].[ext]']
        }
      ])
    }
  };
};