const { NAME_OR_PASSWORD_IS_REQUIRED, USER_ALREADY_EXISTS } = require("../config/error");
const userService = require("../service/user.service");
const md5password = require("../utils/md5-password");
// 中间件验证注册用户
const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx)
  }
  const users = await userService.getUserByName(name);
  if (users.length > 0) {
    return ctx.app.emit("error", USER_ALREADY_EXISTS, ctx)
  }
  await next();
}
// 密码加密处理
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5password(password);
  await next();
}

module.exports = { verifyUser, handlePassword }