'use strict';

const webpack = require('webpack');
const shell = require('shelljs');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const webpackConfig = require('./webpack.config');
const webpackConfigCommon = require('./webpack.common')('dist');

// 清除原旧的dist文件
const buildFolder = webpackConfig.webpack.path.build;
shell.rm('-rf', buildFolder);

// Webpack build打包
console.log('Building, it may take a few seconds...');
console.time('✨ Done');
const compiler = webpack(webpackConfigCommon);
// 编译打包进度
let lastPercentage = 0;
compiler.apply(
  new ProgressPlugin((percentage, msg) => {
    percentage = Math.round(percentage * 10000) / 100;
    if (/building modules/.test(msg) && percentage - lastPercentage < 8) {
      return;
    }
    lastPercentage = percentage;
    console.log(percentage + '%', msg);
  })
);
// err 输出
compiler.run((err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.timeEnd('✨ Done');
  }
});
