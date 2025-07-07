const KoaRouter = require('@koa/router');
const { verifyAuth } = require('../middleware/login.middleware');
const commentController = require('../controller/comment.controller');
const { verifyResource } = require('../middleware/permission.middleware');

const commentRouter = new KoaRouter({ prefix: '/comment' });

// 新增评论
commentRouter.post('/', verifyAuth, verifyResource('moment'), commentController.create)
// 回复接口
commentRouter.post('/reply', verifyAuth, verifyResource('moment'), verifyResource('comment'), commentController.reply)

module.exports = commentRouter;