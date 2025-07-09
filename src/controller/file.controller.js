const fileService = require("../service/file.service");
const userService = require("../service/user.service");
const { SERVER_HOST, SERVER_PORT } = require("../config/server");

class FileController {
  async create(ctx, next) {
    const { filename, originalname, mimetype, size } = ctx.request.file;
    const { id } = ctx.user
    const result = await fileService.create(filename, originalname, mimetype, size, id);
    // 文件上传成功后保存在user表中；
    const avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/users/avatar/${id}`;
    const result2 = await userService.updateAvatarUrlById(avatarUrl, id);
    ctx.body = {
      code: 0,
      message: "上传成功",
      data: avatarUrl
    }
  }
}

module.exports = new FileController();
