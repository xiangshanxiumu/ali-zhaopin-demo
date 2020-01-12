const path = require('path');
const __basename = path.dirname(__dirname);
// webpack 打包配置
const config = {
  port: 8080,
  __basename: __basename,
  webpack: {
    path: {
      src: path.resolve(__basename, 'src'),
      build: path.resolve(__basename, 'dist'),
    }
  }
};
module.exports = config;
