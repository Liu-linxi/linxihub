const jwt = require('jsonwebtoken');
const { PRIVATE_KEY, EXPIRESIN, ALGORITHM } = require('../config/screct');

class LoginController {
  sign(ctx, next) {

    try {
      // 获取用户信息
      const { id, name } = ctx.user;
      // 生成token
      const token = jwt.sign({ id, name }, PRIVATE_KEY, { expiresIn: EXPIRESIN, algorithm: ALGORITHM });
      // 返回用户信息
      ctx.body = { code: 0, data: { id, name, token } };
    } catch (err) {
      console.error("Token 生成失败:", err);
      ctx.status = 500;
      ctx.body = { code: -1, message: "Token 生成失败" };
    }

  }

}

module.exports = new LoginController()