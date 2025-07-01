const Koa = require('koa');
const KoaRouter = require('@koa/router');
const { SERVER_PORT } = require('./config/server');

const app = new Koa();

const useRouter = new KoaRouter({ prefix: '/users' });
useRouter.get('/list', (ctx, next) => {
  ctx.body = 'users';
})

// 将路由中间件注册到应用
app.use(useRouter.routes());
app.use(useRouter.allowedMethods());

app.listen(SERVER_PORT, () => {
  console.log("服务器启动成功")
})