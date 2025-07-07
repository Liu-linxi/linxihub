const { OPERATION_NOT_ALLOWED, RESOURCE_NOT_FOUND } = require("../config/error");
const permissionService = require("../service/permission.service");

/**
 * 如果这里使用动态的操作的话那么router中的路由操作"/:momentId"这里名字必须严格规范注意操作标明驼峰Id
 */
const verifyPermission = async (ctx, next) => {
  const { id } = ctx.user;
  const keyName = Object.keys(ctx.params)[0];
  console.log("🚀 ~ verifyPermission ~ ctx.params:", ctx.params)
  const resourceId = ctx.params[keyName];
  const resourceName = keyName.replace('Id', '');
  const isExist = await permissionService.findResource(resourceName, resourceId);
  if (!isExist) {
    return ctx.app.emit('error', RESOURCE_NOT_FOUND, ctx)
  }
  const isPermission = await permissionService.checkResource(resourceName, resourceId, id)
  if (!isPermission) {
    return ctx.app.emit('error', OPERATION_NOT_ALLOWED, ctx)
  }
  await next()
}

// 如果这里使用动态的操作的话那么传参数"momentId"这里名字必须严格规范注意操作标明驼峰Id
const verifyResource = function (resourceName) {
  return async function (ctx, next) {
    try {
      // 查找以 resourceName 开头、以 Id 结尾的字段，如 momentId、commentId
      const keyName = Object.keys(ctx.request.body).find(key =>
        key.startsWith(resourceName) && key.endsWith('Id')
      );

      if (!keyName) {
        return ctx.app.emit('error', RESOURCE_NOT_FOUND, ctx);
      }

      const resourceId = ctx.request.body[keyName];

      // 调用 service 层检查资源是否存在
      const isExist = await permissionService.findResource(resourceName, resourceId);
      if (!isExist) {
        return ctx.app.emit('error', RESOURCE_NOT_FOUND, ctx);
      }

      await next();
    } catch (error) {
      console.error('verifyResource error:', error);
      return ctx.app.emit('error', RESOURCE_NOT_FOUND, ctx);
    }
  }

}

module.exports = {
  verifyPermission,
  verifyResource
}