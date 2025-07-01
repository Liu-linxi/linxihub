const KoaRouter = require('@koa/router');
const userController = require('../controller/user.controller');

// 创建路由对象
const useRouter = new KoaRouter({ prefix: '/users' });

// 定义路由映射
useRouter.post('/', userController.create)


// 导出

module.exports = useRouter;