const labelService = require("../service/label.service")

const verifyLabelExists = async (ctx, next) => {
  // 获取传递的标签参数
  const { labels } = ctx.request.body
  // 判断labels参数中的name是否存在数据库label表中
  const newLabels = [];
  for (const name of labels) {
    const result = await labelService.queryLabelByName(name)
    const labelObj = { name }
    if (!result) {
      // 不存在则创建
      const insertResult = await labelService.create(name)
      labelObj.id = insertResult.insertId
    } else {
      // 存在就进行赋值
      labelObj.id = result.id;
    }
    newLabels.push(labelObj)
  }
  // 所有的labels都转化为[{name:"XXX",id:X},{name:"XXX",id:X}...]这种格式
  ctx.labels = newLabels;
  await next()
}

module.exports = { verifyLabelExists }