const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const useRouter = require('../router/user.router');

const app = new Koa();


app.use(bodyParser())
app.use(useRouter.routes());
app.use(useRouter.allowedMethods());

module.exports = app;