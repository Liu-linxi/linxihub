const { OPERATION_NOT_ALLOWED, RESOURCE_NOT_FOUND } = require("../config/error");
const permissionService = require("../service/permission.service");

/**
 * 如果这里使用动态的操作的话那么router中的路由操作"/:momentId"这里名字必须严格规范注意操作标明驼峰Id
 */
const verifyPermission = async (ctx, next) => {
  const { id } = ctx.user;
  const keyName = Object.keys(ctx.params)[0];
  const resouceId = ctx.params[keyName];
  const resouceName = keyName.replace('Id', '');
  const isExist = await permissionService.findResouce(resouceName, resouceId);
  if (!isExist) {
    return ctx.app.emit('error', RESOURCE_NOT_FOUND, ctx)
  }
  const isPermission = await permissionService.checkResouce(resouceName, resouceId, id)
  if (!isPermission) {
    return ctx.app.emit('error', OPERATION_NOT_ALLOWED, ctx)
  }
  await next()
}
module.exports = {
  verifyPermission
}