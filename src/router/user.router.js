const KoaRouter = require('@koa/router');
const userController = require('../controller/user.controller');
const { verifyUser, handlePassword } = require('../middleware/user.middleware');

// 创建路由对象
const useRouter = new KoaRouter({ prefix: '/users' });

// 定义路由映射
useRouter.post('/', verifyUser, handlePassword, userController.create)


// 导出

module.exports = useRouter;