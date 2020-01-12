'use strict';

const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');
const pkgJson = require('../package.json');
const config = require('./config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin-hash');
const tsImportPluginFactory = require('ts-import-plugin');
const UUID = require('uuid');

module.exports = (type) => {
  const isDev = type === 'dev';
  const isDist = type === 'dist';
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
  // sass-loader
  const scssLoaders = [{
    loader: require.resolve('sass-loader'),
    options: {}
  }]
  // 压缩
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
      dll: false,
      test: false,
      dist: false
    } [type],
    resolve: {
      alias: {},
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.html', '.scss', '.less', '.css']
    },
    entry: {
      [pkgJson.name]: _.compact([
        isDev && 'react-hot-loader/patch',
        isDev && `webpack-hot-middleware/client?http://127.0.0.1:${config.port}`,
        isDev && 'webpack/hot/only-dev-server',
        './src/index.tsx'
      ])
    },
    output: {
      publicPath: isDist ? '' : '',
      filename: isDist ?
        `bundle/${pkgJson.version}/[name].[hash:8].js` : `bundle/${pkgJson.version}/[name].js`,
      chunkFilename: isDist ?
        `bundle/${pkgJson.version}/module.[name].[hash:8].js` : `bundle/${pkgJson.version}/module.[name].js`,
      path: path.join(config.webpack.path.build),
      library: 'someLibName',
      libraryTarget: 'umd'
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      axios: 'axios',
      lodash: '_',
      moment: 'moment',
      '@antv/data-set': 'DataSet'
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
        template: './src/template/index.html',
        filename: 'index.html'
      }),
      isDist &&
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: require('postcss-safe-parser'),
          discardComments: {
            removeAll: true
          }
        }
      }),
      // isDist &&
      new MiniCssExtractPlugin({
        filename: `bundle/${pkgJson.version}/[name].css`,
        chunkFilename: `bundle/${pkgJson.version}/[name].[contenthash:12].css`
      }),
      new CopyWebpackPlugin([{
          from: config.webpack.path.src + '/favicon.ico',
          to: ''
        },
        {
          from: config.webpack.path.src + '/assets/',
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
          test: /\.scss$/,
          use: [miniCssLoader, ...cssLoaders, ...scssLoaders]
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: ['url-loader?limit=1&name=img/[name].min.[ext]'],
          include: path.resolve(config.webpack.path.src)
        },
        {
          test: /\.(eot|ttf|woff)$/i,
          loaders: ['url-loader?name=font/[name].[ext]']
        }
      ])
    }
  };
};