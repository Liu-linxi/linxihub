const { UPLOAD_PATH } = require("../config/path");
const fileService = require("../service/file.service");
const userService = require("../service/user.service");
const fs = require("fs");
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

  async showAvatarImage(ctx, next) {
    // 获取用户id
    const { userId } = ctx.params;
    // 获取userId对应的头像信息
    const avatarInfo = await fileService.getAvatarByUserId(userId);
    // 读取头像所在的文件
    const { filename, originalname, mimetype } = avatarInfo;


    // ctx.response.set("content-type", mimetype);
    // 或者这种也行
    ctx.type = mimetype;
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`);;

  }
}

module.exports = new UserController();
