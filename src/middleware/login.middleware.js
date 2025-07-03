const jwt = require('jsonwebtoken');

const { NAME_OR_PASSWORD_IS_REQUIRED, USER_DOES_NOT_EXIST, PASSWORD_IS_INCORRECT, INVALID_TOKEN } = require("../config/error");
const userService = require("../service/user.service");
const md5password = require("../utils/md5-password");
const { ALGORITHM, PUBLIC_KEY } = require('../config/screct');
// 中间件验证注册用户
const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  // 判断账号密码都输入
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }
  // 查询数据库是否存在此用户
  const users = await userService.getUserByName(name);
  const user = users[0];
  if (!user) {
    return ctx.app.emit("error", USER_DOES_NOT_EXIST, ctx);
  }

  // 验证密码是否一致
  if (user.password !== md5password(password)) {
    return ctx.app.emit("error", PASSWORD_IS_INCORRECT, ctx);
  }
  // 将user存到ctx.user
  ctx.user = user;

  await next();
}

const verifyAuth = async (ctx, next) => {
  // 获取token
  const authorization = ctx.headers.authorization;
  const token = authorization.replace('Bearer ', '');
  // 验证token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, { algorithms: [ALGORITHM] });
    // 将token信息保留在ctx.user
    ctx.user = result;
    await next();

  } catch (error) {
    ctx.app.emit("error", INVALID_TOKEN, ctx);
  }

}

module.exports = { verifyLogin, verifyAuth }