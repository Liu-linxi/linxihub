const { NAME_OR_PASSWORD_IS_REQUIRED, USER_ALREADY_EXISTS } = require("../config/error");
const userService = require("../service/user.service");

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

module.exports = { verifyUser }