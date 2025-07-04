const momentService = require("../service/moment.service");

class MomentController {
  async create(ctx, next) {
    // 获取请求到的参数
    const { content } = ctx.request.body;
    // 获取动态谁发布的
    const { id } = ctx.user;
    // 将数据保存数据库
    const result = await momentService.create({ content, id });

    ctx.body = {
      code: 200,
      message: "创建动态发布成功",
      data: result
    };
  }
}

module.exports = new MomentController();
