const KoaRouter = require('@koa/router');
const { verifyAuth } = require('../middleware/login.middleware');
const { create, list, detail, update, remove, createLabels } = require('../controller/moment.controller');
const { verifyPermission } = require('../middleware/permission.middleware');
const { verifyLabelExists } = require('../middleware/label.middleware');

const momentRouter = new KoaRouter({ prefix: '/moment' });

momentRouter.post("/", verifyAuth, create)
momentRouter.get("/", list)
momentRouter.get("/:momentId", detail)
momentRouter.patch("/:momentId", verifyAuth, verifyPermission, update)
momentRouter.delete("/:momentId", verifyAuth, verifyPermission, remove)

// 添加标签
/**
 * 1.是否登录(完成)
 * 2.验证是否有操作这个动态的权限(完成)
 * 3.额外中间件:验证label的name是否已经存在于label表中
 * 如果存在，那么直接使用即可
 * 如果没有存在，那么需要先将label的name添加label表
 * 4.最终步骤
 * 所有的labels都在已经在label表
 * 动态2，和labels关系，添加到关系表中
 */
momentRouter.post("/:momentId/labels", verifyAuth, verifyPermission, verifyLabelExists, createLabels)


module.exports = momentRouter;