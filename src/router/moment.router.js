const KoaRouter = require('@koa/router');
const { verifyAuth } = require('../middleware/login.middleware');
const { create, list, detail, update, remove, createLabel } = require('../controller/moment.controller');
const { verifyPermission } = require('../middleware/permission.middleware');
const { verifyLabelExists } = require('../middleware/label.middleware');

const momentRouter = new KoaRouter({ prefix: '/moment' });

momentRouter.post("/", verifyAuth, create)
momentRouter.get("/", list)
momentRouter.get("/:momentId", detail)
momentRouter.patch("/:momentId", verifyAuth, verifyPermission, update)
momentRouter.delete("/:momentId", verifyAuth, verifyPermission, remove)

// 添加标签
momentRouter.post("/:momentId/labels", verifyAuth, verifyPermission, verifyLabelExists, createLabel)


module.exports = momentRouter;