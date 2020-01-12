const express = require('express');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const getConfig = require('./webpack-config');
const webpack = require('webpack');
const config = require('./config');
// const proxy = require('http-proxy-middleware'); // 代理

function startDevServer() {
  const app = express();
  /*webpack start*/
  const devConfig = getConfig('dev');
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
  app.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.log(`Dev server listening at http://localhost:${config.port}/`);
  });
}
startDevServer();