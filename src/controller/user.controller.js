const userService = require("../service/user.service");

class UserController {
  create(ctx, next) {
    const user = ctx.request.body;
    // 拿到传参的数据存储数据库
    console.log(user)
    // 保存到数据库
    userService.create(user);
    ctx.body = "创建成功";
  }
}

module.exports = new UserController();
