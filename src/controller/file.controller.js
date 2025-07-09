const fileService = require("../service/file.service");

class FileController {
  async create(ctx, next) {
    const { filename, originalname, mimetype, size } = ctx.request.file;
    const { id } = ctx.user
    const result = await fileService.create(filename, originalname, mimetype, size, id);
    ctx.body = {
      code: 0,
      message: "上传成功",
      data: result
    }
  }
}

module.exports = new FileController();
