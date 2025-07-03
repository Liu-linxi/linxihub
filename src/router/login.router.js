const KoaRouter = require('@koa/router');
const { sign, getList } = require('../controller/login.controller');
const { verifyLogin, verifyAuth } = require('../middleware/login.middleware');

const loginRouter = new KoaRouter({ prefix: '/login' });

loginRouter.post('/', verifyLogin, sign)
loginRouter.get('/list', verifyAuth, getList)

module.exports = loginRouter;