'use strict';

const config = require('./config');

const path = require('path');
const webpack = require('webpack');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const webpackConfig = require('./webpack-config')('dist');
const shell = require('shelljs');

// 清除dist文件
const buildFolder = config.webpack.path.pub;
shell.rm('-rf', buildFolder);

// Webpack build打包
console.log('Building, it may take a few seconds...');
console.time('✨ Done');
const compiler = webpack(webpackConfig);
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

compiler.run((err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.timeEnd('✨ Done');
  }
});
