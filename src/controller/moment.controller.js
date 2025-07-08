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
  async update(ctx, next) {
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;
    const result = await momentService.update(momentId, content);

    ctx.body = {
      code: 0,
      message: "更新动态成功",
      data: result
    };
  }
  async remove(ctx, next) {
    const { momentId } = ctx.params;
    const result = await momentService.remove(momentId);

    ctx.body = {
      code: 0,
      message: "删除动态成功",
      data: result
    };
  }
  async createLabels(ctx, next) {
    const { labels } = ctx
    const { momentId } = ctx.params
    // 将momentId和labelId进行关联添加到moment_label表中
    try {
      for (let label of labels) {
        const isExist = await momentService.hasLabel(momentId, label.id)
        if (!isExist) {
          // 不存在moment_id和label_id的关联关系，则进行添加
          const result = await momentService.addLabel(momentId, label.id)
        }
      }
      ctx.body = {
        code: 0,
        message: "为动态添加标签成功~",
      }
    } catch (error) {
      ctx.body = {
        code: -3001,
        message: "为动态添加标签失败,请检测数据是否有问题~",
      }
    }
  }
}

module.exports = new MomentController();
