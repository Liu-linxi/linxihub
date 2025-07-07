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
      code: 0,
      message: "创建动态发布成功",
      data: result
    };
  }

  async list(ctx, next) {
    const { offset, size } = ctx.query;

    const result = await momentService.getMomentList(offset, size);

    ctx.body = {
      code: 0,
      message: "获取动态列表成功",
      data: result
    };
  }
  async detail(ctx, next) {
    const { momentId } = ctx.params;
    const result = await momentService.getMomentById(momentId);

    ctx.body = {
      code: 0,
      message: "获取动态详情成功",
      data: result
    };
  }
}

module.exports = new MomentController();
