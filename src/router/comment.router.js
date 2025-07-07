const KoaRouter = require('@koa/router');
const { verifyAuth } = require('../middleware/login.middleware');
const commentController = require('../controller/comment.controller');
const { verifyResouce } = require('../middleware/permission.middleware');

const commentRouter = new KoaRouter({ prefix: '/comment' });

commentRouter.post('/', verifyAuth, verifyResouce('moment'), commentController.create)

module.exports = commentRouter;