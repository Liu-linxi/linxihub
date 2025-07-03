const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const useRouter = require('../router/user.router');
const loginRouter = require('../router/login.router');

const app = new Koa();

app.use(bodyParser())


app.use(useRouter.routes());
app.use(useRouter.allowedMethods());
app.use(loginRouter.routes());
app.use(loginRouter.allowedMethods());


module.exports = app;