const fs = require('fs')
const path = require('path')
// 这里如果分布式系统，可以把PRIVATE_KEY放进用户系统，PUBLIC_KEY放到其他系统里
// 这里因为入口启动是./package.json启动的，所以路径要写这种
// 默认情况下相对目录和node程序的启动目录有关系
// const PRIVATE_KEY = fs.readFileSync('./src/config/keys/private.key');
// const PUBLIC_KEY = fs.readFileSync('./src/config/keys/public.key');

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'));
const EXPIRESIN = 60 * 60 * 24 * 30;// 一个月
const ALGORITHM = 'RS256';

module.exports = {
  PRIVATE_KEY,
  PUBLIC_KEY,
  EXPIRESIN,
  ALGORITHM
}