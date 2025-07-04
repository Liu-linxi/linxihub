const fs = require('fs');
const path = require('path')

function registerRouters(app) {
  // 读取当前文件夹中所有文件
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js') return;
    if (!file.endsWith('.router.js')) return;
    const router = require(path.join(__dirname, file));
    app.use(router.routes()).use(router.allowedMethods());
  })
}

module.exports = registerRouters;