const KoaRouter = require('@koa/router');

// 创建路由对象
const useRouter = new KoaRouter({ prefix: '/users' });

// 定义路由映射
useRouter.get('/list', (ctx, next) => {
  ctx.body = 'users';
})

// 导出

module.exports = useRouter;