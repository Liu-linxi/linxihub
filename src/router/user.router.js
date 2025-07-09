const KoaRouter = require('@koa/router');
const { verifyUser, handlePassword } = require('../middleware/user.middleware');
const { create, showAvatarImage } = require('../controller/user.controller');

// 创建路由对象
const useRouter = new KoaRouter({ prefix: '/users' });

// 定义路由映射
useRouter.post('/', verifyUser, handlePassword, create)
useRouter.get('/avatar/:userId', showAvatarImage)

// 导出

module.exports = useRouter;