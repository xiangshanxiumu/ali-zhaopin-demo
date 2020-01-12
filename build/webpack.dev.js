'use strict';

const express = require('express');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const webpackConfigCommon = require('./webpack.common');
const webpackConfig = require('./webpack.config');
// const proxy = require('http-proxy-middleware'); // 代理
// dev 服务封装
function startDevServer() {
  const app = express();
  /*webpack start*/
  const devConfig = webpackConfigCommon('dev');
  const compiler = webpack(devConfig);
  app.use(
    devMiddleware(compiler, {
      publicPath: devConfig.output.publicPath,
      historyApiFallback: true
    })
  );
  app.use(hotMiddleware(compiler));
  // (() => {
  //   const proxy_options = {
  //     target: 'http://xxx/api:8080',
  //     secure: false,
  //     changeOrigin: true,
  //     ws: true,
  //     ignorePath: false,
  //     pathRewrite: {
  //       // '^/api': ''
  //     }
  //   };
  //   const webProxy = proxy(proxy_options);
  //   app.use('/api/*', webProxy);
  // })();
  app.listen(webpackConfig.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.log(`Dev server listening at http://localhost:${webpackConfig.port}/`);
  });
}
// 启动dev服务
startDevServer();