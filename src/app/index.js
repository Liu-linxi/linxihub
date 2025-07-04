const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const registerRouters = require('../router');

const app = new Koa();

app.use(bodyParser())

// 普通引入
// const useRouter = require('../router/user.router');
// const loginRouter = require('../router/login.router');
// app.use(useRouter.routes());
// app.use(useRouter.allowedMethods());
// app.use(loginRouter.routes());
// app.use(loginRouter.allowedMethods());
// 自动化引入
registerRouters(app);

module.exports = app;