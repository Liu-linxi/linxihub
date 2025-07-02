const userService = require("../service/user.service");

class UserController {
  async create(ctx, next) {
    // 拿到传参的数据
    const user = ctx.request.body;
    // 保存到数据库
    const result = await userService.create(user);
    ctx.body = {
      message: "用户创建成功",
      data: result
    };
  }
}

module.exports = new UserController();
